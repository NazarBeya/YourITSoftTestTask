import { Injectable } from '@nestjs/common';
import { ConfigurationServiseStatic } from '../configuration.service-static';

@Injectable()
export class PostrgresqlConfigServiceStatic {
  static get host(): string {
    return ConfigurationServiseStatic.get('POSTGRES_HOST');
  }
  static get port(): number {
    return Number(ConfigurationServiseStatic.get('POSTGRES_PORT'));
  }
  static get user(): string {
    return ConfigurationServiseStatic.get('POSTGRES_USER');
  }
  static get password(): string {
    return ConfigurationServiseStatic.get('POSTGRES_PASSWORD');
  }
  static get database(): string {
    return ConfigurationServiseStatic.get('POSTGRES_DATABASE');
  }
}
