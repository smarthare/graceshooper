import React from "react";
import { connect } from "react-redux";
import store from "../store";

class Users extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { users } = this.props;
    return (
      <div className="col-xs-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3>Users</h3>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              {users.map(user => (
                <li className="list-group-item clearfix" key={user.id}>
                  <strong>{user.name}</strong>
                  <br />
                  <div className="btn-group">
                    <button className="btn btn-warning btn-sm" value={user.id}>
                      Delete
                    </button>
                    <button className="btn btn-primary btn-sm" value={user.id}>
                      Make Admin
                    </button>
                    <button className="btn btn-default btn-sm" value={user.id}>
                      Reset PW
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
