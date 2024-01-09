import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { PostrgresqlConfigService } from './configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [ConfigService, PostrgresqlConfigService],
  exports: [ConfigService, PostrgresqlConfigService],
})
export class PostrgresqlConfigModule {}
