import React from "react";
import { connect } from "react-redux";
import store from "../store";

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("my props", this.props);
    const { product } = this.props;
    return (
      <div className="col-xs-2">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>{product.title}</h4>
          </div>
          <div className="panel-body">{product.description}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
