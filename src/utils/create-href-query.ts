import { ParsedUrlQueryInput } from "querystring";

export function createHrefQueryHoc(queries: ParsedUrlQueryInput) {
  return function (additionalQueries: ParsedUrlQueryInput) {
    return Object.assign({}, queries, additionalQueries);
  };
}
