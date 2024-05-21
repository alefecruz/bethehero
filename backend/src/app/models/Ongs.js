import { Model } from 'objection';

class Ong extends Model {
  static init(conn) {
    super.knex(conn);
  }

  static get tableName() {
    return 'ongs';
  }
}

export default Ong;
