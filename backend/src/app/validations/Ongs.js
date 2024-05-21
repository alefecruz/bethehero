import { Segments, Joi, celebrate } from 'celebrate';

export default {
  body: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(11).max(12),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
    }),
  }),
};
