import Repository from "../models/Repository";
import { Request, Response } from 'express';
import { uuid } from 'uuidv4';

const repositories: Repository[] = [];

class RepositoryController {

    // public repositories: Repository[];

    // constructor() {
    //     repositories = [];
    // }

    index(request: Request, response: Response) {
    
        console.log("error: ", repositories);
        return response.json(repositories);
    }

    create(request: Request, response: Response) {
        const { title, url, techs } = request.body;
        const id = uuid();

        const repository = new Repository(id, title, url, techs);

        repositories.push(repository);

        return response.json(repository);
    }

    update(request: Request, response: Response) {
        const { id } = request.params;
        const { title, url, techs } = request.body;

        const repositoryIndex = repositories.findIndex(repository => repository.id === id);

        if (repositoryIndex < 0 ) {
            return response.status(404).json({ error: 'Repository not found.'})
        }

        const repositoryUpdated = repositories[repositoryIndex];

        repositoryUpdated.title = title ? title : repositoryUpdated.title;
        repositoryUpdated.url = url ? url : repositoryUpdated.url;
        repositoryUpdated.techs = techs ? techs : repositoryUpdated.techs;

        return response.json(repositoryUpdated);
    }

    delete(request: Request, response: Response) {
        const { id } = request.params;

        const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    
        if (repositoryIndex < 0 ) {
            return response.status(404).json({ error: 'Repository not found.'})
        }
    
        repositories.splice(repositoryIndex, 1);
    
        return response.status(204).send();
    }

    like(request: Request, response: Response) {
        const { id } = request.params;

        const repositoryIndex = repositories.findIndex(repository => repository.id === id);

        if (repositoryIndex < 0 ) {
            return response.status(404).json({ error: 'Repository not found.'})
        }

        const repositoryLiked = repositories[repositoryIndex];

        repositoryLiked.like();

        return response.json(repositoryLiked);
    }
}

export default RepositoryController;