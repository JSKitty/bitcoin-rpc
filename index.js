'use strict';

const NET = require('./net');

class RPC {
    /** 
    * A Bitcoin RPC Client
    * @param {string} user - The RPC username
    * @param {string} pass - The RPC password
    * @param {string} host - The RPC host
    * @param {number} port - The RPC port
    * @example
    * new RPC('user', 'pass', '127.0.0.1', 8332);
    */
    constructor(user, pass, host, port) {
        this.user = user;
        this.pass = pass;
        this.host = host;
        this.port = port;
        this._id = 0;
    }

    /**
     * Call an RPC method
     * 
     * This will return the exact `result` of the RPC output, which may be a `string` or a JSON `object`.
     * @returns {Promise<Object|string>} The result of the RPC call
     */
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
