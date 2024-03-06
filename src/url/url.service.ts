import { Injectable, Logger } from '@nestjs/common';
import { Url } from './entities/url.entity';
import { UrlUsage } from './entities/url-usage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateShortId } from '../utils/string.utils';
import { UrlDto } from './dto/url.dto';

@Injectable()
export class UrlService {
  private readonly logger = new Logger(UrlService.name);

  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
    @InjectRepository(UrlUsage)
    private readonly urlUsageRepository: Repository<UrlUsage>,
  ) {}

  /**
   * Creates a new URL record in the database.
   *
   * @param {UrlDto} urlDto - The URL DTO containing the long URL and an optional alias.
   * @returns {Promise<Url>} A promise that resolves with the newly created URL entity.
   */
  async create(urlDto: UrlDto): Promise<Url> {
    const { url: longUrl, alias } = urlDto;

    this.logger.log('create: Input', { urlDto });

    const newUrl = await this.urlRepository.save({
      alias: alias || generateShortId(),
      longUrl,
    });
    this.logger.log('create: Success', { newUrl });

    return newUrl;
  }

  /**
   * Finds a URL entity by its short identifier.
   *
   * @param {string} shortId - The short identifier of the URL to find.
   * @returns {Promise<Url | undefined>} The URL entity if found; otherwise, undefined.
   */
  async findOneByAlias(alias: string): Promise<Url | undefined> {
    return this.urlRepository.findOne({ where: { alias, deletedAt: null } });
  }

  /**
   * Retrieves a single URL entity by its ID.
   *
   * @param {number} id - The unique identifier of the URL entity to be retrieved.
   * @returns {Promise<Url | undefined>} The URL entity if found; otherwise, undefined.
   */
  async findOneById(id: number): Promise<Url | undefined> {
    return this.urlRepository.findOneBy({ id });
  }

  /**
   * Increments the hit count for a specific URL by 1.
   *
   * @param {number} urlId - The ID of the URL entity whose hit count is to be incremented.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   * @throws {QueryFailedError} Throws an error if the update operation fails.
   */
  async incrementHitCount(urlId: number): Promise<void> {
    this.logger.log('incrementHitCount: Input', { urlId });
    await this.urlRepository.increment({ id: urlId }, 'hitCount', 1);
  }

  /**
   * Deletes a short URL by its ID.
   *
   * @param {number} id - The unique identifier of the short URL to be deleted.
   * @returns {Promise<void>} A promise that resolves when the deletion is complete.
   */
  async deleteShortUrl(id: number): Promise<void> {
    this.logger.log('deleteShortUrl: Input', { id });
    await this.urlRepository.softDelete(id);
  }

  /**
   * Records an access event for a specific URL.
   *
   * @param {number} urlId - The ID of the URL that was accessed.
   * @param {string} ip - The IP address of the client that accessed the URL.
   * @param {string} [userAgent] - Optional. The User-Agent string provided by the client's browser or
   *                               HTTP client.
   * @returns {Promise<void>} A promise that resolves once the url usage record has been successfully saved
   *                          to the database.
   */
  async recordUrlUsage(
    urlId: number,
    ip: string,
    userAgent?: string,
  ): Promise<void> {
    this.logger.log('recordUrlUsage: Input', { urlId, ip, userAgent });
    await this.urlUsageRepository.save({
      urlId,
      ip,
      userAgent,
    });
  }

  /**
   * Retrieves statistical data for each URL, including the total access count and the
   * access count per User-Agent. This method performs two main operations:
   */
  async findUrlStatistics() {
    // First, get the total access count for each URL.
    const totalAccessCounts = await this.urlRepository
      .createQueryBuilder('url')
      .leftJoin('url.usages', 'usage')
      .select('url.id', 'id')
      .addSelect('url.longUrl', 'longUrl')
      .addSelect('COUNT(usage.id)', 'totalAccessCount')
      .groupBy('url.id')
      .getRawMany();

    // Next, get the access count per User-Agent for each URL.
    const userAgentCounts = await this.urlRepository
      .createQueryBuilder('url')
      .leftJoin('url.usages', 'usage')
      .select('url.id', 'id')
      .addSelect('usage.userAgent', 'userAgent')
      .addSelect('COUNT(usage.userAgent)', 'countPerUserAgent')
      .groupBy('url.id')
      .addGroupBy('usage.userAgent')
      .getRawMany();

    const combinedStatistics = totalAccessCounts.map((urlStat) => {
      const userAgentDetails = userAgentCounts
        .filter((uaCount) => uaCount.id === urlStat.id)
        .map((uaCount) => ({
          userAgent: uaCount.userAgent,
          count: uaCount.countPerUserAgent,
        }));

      return {
        ...urlStat,
        userAgentCounts: userAgentDetails,
      };
    });

    return combinedStatistics;
  }
}
