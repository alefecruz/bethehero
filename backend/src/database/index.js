import Knex from 'knex';

import databaseConfig from '../../knexfile';

import Ong from '../app/models/Ongs';
import Incidents from '../app/models/Incidents';

const models = [Ong, Incidents];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Knex(databaseConfig.development);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
