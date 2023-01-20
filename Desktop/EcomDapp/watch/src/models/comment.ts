export default class Comment {
    
    id : number;
    author : string;
    comment : string;
    idWatch : number;
    
    constructor(id : number = 0, author : string = '', comment : string = '', idWatch : number = 0) {
        this.id = id;
        this.author = author;
        this.comment = comment;
        this.idWatch = idWatch;
    }
}