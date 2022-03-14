import RequestResponse from "./../../types/request-response";
import RequestOptions from "./../../types/request-options";
declare const Http: {
    request: (options: RequestOptions) => Promise<RequestResponse>;
};
export default Http;
