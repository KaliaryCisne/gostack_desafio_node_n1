import { Router } from 'express';
import RepositoryController from './controllers/RepositoryController';

const routes = Router();
const repositoryController = new RepositoryController();


routes.get('/repositories', repositoryController.index);
routes.post('/repositories', repositoryController.create);
routes.put('/repositories/:id', repositoryController.update);
routes.delete('/repositories/:id', repositoryController.delete);
routes.post('/repositories/:id/like', repositoryController.like);


export default routes;