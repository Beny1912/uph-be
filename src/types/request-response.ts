interface RequestResponse {
  // Status Code .
  statusCode?: number;
  // Status Message.
  statusMessage?: string;
  // A string buffer with all reponse by endpoint.
  data?: string;
  // Error Name.
  name?: string;
  // Error Message.
  message?: string;
  // Error Stack.
  stack?: string;
}

export default RequestResponse;
