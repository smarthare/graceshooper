import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import store from "../store";

function User(props) {
  //will need to make this dynamic
  const userId = 1;

  const user = props.users.find(u => {
    return u.id === userId;
  });

  //will need to pull this in from props
  // const orders = props.orders
  const orders = [];

  //loading state
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
  return { users: state.users, orders: state.orders };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
