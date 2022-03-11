import Request from "../helpers/request";
import RequestOptions from "../types/request-options";

export const getAssets = async () => {
  const options: RequestOptions = {
    hostname: "api.uphold.com",
    path: `/v0/ticker/assets`,
  };

  const result: any = await Request.send(options);

  return result;
};
