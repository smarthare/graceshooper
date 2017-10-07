import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import store from "../store";

function User(props) {
  const { users } = props;
  const user = users[0];
  console.log(user);
  if (!user) return <h1>Loading...</h1>;
  return (
    <div>
      <h1>User Information</h1>
      <div className="row">
        <div className="col-xs-4">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h2>Account Info</h2>
            </div>
            <div className="panel-body">
              <img src={user.imgUrl} />
              <ul className="list-group">
                <li className="list-group-item">Name: {user.name}</li>
                <li className="list-group-item">Email: {user.email}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xs-7">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h2>Order History</h2>
            </div>
            <div className="panel-body">
              <ul className="list-group">
                <li className="list-group-item">Order 1</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return { users: state.users };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
