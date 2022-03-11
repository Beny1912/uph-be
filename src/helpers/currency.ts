import RequestResponse from "../types/request-response";
import { getAssets } from "./../services/assets";

const Currency = {
  /**
   * @name getInArray
   * @description Push all currencies in array.
   * @param {RequestOptions} options Request custom object options.
   * @returns {Promise<RequestResponse | Error>} Return promise with the response received or error.
   */
  getInArray: async (currencies: Array<Object>): Promise<any> => {
    const resultAssets: RequestResponse = await getAssets();

    return [];
  },
};

export default Currency;
