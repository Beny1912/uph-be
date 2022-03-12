interface RequestOptions {
  // Request protocol http/s
  protocol?: string;
  // Alias of the hostname, for example: everis.com (whitout https://)
  hostname: string;
  // Port number request
  port?: number | string;
  // Request path. Should include query string if any. E.G. '/news/?page=12'
  path?: string;
  // A string specifying the HTTP request method. Default: 'GET'
  method?: string;
  // Object with custom headers model
  headers?: any;
  // A optional string whit the content to send
  body?: string;
  // Number of milliseconds that the request await be resolved
  timeout?: number;
  // Buffer file key.
  key?: Buffer;
  // Buffer file certificate
  cert?: Buffer;
  // Https Global Agent
  agent?: boolean;
}

export default RequestOptions;
