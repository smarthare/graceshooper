import React from "react";
import CategoryForm from "./CategoryForm";
import { connect } from "react-redux";
import store from "../store";

function Categories(props) {
  const { categories } = props;
  return (
    <div>
      <div className="col-xs-4">
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
                  <button className="btn btn-warning pull-right">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return { categories: state.categories };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
