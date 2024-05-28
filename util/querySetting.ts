interface QueryObject<T> {
  [key: string]: T | T[] | undefined;
}

export function convertQuery<T>(query: QueryObject<T>): string {
  let convertedQuery = "";
  if (query) {
    const queryParams = new URLSearchParams();
    for (const key in query) {
      const value = query[key];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          queryParams.append(key, item as string);
        });
      } else if (value !== undefined) {
        queryParams.append(key, query[key]!.toString());
      }
    }

    const queryString = queryParams.toString();
    if (queryString) {
      convertedQuery += `?${queryString}`;
    }
  }
  return convertedQuery;
}
