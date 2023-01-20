export default class Watch {
    
    id : number;
    name : string;
    description : string;
    price : number;
    image : string;
    quantity : number;
    
    constructor(id : number = 0, name : string = '', description : string = '', price : number = 0, 
        image : string= '', quantity : number = 0) 
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
    }
}