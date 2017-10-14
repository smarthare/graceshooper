import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import store, { fetchUsers, fetchOrders, fetchCart } from "../store";
import { updateUser } from "../reducers/users";

// to do: figure out why refresh doesn't work
// success message

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //NOT SURE WE NEED THESE?
    store.dispatch(fetchUsers());
    store.dispatch(fetchOrders());
    store.dispatch(fetchCart());
  }

  handleChange(e) {
    const update = {};
    update[e.target.name] = e.target.value;
    this.setState({ user: Object.assign({}, this.state.user, update) });
  }

  handleSubmit(e) {
    e.preventDefault();
    store.dispatch(this.props.updateUser(this.state.user));
  }

  render() {
    const { cart, orders, currentUser, users } = this.props;
    const { user } = this.state;
    console.log("user", user);
    // const user = currentUser;
    const { handleChange, handleSubmit } = this;

    // loading state
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
                <form onSubmit={handleSubmit} value={user.id}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="shipAddress"
                      value={user.shipAddress}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="shipCity"
                      value={user.shipCity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      className="form-control"
                      name="shipState"
                      value={user.shipState}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Zip</label>
                    <input
                      type="text"
                      className="form-control"
                      name="shipZip"
                      value={user.shipZip}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      value={user.id}
                    >
                      Update
                    </button>
                  </div>
                </form>
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
                  {orders.map(order => JSON.stringify(order))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    orders: state.orders,
    currentUser: state.currentUser,
    user: state.users[1]
  };
};

const mapDispatchToProps = dispatch => {
  return { updateUser };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
