import React from "react"
import { connect } from "react-redux"

import UserSettings from "./UserSettings"

export default class SettingsPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      activePage: 0
    }
  }

  changeActivePage(pageID){
    this.setState({activePage: pageID});
  }

  renderCurrentPage(){
    switch(this.state.activePage){
      case 0:
        return(
          <div class="col-10">
            <UserSettings refreshContent={this.props.refreshContent}/>
          </div>
        )
    }
  }

  render(){
    return(
      <div class="container row">
        <div class="col-2">
          <ul class="list">
            <li><a onClick={this.changeActivePage.bind(this, 0)} class={this.state.activePage == 0 ? "active" : null}>User Settings</a></li>
          </ul>
        </div>
        {this.renderCurrentPage()}
        </div>
    );
  }
}
