import React, { useState } from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();
  return (
    <div>
      <h1>Register Page</h1>
      <form
        onSubmit={async e => {
          e.preventDefault();
          const response = await register({
            variables: {
              email,
              password
            }
          });
          console.log('Form Submited', response);
          if (response && response.data) {
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
