import RequestResponse from "../types/request-response";
declare const Currency: {
    getInArray: (assets: RequestResponse) => Promise<any>;
    checkIfExists: (currencies: Array<string>, currency: string) => Promise<boolean>;
    validate: (currency: string) => Promise<boolean>;
};
export default Currency;
