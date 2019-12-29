import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Rutas from './routes';
import TemplateLayout from '../view/TemplateLayout';
import { AuthorizationProvider } from '../context/auth';

class Routes extends Component {
	state = {};
	render() {
		return (
			<Router>
				<Switch>
					<AuthorizationProvider>
						<TemplateLayout>
							{Rutas.map((props, key) => (
								<Route key={key} exact path={props.url} component={props.component} />
							))}
						</TemplateLayout>
					</AuthorizationProvider>
				</Switch>
			</Router>
		);
	}
}

export default Routes;
