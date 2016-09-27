/**
* Helper function to get only parts of a query. Specify
* which parameters to include.
*/
export default function subquery(query, ...params) {
  if (!query) {
    return query;
  }

  return params.reduce((newQuery, param) => {
    newQuery[param] = query[param];
    return newQuery;
  }, {});
}
