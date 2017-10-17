import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import store, { fetchOrders, fetchCart } from "../store";
import { updateUser } from "../reducers/users";

// to do: figure out why refresh doesn't work
// success message

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.currentUser,
      orders: props.orders,
      showSuccess: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // This is the landing page of a user login/signup
    // Fetch user order/cart here
    store.dispatch(fetchOrders());
    store.dispatch(fetchCart());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser !== this.props.currentUser) {
      this.setState({
        user: nextProps.currentUser
      });
    }
    if (nextProps.orders !== this.props.orders) {
      this.setState({
        orders: nextProps.orders
      });
    }
  }

  handleChange(e) {
    const update = {};
    update[e.target.name] = e.target.value;
    this.setState({
      user: { ...this.state.user, ...update },
      showSuccess: false
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    store
      .dispatch(this.props.updateUser(this.state.user))
      .then(() => this.setState({ showSuccess: true }));
  }

  render() {
    const { orders } = this.props;
    const { user } = this.state;
    const { handleChange, handleSubmit } = this;
    console.log(Object.keys(user))
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
                  {
                    ['name', 'email', 'phone', 'Address', 'City', 'State', 'ZIP']
                    .map(attr => {
                      return (
                        <div className="form-group" key={attr}>
                        <label>{`${attr[0].toUpperCase()}${attr.slice(1)}`}</label>
                        <input
                          type="text"
                          className="form-control"
                          name={attr}
                          value={user[attr]}
                          onChange={handleChange}
                        />
                        </div>
                      )
                    })
                  }
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
                {this.state.showSuccess && (
                  <div>
                    <strong>Change successful!</strong>
                  </div>
                )}
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
    currentUser: state.currentUser,
    orders: state.orders
  };
};

const mapDispatchToProps = dispatch => {
  return { updateUser };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
