import React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Route, Redirect, withRouter} from "react-router-dom";

import MainPage from './MainPage';
import ViewPage from './ViewPage';
import StudentListPage from "./StudentListPage";
import StudentPage from './StudentPage';
import LocationListPage from "./LocationListPage";
import LocationPage from './LocationPage';

import Navbar from "./Navbar.js";

class MainSectionLayout extends React.Component {
  render() {
    return (
      <main>
        <Navbar/>
        <Route exact path="/" name="mainpage" component={({props}) => (<MainPage {...props}/>)}></Route>
        <Route path="/view" name="view" component={({props}) => (<ViewPage {...props}/>)}></Route>
        <Route exact path="/students" name="studentlist" component={({props}) => (<StudentListPage {...props}/>)}></Route>
        <Route path="/students/:student" name="student" component={({props, match}) => (<StudentPage edit={true} studentID={match.params.student} {...props}/>)}></Route>
        <Route path="/students/new" name="newstudent" component={({props}) => (<StudentPage edit={false} {...props}/>)}></Route>
        <Route exact path="/locations" name="locationlist" component={({props}) => (<LocationListPage {...props}/>)}></Route>
        <Route path="/locations/:location" name="location" component={({props}) => (<LocationPage {...props}/>)}></Route>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {user: state.user}
}

export default withRouter(connect(mapStateToProps)(MainSectionLayout));
