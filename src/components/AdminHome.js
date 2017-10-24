import React from "react";
import { connect } from "react-redux";
import store, {
  fetchCategories,
  fetchUsers,
  fetchProducts,
  fetchReviews
} from "../store";

class AdminHome extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    store.dispatch(fetchCategories());
    store.dispatch(fetchProducts());
    store.dispatch(fetchUsers());
    store.dispatch(fetchReviews());
  }

  render() {
    const { categories, products, users, reviews } = this.props;
    return (
      <div>
        <div className="well">
          <h1>Admin Home</h1>
          <ul>
            <li>{categories.length} Categories</li>
            <li>{products.length} Products</li>
            <li>{users.length} Users</li>
            <li>{reviews.length} Reviews</li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("my state", state);
  return {
    categories: state.categories || [],
    products: state.products || [],
    users: state.users || [],
    reviews: state.reviews || []
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
