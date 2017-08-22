import whatFetch from "whatwg-fetch";

let fetch;
if(typeof(whatFetch) == "object") {
  fetch = window.fetch;
} else { fetch = whatFetch; }

class UnauthorizedError extends Error {}

export default {
  UnauthorizedError,

  performPost(url, data) {
    return this.perform(url, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  },

  perform(url, options) {
    return fetch(url, options)
      .then(this._checkRequestStatus)
      .then(this._logRequest)
      .then(this._parseRequestJson)
      .catch(this._failRequest); 
  },

  _checkRequestStatus(response) {
    if(response.status == 401 || response.status == 403) {
      // need to re-login.
      let error = new UnauthorizedError(response.statusText);
      error.response = response;
      throw error;
    } else if(response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  },

  _parseRequestJson(response) {
    if(response.headers.get("Content-Type") == "application/json") {
      return response.json();
    } else return response;
  },

  _logRequest(response) {
    console.log(response);
    return response;
  },

  _failRequest(ex) {
    console.error(ex);
    throw ex;
  }
}
