import React from "react";
import CategoryForm from "./CategoryForm";
import { connect } from "react-redux";
import { deleteCategory } from "../reducers/categories";
import store from "../store";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { deleteCategory } = this.props;
    store.dispatch(deleteCategory(e.target.value));
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        <div className="col-xs-3">
          <CategoryForm />
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3>Categories</h3>
            </div>
            <div className="panel-body">
              <ul className="list-group">
                {categories.map(category => (
                  <li className="list-group-item clearfix" key={category.id}>
                    <strong>{category.name}</strong>
                    <button
                      className="btn btn-warning pull-right"
                      value={category.id}
                      onClick={this.handleClick}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { categories: state.categories };
};

const mapDispatchToProps = dispatch => {
  return { deleteCategory };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
