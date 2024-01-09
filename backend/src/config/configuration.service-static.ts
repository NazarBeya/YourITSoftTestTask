import * as dotenv from 'dotenv';

const environment = process.env.NODE_ENV ?? '';
dotenv.config({ path: `environments/${environment}.env` });

export class ConfigurationServise {
  constructor(private env: { [key: string]: string }) {}
  public get(key: string): string {
    return this.env[key];
  }
}
const ConfigurationServiseStatic = new ConfigurationServise(process.env);

export { ConfigurationServiseStatic };
