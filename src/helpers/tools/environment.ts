// Import the main dependencies.
import dotenv, { DotenvConfigOptions } from "dotenv";

export default {
  /**
   * @name config
   * @description Load Environments project.
   * @param {DotenvConfigOptions} options config to load
   * @returns {Promise<RequestResponse | Error>} Return promise with the response received or error.
   */
  config: (options?: DotenvConfigOptions) =>
    new Promise((resolve, reject) => {
      try {
        //Add config to dotenv
        dotenv.config(options);
        // Resolve promise
        resolve("");
      } catch (err) {
        // Reject with error
        reject(err);
      }
    }),
};
