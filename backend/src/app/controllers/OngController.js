import crypto from 'crypto';
import Ong from '../models/Ongs';

class OngController {
  async index(req, res) {
    const ongs = await Ong.query().select('*');
    return res.json(ongs);
  }

  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = crypto.randomBytes(4).toString('HEX');

    try {
      await Ong.query().insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
      });
      return res.json({ id, name, email, whatsapp, city, uf });
    } catch (err) {
      if (err.name === 'UniqueViolationError')
        return res.status(401).json({ error: err.nativeError.detail });
      return res.status(err.statusCode).json({ error: err });
    }
  }
}

export default new OngController();
