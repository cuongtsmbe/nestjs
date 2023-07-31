import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticService {

  constructor(private readonly elasticsearchService: ElasticsearchService) {
  }
  async indexMessage(index: string, message: any): Promise<any> {
    const response = await this.elasticsearchService.index({
      index,
      body: message,
    });

    return response;
  }
  async searchMessagesWithQuery(index: string,query: any): Promise<any> {
    const result = await this.elasticsearchService.search({
      index: index, // Replace 'messages' with your actual index name
      body: query,
    });

    return result;
}
}
