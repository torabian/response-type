export interface IResponseErrorItem {
  domain?: string;
  reason?: string;
  message?: string;
  location?: string;
  locationType?: string;
  extendedHelp?: string;
  sendReport?: string;
}

export interface IResponseError {
  code?: Number;
  message: string;
  errors?: Array<IResponseErrorItem>;
}

export interface IResponseData<T> {
  kind?: string;
  fields?: string;
  etag?: string;
  id?: string;
  lang?: string;
  updated?: string;
  deleted?: boolean;
  currentItemCount?: Number;
  itemsPerPage?: Number;
  startIndex?: Number;
  totalItems?: Number;
  pageIndex?: Number;
  totalPages?: Number;
  items?: Array<T>;
  [key: string]: any;
}

export interface IResponse<T> {
  apiVersion?: string;
  context?: string;
  id?: string;
  params?: {
    id?: string;
  };
  data?: IResponseData<T>;
  error?: IResponseError;
}

/**
 * @description Checks if an API is successful regardless of warning messages it has thrown out.
 */
export function IsSuccess<T>(response: IResponse<T>) {
  // By definition, if data is not present then it is not successful.
  if (!response.data) {
    return false;
  }

  const { fields, items } = response.data;

  if (fields || (items && isArray(items))) {
    return true;
  }

  return false;
}

/**
 * @description Checks if an API returned a failure response, regardless of http status code.
 * You cannot use IsSuccess and negate it, because if data is present then the API is successful,
 * and error object can refer to the 'warnings' issued.
 */
export function IsFailure<T>(response: IResponse<T>) {
  // By definition, if data is not present then it is not successful.
  if (!response.data && response.error) {
    return true;
  }

  return false;
}

function isArray(o) {
  return Object.prototype.toString.call(o) === "[object Array]";
}
