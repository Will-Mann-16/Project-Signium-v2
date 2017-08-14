import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class StudentListPage extends React.Component{
  render(){
    const studentHTML = this.props.students.students.map((student, key) => {
      var locationStyle = {
        color: 'white',
        backgroundColor: student.location.colour
      }
      var date = new Date(student.timelastout);
      var timeString = date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
      var link = "/students/" + student.code;
      return(<tr key={key}>
        <td>{student.firstname}</td>
        <td>{student.surname}</td>
        <td>{student.code}</td>
        <td style={locationStyle}>{student.location.name}</td>
        <td>{timeString}</td>
        <td><Link to={link} style={{textDecoration: "none", color: "black"}}>Edit</Link></td>
      </tr>);
    });
    return(
      <div class="container">
        <table class="table">
          <tbody>
          <tr>
            <th>
              Firstname
            </th>
            <th>
              Surname
            </th>
            <th>
              Code
            </th>
            <th>
              Location
            </th>
            <th>
              Last Signed Out
            </th>
            <th>
              Edit
            </th>
          </tr>
          {studentHTML}
        </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    students: state.students
  }
}

export default connect(mapStateToProps)(StudentListPage)
