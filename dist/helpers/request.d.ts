import RequestResponse from "./../types/request-response";
import RequestOptions from "./../types/request-options";
declare const Request: {
    send: (options: RequestOptions) => Promise<RequestResponse>;
};
export default Request;
