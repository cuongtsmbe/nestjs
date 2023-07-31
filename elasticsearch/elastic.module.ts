import { Module } from '@nestjs/common';
import { ElasticService } from './elastic.service';
import { ElasticController } from './elastic.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: () => ({
        cloud: {
          // id: prb22ocess.env.ELASTICSEARCH_ID,
          id: 'dbd7927b299c4458a66d97e4e3b4c06c:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGEwODQ1NTljMzRlNjQyMmJhOTUwNmNlMWE3MTkxMjJkJGNhOWNkNDJiOGNjMTQyYzdhYTM2OGYwNDRiMTcwMjE1',
        },
        auth: {
          username: 'elastic',
          password: 'kkov9MeZrShsBGi20lZ4cJIJ',
        },
      }),
    }),
  ],
  controllers: [ElasticController],
  exports: [ElasticService],
  providers: [ElasticService],
})
export class ElasticModule {}
