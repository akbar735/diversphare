import { network } from "./constants/httpMethods";

export class HttpRequest {
  constructor(successCallBack, failureCallBack) {
    this.successCallBack = successCallBack;
    this.failureCallBack = failureCallBack;
    this.option = {
      mode: "cors", // no-cors, *cors, same-origin
      cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        //"Authorization": // automatically shoud be added from Authorization cookie
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
  }

  async _fetch(url, option) {
    try {
      const resposne = await fetch(url, option);
      const json = await resposne.json();
      json.ok = resposne.ok;
      json.status = resposne.status;
      json.statusText = resposne.statusText;
      return json;
    } catch (error) {
      return error;
    }
  }

  async _request(url, method, payload) {
    // this.successCallBack({ status: 200, message: "User Created" });
    // return;
    if (url) {
      const result = await this._fetch(url, {
        ...this.option,
        method,
        body: payload ? JSON.stringify(payload) : undefined,
      });
      if (result instanceof Error) {
        if (this.failureCallBack) this.failureCallBack(result);
      } else {
        if (this.successCallBack) this.successCallBack(result);
      }
    }
  }

  get(url) {
    this._request(url, network.GET);
  }
  post(url, payload) {
    this._request(url, network.POST, payload);
  }
  patch(url, payload) {
    this._request(url, network.PATCH, payload);
  }
  put(url, payload) {
    this._request(url, network.PUT, payload);
  }
  delete(url) {
    this._request(url, network.DELETE);
  }
}
