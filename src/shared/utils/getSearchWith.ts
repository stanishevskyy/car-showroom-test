export type SeacrhParams = {
  query?: string;
  brand?: string;
  price?: string;
  sortBy?: string;
};

export const getSearchWith = (currentSearchParams: URLSearchParams, paramsToUpdate: SeacrhParams) => {
  const newParams = new URLSearchParams(currentSearchParams);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '' || value === '0') {
      newParams.delete(key);

      return;
    }

    newParams.set(key, String(value));
  });

  return newParams.toString();
};
