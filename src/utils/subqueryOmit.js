/**
 * Helper function to get only parts of a query. Specify
 * which parameters to omit.
 */
export default function subqueryOmit(query, ...omitParams) {
  if (!query) {
    return query;
  }

  return Object.keys(query).filter(param => !omitParams.includes(param))
    .reduce((newQuery, param) => {
      newQuery[param] = query[param];
      return newQuery;
    }, {});
}
