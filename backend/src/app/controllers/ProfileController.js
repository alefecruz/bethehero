import Incidents from '../models/Incidents';

class ProfileController {
  async index(req, res) {
    const ong_id = req.headers.authorization;

    const profiles = await Incidents.query()
      .select('*')
      .where('ong_id', ong_id);

    return res.json(profiles);
  }
}

export default new ProfileController();
