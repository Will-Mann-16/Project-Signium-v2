import React from "react";
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter, push} from 'react-router-redux';
import { connect } from "react-redux"

import MainSectionLayout from './MainSectionLayout';

import {fetchUserData} from "../actions/usersActions";
import {activateListener} from "../socket";


import LoginModal from './LoginModal';

const NoMatch = ({location}) => (
  <div>
    <h1>Error - 404</h1>
    <h3>No match for
      <code>{location.pathname}</code>
    </h3>
  </div>
);

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showLogin: !this.props.user.authenticated
    }
  }
  componentWillMount() {
    this.props.dispatch(fetchUserData());
  }
  componentWillReceiveProps(newProps){
    if(newProps.user.authenticated){
      activateListener(newProps.dispatch);
    }
  }
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <Switch>
          <MainSectionLayout/>
          <LoginModal show={this.state.showLogin}/>
          <Route component={NoMatch}/>
        </Switch>
      </ConnectedRouter>
    );
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  }
}

export default connect(mapStateToProps)(App)
