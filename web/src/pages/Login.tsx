import React, { useState } from 'react';
import { useLoginMutation, MeDocument, MeQuery } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { setAccessToken } from '../accessToken';

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();
  return (
    <div>
      <h1>Login Page</h1>
      <form
        onSubmit={async e => {
          e.preventDefault();
          const response = await login({
            variables: {
              email,
              password
            },
            update: (store, { data }) => {
              if (!data) {
                return null;
              }
              store.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: data.login.user
                }
              });
            }
          });
          console.log('Form Submited', response);
          if (response && response.data) {
            setAccessToken(response.data.login.accessToken);
            history.push('/');
          }
        }}
      >
        <div>
          <input
            value={email}
            type="email"
            autoComplete="off"
            autoCorrect="off"
            placeholder="Email"
            onChange={ev => setEmail(ev.target.value)}
            required
          />
        </div>
        <div>
          <input
            value={password}
            type="password"
            autoComplete="off"
            autoCorrect="off"
            placeholder="Password"
            onChange={ev => setPassword(ev.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
