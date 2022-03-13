// Import the main dependencies.
import dotenv, { DotenvConfigOptions } from "dotenv";

export default {
  config: (options?: DotenvConfigOptions) =>
    new Promise((resolve, reject) => {
      try {
        dotenv.config(options);
        resolve("");
      } catch (err) {
        reject(err);
      }
    }),
};
