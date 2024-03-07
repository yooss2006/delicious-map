import React from 'react';
import { useLocation } from 'react-router-dom';

export const useParsedLocation = () => {
  const location = useLocation();

  const value = React.useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    const query: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      query[key] = value;
    });
    return {
      ...location,
      query,
    };
  }, [location]);

  return value;
};
