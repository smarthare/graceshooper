import React from "react";
import { connect } from "react-redux";
import { createCategory } from "../reducers/categories";
import store from "../store";

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    store.dispatch(this.props.createCategory(e.target.name.value));
    e.target.name.value = "";
  }

  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3>Add Category</h3>
          </div>
          <div className="panel-body">
            <div>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" />
                <button className="btn btn-primary pull-right clearfix">
                  Add
                </button>
              </form>
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
  return { createCategory };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
