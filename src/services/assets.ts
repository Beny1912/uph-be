import Request from "../helpers/request";
import RequestOptions from "../types/request-options";
import RequestResponse from "../types/request-response";

/**
 * @name getAssets
 * @description Lists all assets.
 * @returns {Promise<RequestResponse | Error>} Return promise with the response received or error.
 */
export const getAssets = async () => {
  return new Promise<RequestResponse | Error>(async (resolve, reject) => {
    const options: RequestOptions = {
      hostname: "api.uphold.com",
      path: `/v0/assets`,
    };
    try {
      let response = await Request.send(options);

      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
};
