import { User } from "../auth/user.model";

export class Bill {

    public id: number;
    public amount: number;
    public client_number: number;
    public contract_number: number;
    public date: Date;
    public deadline: Date;
    public paid: boolean;
    public type: string;
    public server: User;

    constructor(id: number,
        amount: number,
        client_number: number,
        contract_number: number,
        date: Date,
        deadline: Date,
        paid: boolean,
        type: string,
        server: User) {
            this.id = id;
            this.amount = amount;
            this.client_number = client_number;
            this.contract_number = contract_number;
            this.date = date;
            this.deadline = deadline;
            this.paid = paid;
            this.type = type;
            this.server = server;
    }
}