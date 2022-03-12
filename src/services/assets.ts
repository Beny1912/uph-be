import Request from "../helpers/request";
import RequestOptions from "../types/request-options";
import RequestResponse from "../types/request-response";

export const getAssets = async () => {
  let response: RequestResponse;
  const options: RequestOptions = {
    hostname: "api.uphold.com",
    path: `/v0/assets`,
  };

  try {
    response = await Request.send(options);
  } catch (error) {
    response = error;
  }

  return response;
};
