'use strict';

const NET = require('./net');

class RPC {
    constructor(user, pass, host, port) {
        this.user = user;
        this.pass = pass;
        this.host = host;
        this.port = port;
        this._id = 0;
    }

    async call() {
        try {
            const request = {
                'jsonrpc': '1.0',
                'id': this._id++,
                'method': arguments[0],
                'params': [...arguments].splice(1)
            };
            let res = JSON.parse(await NET.post('http://' +
                                this.user + ':' +
                                this.pass + '@' +
                                this.host + ':' +
                                this.port,
            JSON.stringify(request)));
            // Result may be JSON or a string, so we'll attempt to parse JSON, but if it fails then it's fine too! It's a string
            try {
                res = JSON.parse(res.result);
            }
            catch(e) {
                res = res.result;
            }
            return res;
        }
        catch(e) {
            throw e.json ? (await e.json()).error : e;
        }
    }
}

module.exports = RPC;
