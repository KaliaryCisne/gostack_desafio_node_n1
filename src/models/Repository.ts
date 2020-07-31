import { IRepository } from '../interfaces/IRepository';

class Repository implements IRepository {
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

export default Repository;
