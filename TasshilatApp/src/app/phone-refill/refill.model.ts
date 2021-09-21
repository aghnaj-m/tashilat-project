import { User } from "../auth/user.model";
import { Client } from "./client.model";

export class Refill {

    public id: number;
    public amount: number;
    public offer: string;
    public date: Date;
    public client: Client;
    public server: User;

    constructor(id:number, amount: number, offer: string, date: Date, client:Client, server: User)
    {
        this.id = id;
        this.amount = amount;
        this.offer = offer;
        this.date = date;
        this.client = client;
        this.server = server;
    }

}