import Request from "../helpers/request";
import RequestOptions from "../types/request-options";
import RequestResponse from "../types/request-response";

/**
 * @name getTickerPair
 * @description Retrieves the exchange rate of a currency relative to any other currency. (The order of the currencies in the pair affects the output).
 * @param {String} pair string.
 * @returns {Promise<RequestResponse | Error>} Return promise with the response received or error.
 */
export const getTickerPair = async (pair: string = "BTC-USD") => {
  let response: RequestResponse;
  const options: RequestOptions = {
    hostname: "api.uphold.com",
    path: `/v0/ticker/${pair}`,
  };
  try {
    response = await Request.send(options);
  } catch (error) {
    response = error;
  }

  return response;
};
/**
 * @name getTickerByCurrency
 * @description Lists all exchange rates relative to a given currency.
 * @param {String} currency string.
 * @returns {Promise<RequestResponse | Error>} Return promise with the response received or error.
 */

export const getTickerByCurrency = async (currency: string = "USD") => {
  let response: RequestResponse;

  const options: RequestOptions = {
    hostname: "api.uphold.com",
    path: `/v0/ticker/${currency}`,
  };

  try {
    response = await Request.send(options);
  } catch (error) {
    response = error;
  }

  return response;
};
