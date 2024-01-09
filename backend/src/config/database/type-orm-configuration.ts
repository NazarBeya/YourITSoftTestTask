import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostrgresqlConfigModule } from './config.module';
import { PostrgresqlConfigService } from './configuration.service';
import { DataSourceOptions } from 'typeorm';
import { PostrgresqlConfigServiceStatic } from './configuration.service-static';

export class TypeOrmConfiguration {
  static get config(): TypeOrmModuleAsyncOptions {
    return {
      imports: [PostrgresqlConfigModule],
      useFactory: (configService: PostrgresqlConfigService) => ({
        type: 'postgres',
        host: configService.host,
        port: configService.port,
        username: configService.user,
        password: configService.password,
        database: configService.database,
        synchronize: false,
        entities: [`${process.cwd()}//**/*.entity{.js, .ts}`],
      }),
      inject: [PostrgresqlConfigService],
    };
  }
}

export class TypeOrmConfigurationStatic {
  static get staticConfig(): DataSourceOptions {
    return {
      type: 'postgres',
      host: PostrgresqlConfigServiceStatic.host,
      port: PostrgresqlConfigServiceStatic.port,
      username: PostrgresqlConfigServiceStatic.user,
      password: PostrgresqlConfigServiceStatic.password,
      database: PostrgresqlConfigServiceStatic.database,
      synchronize: false,
      entities: ['src/database/entities/*entity.ts'],
      migrations: ['src/database/migrations/*.ts'],
    };
  }
}
