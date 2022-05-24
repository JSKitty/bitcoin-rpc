'use strict';

const http = require('http');
const https = require('https');

const request = async (endpoint, method, body) => {
    const url = new URL(endpoint);
    const opts = {
        'auth': url.username + ':' + url.password,
        'host': url.host,
        'hostname': url.hostname,
        'port': url.port,
        'href': url.href,
        'protocol': url.protocol,
        'path': url.pathname + url.search,
        'method': method
    };

    const server = opts.protocol === 'https:' ? https : http;
    return new Promise((resolve, reject) => {
        const req = server.request(opts, (res) => {
            let strData = '';
            res.setEncoding('utf8');

            res.on('data', d => strData += d);

            res.on('end', () => {
                // Return the full string
                if(res.statusCode === 200) {
                    resolve(strData);
                }
                else {
                    reject(strData ? strData : res);
                }
            });
        });

        req.on('error', error => reject(error));
        req.setHeader('User-Agent', 'btc-rpc-client');

        if (body) req.write(body);

        req.end();
    });
};

exports.post = async (endpoint, body) => {
    return await request(endpoint, 'POST', body);
};