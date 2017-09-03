import React from "react";
import {connect} from "react-redux";
import {push, ConnectedRouter} from "react-router-redux";
import {Route, Switch} from "react-router-dom";

import MainPage from './MainPage';
import ViewPage from './ViewPage';
import StudentListPage from "./StudentListPage";
import StudentPage from './StudentPage';
import LocationListPage from "./LocationListPage";
import LocationPage from './LocationPage';
import SettingsPage from './SettingsPage';
import HistoryListPage from './HistoryListPage';

import {activateListener} from "../socket";
import history from "../history";
import Navbar from "./Navbar";

class MainSectionLayout extends React.Component {
  componentWillMount(){
    activateListener(this.props.dispatch, this.props.user.user.data.house);
  }
  render() {
    return (
      <ConnectedRouter history={history}>
        <div>
          <Navbar/>
          <Switch>
            <Route exact path="/" name="dashboard" component={({props}) => (<MainPage {...props}/>)}></Route>
            <Route path="/view" name="view" component={({props}) => (<ViewPage {...props}/>)}></Route>
            <Route exact path="/students" name="studentlist" component={({props}) => (<StudentListPage {...props}/>)}></Route>
            <Route path="/students/new" name="newstudent" component={({props}) => (<StudentPage {...props}/>)}></Route>
            <Route path="/students/:student" name="student" component={({props, match}) => (<StudentPage edit studentID={match.params.student} {...props}/>)}></Route>
            <Route exact path="/locations" name="locationlist" component={({props}) => (<LocationListPage {...props}/>)}></Route>
            <Route path="/locations/new" name="newlocation" component={({props}) => (<LocationPage {...props}/>)}></Route>
            <Route path="/history" name="history" component={({props}) => (<HistoryListPage {...props}/>)}></Route>
            <Route path="/locations/:location" name="location" component={({props, match}) => (<LocationPage edit locationID={match.params.location} {...props}/>)}></Route>
            <Route path="/settings" name="settings" component={({props}) => (<SettingsPage {...props}/>)}></Route>
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  };
}

export default connect(mapStateToProps)(MainSectionLayout);
