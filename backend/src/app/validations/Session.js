import { Segments, Joi, celebrate } from 'celebrate';

export default {
  body: celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
};
