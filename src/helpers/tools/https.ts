// Import core node modules.
import { IncomingMessage, ClientRequest } from "http";
import https from "https";

// Import Default Configuration.
import { HEADERS, METHOD, TIMEOUT } from "./../../config/request";

/** Import Types */
import RequestResponse from "./../../types/request-response";
import RequestOptions from "./../../types/request-options";

const Https = {
  /**
   * @name request
   * @description Create HTTPS Requests.
   * @param {RequestOptions} options Request custom object options.
   * @returns {Promise<RequestResponse | Error>} Return promise with the response received or error.
   */
  request: (options: RequestOptions): Promise<RequestResponse> =>
    new Promise<RequestResponse>((resolve, reject) => {
      const {
        hostname,
        port,
        path,
        method,
        headers,
        body,
        timeout,
        key,
        cert,
        agent,
      } = options;
      const white_list = ["api.uphold.com", "www.uphold.com"];
      const url = new URL(`https://${hostname}`);
      const remote_hostname = url.hostname;
      if (!white_list.includes(remote_hostname))
        reject(new Error("Url is not in whitelist"));
      const req: ClientRequest = https.request(
        {
          hostname,
          port,
          path,
          method: method || METHOD,
          headers: headers || HEADERS,
          timeout: timeout || TIMEOUT,
          key,
          cert,
          agent,
        },
        (res: IncomingMessage) => {
          // Get all chunks for create a data string with all reponse content.
          let data: string = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          // Resolve this promise when the request finish.
          res.on("end", () => {
            const result: RequestResponse = {
              statusCode: res.statusCode,
              statusMessage: res.statusMessage,
              data,
            };
            resolve(result);
          });
        }
      );
      // Create reject if the request exceed the timeout timer limit.
      req.on("timeout", () => {
        reject(new Error("Request Timeout Executed"));
      });
      // Create reject if register an error.
      req.on("error", (err: Error) => {
        reject(err);
      });
      // Write data to request body if exist.
      if (body) req.write(body);
      // Execute the request.
      req.end();
    }),
};

export default Https;
