"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const request_1 = require("./../../config/request");
const Http = {
    request: (options) => new Promise((resolve, reject) => {
        const { hostname, port, path, method, headers, body, timeout, agent } = options;
        const white_list = ["api.uphold.com", "www.uphold.com"];
        const url = new URL(`http://${hostname}`);
        const remote_hostname = url.hostname;
        if (!white_list.includes(remote_hostname))
            reject(new Error("Url is not in whitelist"));
        const req = http_1.default.request({
            hostname,
            port,
            path,
            method: method || request_1.METHOD,
            headers: headers || request_1.HEADERS,
            timeout: timeout || request_1.TIMEOUT,
            agent,
        }, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                const result = {
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                    data,
                };
                resolve(result);
            });
        });
        req.on("timeout", () => {
            reject(new Error("Request Timeout Executed"));
        });
        req.on("error", (err) => {
            reject(err);
        });
        if (body)
            req.write(body);
        req.end();
    }),
};
exports.default = Http;
//# sourceMappingURL=http.js.map