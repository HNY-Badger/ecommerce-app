export type TokenResponse = {
  access_token: string;
  expires_in: number;
};

export type CustomerTokenResponse = TokenResponse & {
  refresh_token: string;
};
