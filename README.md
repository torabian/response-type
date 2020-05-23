# response-type: Google JSON StyleGuide tools and definition for JS/TS

A set of definitions for google JSON StyleGuide to unify the API responses. This library has those definitions in typescript, and allows you to use
some helper functions such as `IsSuccess` and `IsFailure` to detect the responses from server.

https://google.github.io/styleguide/jsoncstyleguide.xml

## Installing 

You can install this library quite easily:

```
npm install response-type --save
```

or using yarn:

```
yarn add response-type
```

## Using response-type

Just import it into your application via `import` statement:

```
import { IResponse, IResponseErrorItem, /* rest of things you need */ } from 'response-type';
```


## List of definitions

We implement exact what google defines. For understanding this schema, read google documentation:

https://google.github.io/styleguide/jsoncstyleguide.xml

### IResponse<T>

Defines the entire body of the response. If a JSON coming from server, it should match this schema.

```
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
```


### IResponseData<T>

Defines the success part of the API response as data.

```
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
```


### IResponseError<T>

Defines the failure part of the API response, and contains the error message, and a list of sub errors (for example related to an specific input)

```
export interface IResponseError {
  code?: Number;
  message: string;
  errors?: Array<IResponseErrorItem>;
}
```


### IResponseErrorItem<T>

Defines an error particle inside the error object.

```
export interface IResponseErrorItem {
  domain?: string;
  reason?: string;
  message?: string;
  location?: string;
  locationType?: string;
  extendedHelp?: string;
  sendReport?: string;
}
```


## Functions

### IsSuccess

You can check if a response was successful using this function.

```
import { IsSuccess } from 'response-type';

const response = {
  data: {
    fields: 'name,phone',
    name: 'ali',
    phone: '+989199493941'
  }
}

console.log(IsSuccess(response));

// true

```

### IsFailure

You can check if a response was failed due to some reasons.

```
import { IsFailure } from 'response-type';

const response = {
  error: {
    code: 0
    message: 'Unknown error',
    errors: [
      {
        location: 'name',
        message: 'Name is very wrong'
      }
    ]
  }
}

console.log(IsFailure(response));
// true
```


## Credits

Implemented by Ali Torabi.