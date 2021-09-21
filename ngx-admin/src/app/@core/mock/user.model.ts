export class User {

  public id: number;
  public cin: string;
  public firstName: string;
  public lasttName: string;
  public login: string;
  public telephone: string;

  constructor(
    id: number,
    cin: string,
    firstName: string,
    lasttName: string,
    login: string,
    telephone: string,
  ) { 
    this.id = id;
    this.login = login;
    this.firstName = firstName;
    this.lasttName = lasttName;
    this.telephone = telephone;
    this.cin = cin;
  }


}
