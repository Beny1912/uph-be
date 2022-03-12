import RequestResponse from "../types/request-response";
import { getAssets } from "./../services/assets";

const Currency = {
  /**
   * @name getInArray
   * @description Push all currencies in array.
   * @param {RequestOptions} options Request custom object options.
   * @returns {Promise<RequestResponse | Error>} Return promise with the response received or error.
   */
  getInArray: async (assets: RequestResponse): Promise<any> => {
    let response: Array<string>;

    assets.statusCode === 200
      ? (response = JSON.parse(assets.data).map((e) => e.code))
      : (response = []);

    return response;
  },

  checkIfExists: async (currencies: Array<string>, currency?: string) => {
    let response: boolean;

    currencies.length > 0
      ? (response = currencies.some((e) => e === currency))
      : (response = false);

    return response;
  },

  validate: async (currency: string) => {
    let array: Array<string> = await Currency.getInArray(await getAssets());
    let exist: boolean = await Currency.checkIfExists(array, currency);

    return exist;
  },
};

export default Currency;
