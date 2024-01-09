/* eslint-disable @typescript-eslint/no-var-requires */
const typeorm = require('typeorm');

let config;

try {
  config = require('./src/config/database/type-orm-configuration');
} catch (e) {
  config = require('./dist/config/database/type-orm-configuration');
}

const dataSourceOptions = config.TypeOrmConfigurationStatic.staticConfig;
const connection = new typeorm.DataSource(dataSourceOptions);
module.exports = [connection];
