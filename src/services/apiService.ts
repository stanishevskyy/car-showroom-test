export const wait = () => {
  return new Promise((resolve) => setTimeout(resolve, 600));
};

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const request = async <T>(url: string, method: RequestMethod = 'GET', data: unknown = null): Promise<T> => {
  await wait();

  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=utf-8',
    };
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};
