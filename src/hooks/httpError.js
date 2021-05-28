import { useState, useEffect } from "react";

const HttpClientInterceptor = (httpClient) => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });

  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [httpClient, reqInterceptor, resInterceptor]);

  const closeModal = () => {
    setError(null);
  };

  return [error, closeModal];
};

export default HttpClientInterceptor;
