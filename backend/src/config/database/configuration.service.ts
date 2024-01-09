import { Inject, Injectable } from '@nestjs/common';
import configuration from './configuration';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class PostrgresqlConfigService {
  constructor(
    @Inject(configuration.KEY)
    private postgresqlConfiguration: ConfigType<typeof configuration>,
  ) {}
  get host(): string {
    return this.postgresqlConfiguration.host;
  }
  get port(): number {
    return Number(this.postgresqlConfiguration.port);
  }
  get user(): string {
    return this.postgresqlConfiguration.user;
  }
  get password(): string {
    return this.postgresqlConfiguration.password;
  }
  get database(): string {
    return this.postgresqlConfiguration.database;
  }
}
