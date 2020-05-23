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
