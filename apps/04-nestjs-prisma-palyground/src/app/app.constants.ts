export const ENTITY_FOUND = 'entity was found';
export const NO_ENTITY_FOUND = 'no entity was found';

export const PARAMETERS_FAILED_VALIDATION = 'parameters failed validation';

export const ENTITY_CREATED = 'entity was created';
export const ENTITY_ACCEPTED = 'entity was accepted';
export const INTERNAL_SERVER_ERROR = 'internal server error occurred';
export const ENTITY_MODIFIED = 'entity was modified';
export const ENTITY_DELETED = 'entity was deleted';

export const RESULTS_RETURNED = 'results were returned';
export const USER_NOT_FOUND =
  'Unable to get user from User Entity based on userAuthId';
export const JKWS_RATE_LIMIT = true;
export const JKWS_CACHE = true;
export const JKWS_REQUESTS_PER_MINUTE = 10;
export const BAD_REQUEST = 'bad request';
export const UNAUTHORIZED_REQUEST = 'user unauthorized';

export const INVALID_AUTH_PROVIDER = 'Not Supported Auth provider';
export const INVALID_BEARER_TOKEN =
  'Invalid Authorization token - Token does not match Bearer .*';
export const INVALID_AUTH_TOKEN = 'Invalid Auth Token';
export const INVALID_AUTH_TOKEN_SOURCE =
  'Invalid Auth Token or invalid source of this token, unable to fetch SigningKey for token';
export const MISSING_AUTH_HEADER = 'Missing Authorization Header';

export const ALLOWED_MIMETYPES = [
  'image/jpg', //jpeg
  'image/jpeg', //jpeg
  'image/png', //png
  'text/plain', //txt
  'image/svg+xml',
  'application/pdf', //pdf
  'application/msword', //doc
  'application/vnd.ms-powerpoint', //pptx
  'application/vnd.ms-excel', //xls
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', //docx
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', //pptx
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', //xlsx
];
