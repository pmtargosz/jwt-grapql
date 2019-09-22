import React from 'react';
import { useByeQuery } from '../generated/graphql';

interface Props {}

export const Bye: React.FC<Props> = () => {
  const { data, loading, error } = useByeQuery({
    fetchPolicy: 'network-only'
  });
  console.log(error, data);
  return (
    <div>
      <h1>Bye Page</h1>
      {loading && <div>Loading...</div>}
      {error && <div>error - {error.message}</div>}
      {data && <div>{data.bye}</div>}
    </div>
  );
};
