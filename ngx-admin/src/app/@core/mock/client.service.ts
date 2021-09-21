import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from './client.model';
import { environment } from 'environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ClientService {

    baseUrl = environment.apiBaseUrl;
    //private _clients = new BehaviorSubject<Refill[]>([]);

    constructor(private http: HttpClient) { }

    addClient(client: Client) {
        return this.http.post(`http://${this.baseUrl}:8081/clients/save`,{...client});
    }

}