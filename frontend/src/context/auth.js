import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { LOGIN_USER } from '../utils/variables';

export const ContextAuth = createContext({
	authenticated: false,
	user: {},
	startSession: () => {},
	closeSession: () => {}
});

export function AuthorizationProvider(props) {

	const [ authenticated, setAuthenticated ] = useState(false);
  const [ user, setUser ] = useState({});
  
  useEffect(() => {
    
    (async() => {
      
      if(sessionStorage.getItem('token')){
        const TokenVerification = await jwt.verify(
          sessionStorage.getItem('token'),
          process.env.REACT_APP_SECRET_KEY_TOKEN
        );
				
        if(TokenVerification){
					setAuthenticated(true);
					setUser(TokenVerification);
        }
        return;
      }

		})();

  },[]);

	const loginSession = async (email, password) => {
		try {
			const { data } = await axios.post(LOGIN_USER, { email, password });

			if (data.state) {

				sessionStorage.setItem('token', data.data);

				const TokenVerification = await jwt.verify(
					sessionStorage.getItem('token'),
					process.env.REACT_APP_SECRET_KEY_TOKEN
				);

				if (TokenVerification) {
					setAuthenticated(true);
					setUser(TokenVerification);
				}
			}
		} catch (error) {
			console.log('=======error=======> ', error);
			throw error;
		}
	};

	const logoutSession = () => {
		try {
			sessionStorage.removeItem('token');
			setAuthenticated(false);
			setUser({});
		} catch (error) {
			console.log('=======error=======> ', error);
			throw error;
		}
	};

	return (
		<ContextAuth.Provider
			value={{
				authenticated,
				user,
				startSession: loginSession,
				closeSession: logoutSession
			}}
		>
			{props.children}
		</ContextAuth.Provider>
	);
}
