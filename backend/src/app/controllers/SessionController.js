import Ong from '../models/Ongs';

class SessionController {
  async store(req, res) {
    const { id } = req.body;

    const ong = await Ong.query().where('id', id).select('name').first();

    if (!ong)
      return res.status(400).json({ error: 'Ong does not found with ID.' });

    return res.json(ong);
  }
}

export default new SessionController();
