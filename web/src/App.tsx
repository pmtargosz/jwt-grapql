import React, { useState, useEffect } from 'react';
import { Routes } from './Routes';
import { setAccessToken } from './accessToken';

interface Props {}

export const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DEV_API_URL}/refresh_token`, {
      method: 'post',
      credentials: 'include'
    }).then(async response => {
      const { accessToken } = await response.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);
  return loading ? <div>loading....</div> : <Routes />;
};
