import request from "Api/request";

export default {
  get clientCookie() {
    if(!this._clientCookie) {
      this._clientCookie = localStorage.clientCookie;
    }

    return this._clientCookie;
  },

  set clientCookie(cookie) {
    localStorage.setItem("clientCookie", cookie);
    this._clientCookie = cookie;
    return cookie;
  },

  get isLoggedIn() { return !!this.clientCookie; },

  performLoginCheck() {
    if(!!this.clientCookie) {
      return request.performGet("/api/tokens/check", {
        token: this.clientCookie
      }).then((token) => {
        this.tokenData = token
        return true;
      }).catch((_) => {
        this.clientCookie = null;
        return false;
      });
    } else return Promise.resolve(false);
  },

  performLogin(email, password) {
    return request.performPost("/api/tokens", {
      token: { type: "session" },
      user: { email, password }
    }).then((token) => this.tokenData = token)
  }
};
