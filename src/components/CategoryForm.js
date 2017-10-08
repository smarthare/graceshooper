import React from "react";
import { connect } from "react-redux";
import store from "../store";

function CategoryForm(props) {
  return (
    <div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>Add Category</h3>
        </div>
        <div className="panel-body">
          <div>
            <form>
              <input />
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

const mapStateToProps = state => {
  return { categories: state.categories };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
