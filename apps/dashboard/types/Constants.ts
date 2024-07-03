type ErrorDetail = {
  title: string;
  description?: string;
};

export type ErrorCodes = {
  "not-authenticated": ErrorDetail;
  "unauthorized-site-access": string | ErrorDetail;
};

