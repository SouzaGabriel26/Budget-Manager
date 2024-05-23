export type GoogleGetCodeOptions = {
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
};

export type GoogleGetTokenOptions = {
  client_id: string;
  client_secret: string;
  code: string;
  grant_type: string;
  redirect_uri: string;
};
