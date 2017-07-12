import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"

import MainSectionLayout from './MainSectionLayout';

import MainPage from './MainPage';
import LoginPage from './LoginPage';
import ViewPage from './ViewPage';
import StudentListPage from "./StudentListPage";
import StudentPage from './StudentPage';
import LocationListPage from "./LocationListPage";
import LocationPage from './LocationPage';


export default class App extends React.Component{
  render(){
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" component={MainSectionLayout}></Route>
            <Route exact path="/" name="mainpage" component={MainPage}></Route>
            <Route path="login" name="login" componenet={LoginPage}></Route>
            <Route path="view" name="view" component={ViewPage}></Route>
            <Route exact path="students" name="studentlist" component={StudentListPage}></Route>
            <Route path="students/:student" name="student" component={StudentPage}></Route>
            <Route exact path="locations" name="locationlist" component={LocationListPage}></Route>
            <Route path="locations/:location" name="location" component={LocationPage}></Route>
        </Switch>
        </BrowserRouter>
  );
  }
}
