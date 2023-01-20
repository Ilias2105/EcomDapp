export default class Order {
    
    id : number;
    buyer : string;
    quantity : number;
    amount : number;
    date? : Date;
    idWatch : number;
    
    constructor(
        id : number = 0, 
        buyer : string ='',
        quantity : number = 0,
        amount : number = 0,
        date : Date = new Date(),
        idWatch : number = 0
        ) 
    {
        this.id = id;
        this.buyer = buyer;
        this.quantity = quantity;
        this.amount = amount;
        this.date = date;
        this.idWatch = idWatch;
    }
}