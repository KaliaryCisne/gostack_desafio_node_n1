import express, { request, response } from 'express';
import { uuid } from 'uuidv4';

const app = express();

app.use(express.json());

class Repository implements necessarioLike{
    public id: string;    
    public title: string; 
    public url: string;
    public techs: Array<string>;
    public likes: number;

    constructor(id: string, title: string, url: string, techs: Array<string>, likes: number = 0) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.techs = techs;
        this.likes = likes;
    }

    like(): boolean {
        this.likes++;
        return true;
    }
}


interface necessarioLike {
    like(): boolean;
}

let repositories: Array<Repository> = [];

app.get('/repositories', (request, response) => {
    return response.json(repositories);
});

app.post('/repositories', (request, response) => {
    const { title, url, techs } = request.body;
    const id = uuid();

    const repository = new Repository(id, title, url, techs);

    repositories.push(repository);

    return response.json(repository);
 
});

app.put('/repositories/:id', (request, response) => {
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
});

app.post('/repositories/:id/like', (request, response) => {
    const { id } = request.params;

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoryIndex < 0 ) {
        return response.status(404).json({ error: 'Repository not found.'})
    }

    const repositoryLiked = repositories[repositoryIndex];

    repositoryLiked.like();

    return response.json(repositoryLiked);
});


app.delete('/repositories/:id', (request, response) => {
    const { id } = request.params;

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoryIndex < 0 ) {
        return response.status(404).json({ error: 'Repository not found.'})
    }

    repositories.splice(repositoryIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log("🚀 Server Started...");
});