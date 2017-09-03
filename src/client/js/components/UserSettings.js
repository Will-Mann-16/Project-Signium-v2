import React from "react"
import {connect} from "react-redux"
import {logoutUser} from "../actions/usersActions"

class UserSettings extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: props.user.user.data
    }
  }
  handleChange(event){
    var name = event.target.name;
    var value = event.target.value;
    this.setState({...this.state, user:{...this.state.user, [name]: value}});
  }
  handleHouseChange(event){
    const value = event.target.value;
    this.setState({...this.state, user: {_house: value}});
  }
  disableRole(role){
    if(role >= this.props.user.user.data.role){
      return true;
    }
    return false;
  }
  logout(){
    this.props.dispatch(logoutUser());
  }
  render(){
    var houseHTML = this.props.houses.houses.map((house, key) => {
      return (<option key={key} value={house._id} selected={house._id === this.props.user.user.data._house}>{house.name}</option>);
    });
    return(
      <div>
        <input class="form-input" name="firstname" placeholder="Firstname" onChange={this.handleChange.bind(this)} value={this.state.user.firstname}/>
        <input class="form-input" name="surname" placeholder="Surname" onChange={this.handleChange.bind(this)} value={this.state.user.surname}/>
        <input class="form-input" name="username" placeholder="Username" onChange={this.handleChange.bind(this)} value={this.state.user.username}/>
        <select required class="form-input" name="house" onChange={this.handleHouseChange.bind(this)} disabled={this.disableRole(1)}>
          {houseHTML}
        </select>
        <button class="btn-red" onClick={this.logout.bind(this)}>Logout</button>
      </div>
    )
  }
}
function mapStateToProps(state){
  return{
    user: state.user,
    houses: state.houses
  }
}
export default connect(mapStateToProps)(UserSettings)
