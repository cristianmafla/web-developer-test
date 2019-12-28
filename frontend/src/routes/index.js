import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Rutas from './routes';
import TemplateLayout from '../view/TemplateLayout';

class Routes extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Switch>
            <TemplateLayout >
              {Rutas.map((props, key) => <Route key={key} exact path={props.url} component={props.component} />)}
            </TemplateLayout>
        </Switch>
      </Router>
    );
  }
}

export default Routes;
