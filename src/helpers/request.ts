// Import core node modules.
import Https from "./tools/https";
import Http from "./tools/http";

/** Import Types */
import RequestResponse from "./../types/request-response";
import RequestOptions from "./../types/request-options";

const Request = {
  /**
   * @name Request
   * @description Create HTTP/S Requests.
   * @param {RequestOptions} options Request custom object options.
   * @returns {Promise<RequestResponse | Error>} Return promise with the response received or error.
   */
  send: async (options: RequestOptions): Promise<RequestResponse> => {
    const { protocol } = options;
    const result: any =
      !protocol || protocol === "https"
        ? await Https.request(options)
        : await Http.request(options);
    return result;
  },
};

export default Request;
