import { Body, Controller, Post , Get , Query } from '@nestjs/common';
import { ElasticService } from './elastic.service';


@Controller('elastic')
export class ElasticController {
    constructor(private readonly elasticService: ElasticService) {}
    @Post('index-message')
    async indexMessage(@Body() message: any): Promise<any> {
        const index = 'messages';

        const response = await this.elasticService.indexMessage(index, message);

        return response;
    }

    @Get('search')
    async searchMessages(@Query("user_id") user_id: string,@Query("message") message: string): Promise<any> {
        const index = 'messages';
        const searchQuery = {
            query: {
              bool: {
                must: [
                  {
                    match_phrase: {
                        message: message,
                    },
                  },
                ],
              },
            },
        };
        const searchResult = await this.elasticService.searchMessagesWithQuery(index,searchQuery);

        return searchResult;
    }
}
