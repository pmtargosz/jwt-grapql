import React from 'react';
import { NavLink } from 'react-router-dom';
import { useMeQuery, useLogoutMutation } from './generated/graphql';
import { setAccessToken } from './accessToken';

interface Props {}

export const Header: React.FC<Props> = () => {
  const { data, loading } = useMeQuery({ fetchPolicy: 'network-only' });
  const [logout, { client }] = useLogoutMutation();
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/bye">Bye</NavLink>
          </li>
        </ul>
      </nav>
      {loading && <div>Loading...</div>}
      {data && data.me && !loading ? (
        <>
          <div>You are login as: {data.me.email} </div>
          <button
            onClick={async () => {
              await logout();
              setAccessToken('');
              await client!.resetStore();
            }}
          >
            Log out
          </button>
        </>
      ) : (
        <div>Not loged in</div>
      )}
    </header>
  );
};
