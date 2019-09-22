import React from 'react';
import { useUsersQuery } from '../generated/graphql';

interface Props {}

export const Home: React.FC<Props> = () => {
  const { data } = useUsersQuery({ fetchPolicy: 'network-only' });
  const displayUsers =
    data && data.users.map(user => <li key={user.id}>{user.email}</li>);
  return (
    <div>
      <h1>Home Page</h1>
      {!data && <div>Loading....</div>}
      {data && (
        <div>
          <h2>Users:</h2>
          <ul>{displayUsers}</ul>
        </div>
      )}
    </div>
  );
};
