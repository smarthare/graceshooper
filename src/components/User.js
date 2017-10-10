import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import store from "../store";

//to do: make user editable
//to do: add address

//use currentUser to grab id

function User(props) {
  //will need to make this dynamic
  const userId = 1;

  const user = props.users.find(u => {
    return u.id === userId;
  });

  console.log(user);

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
                <li className="list-group-item">Phone: {user.phone}</li>
                <li className="list-group-item">Address: {user.shipAddress}</li>
                <li className="list-group-item">City: {user.shipCity}</li>
                <li className="list-group-item">State: {user.shipState}</li>
                <li className="list-group-item">Zip: {user.shipZip}</li>
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
  return {
    users: state.users,
    orders: state.orders,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
