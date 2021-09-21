export class User {
    constructor(
      public uid: number,
      public username: string,
      public firstName: string,
      public lasttName: string,
      public phoneNumber: string,
      public cin: string,
      private _token: string,
      private _tokenExpirationDate?: Date,
      private _refreshToken?: string,
    ) {}
  
    get token() {
      if (!this._token) {
        return null;
      }
      return this._token;
    }
  
    get refreshToken() {
      if (!this._refreshToken) {
        return null;
      }
      return this._refreshToken;
    }

    get tokenExpirationDate()
    {
        if(!this._token)
        {
            return null;
        }
        return this._tokenExpirationDate;
    }
  
    get tokenDuration() {
      if (!this.token) {
        return 0;
      }
      return this.tokenExpirationDate.getTime() - new Date().getTime();
    }
  }
  