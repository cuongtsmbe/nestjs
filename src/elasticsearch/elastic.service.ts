import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { MessageDto } from './dtos/message.dto';

@Injectable()
export class ElasticService {

  constructor(private readonly elasticsearchService: ElasticsearchService) {
  }
  async indexMessage(index: string, message: MessageDto): Promise<any> {
    const response = await this.elasticsearchService.index({
      index,
      body: message,
    });

    return response;
  }

  async sendMessage(index:string,message: MessageDto): Promise<any> {
    const response = await this.elasticsearchService.index({
      index,
      body: message,
    });

    return response;
  }

  async searchMessagesWithQuery(index: string,query: any): Promise<any> {
    const result = await this.elasticsearchService.search({
      index: index, 
      body: query,
    });

    return result;
}
}
