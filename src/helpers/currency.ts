import RequestResponse from "../types/request-response";
import { getAssets } from "./../services/assets";

const Currency = {
  /**
   * @name getInArray
   * @description Push all currencies in array.
   * @param {RequestOptions} assets Request custom object options.
   * @returns {Promise<RequestResponse | Error>} Return promise with the response received or error.
   */
  getInArray: async (assets: RequestResponse): Promise<any> => {
    let response: Array<string>;

    if (assets.statusCode === 200) {
      // Generate array with all code currencies
      response = JSON.parse(assets.data).map((e) => e.code);
    } else {
      response = [];
    }

    return response;
  },
  /**
   * @name checkIfExists
   * @description Check if currency exist in array of currencies.
   * @param {Array<string>} currencies array list of all currencies.
   *  @param {string} currency Currency to compare.
   * @returns Bolean Return boolean with result.
   */
  checkIfExists: async (currencies: Array<string>, currency: string) => {
    let response: boolean;

    if (currencies.length > 0) {
      // Check if exists currency in array with all currencies
      response = currencies.some((e) => e === currency);
    } else {
      response = false;
    }

    return response;
  },
  /**
   * @name validate
   * @description validate if currency exist in array of currencies.
   *  @param {string} currency Currency to compare.
   * @returns Bolean Return boolean with result.
   */

  validate: async (currency: string) => {
    let array: Array<string> = await Currency.getInArray(await getAssets());
    let exist: boolean = await Currency.checkIfExists(array, currency);

    return exist;
  },
};

export default Currency;
