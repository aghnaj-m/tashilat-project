import { User } from "@nebular/auth/user.model";


export class Transfer {

    public id: string;
    public amount: number;
    public receiverFullName: string;
    public receiverPhone: string;
    public date: Date;
    public state: string;
    public server: User;

    constructor(id: string, amount: number, receiverFullName: string, receiverPhone: string, date: Date, state: string, server: User)
    {
        this.id = id;
        this.amount = amount;
        this.receiverFullName = receiverFullName;
        this.receiverPhone = receiverPhone;
        this.date = date;
        this.state = state;
        this.server = server;
    }
}