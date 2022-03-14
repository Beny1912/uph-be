/// <reference types="node" />
interface RequestOptions {
    protocol?: string;
    hostname: string;
    port?: number | string;
    path?: string;
    method?: string;
    headers?: any;
    body?: string;
    timeout?: number;
    key?: Buffer;
    cert?: Buffer;
    agent?: boolean;
}
export default RequestOptions;
