import { Router } from 'express';

import OngValidate from './app/validations/Ongs';
import IncidentsValidate from './app/validations/Incidents';
import SessionValidate from './app/validations/Session';

import OngController from './app/controllers/OngController';
import IncidentController from './app/controllers/IncidentController';
import ProfileController from './app/controllers/ProfileController';
import SessionController from './app/controllers/SessionController';

const routes = Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngValidate.body, OngController.store);

routes.post('/sessions', SessionValidate.body, SessionController.store);

routes.get('/incidents', IncidentsValidate.query, IncidentController.index);
routes.post(
  '/incidents',
  IncidentsValidate.body,
  IncidentsValidate.header,
  IncidentController.store
);
routes.delete(
  '/incidents/:id',
  IncidentsValidate.header,
  IncidentsValidate.params,
  IncidentController.destroy
);

routes.get('/profile', IncidentsValidate.header, ProfileController.index);

export default routes;
