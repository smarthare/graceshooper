import React from "react";
import { connect } from "react-redux";
import store from "../store";
import { updateProduct, addProduct } from "../reducers/reducer_products";
import _ from "lodash";

const emptyProduct = {
  title: "",
  description: "",
  price: "",
  inventory: "",
  imageUrls: [],
  categories: {}
};

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log("this is firing", this.state);
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState({ product: Object.assign({}, this.state.product, change) });
  }

  handleSubmit(e) {
    e.preventDefault();
    const product = this.state.product;
    const { updateProduct, addProduct } = this.props;
    const thunk = this.props.isAddProduct
      ? addProduct(product)
      : updateProduct(product);
    store.dispatch(thunk);
    if (this.props.isAddProduct) {
      this.setState({ product: emptyProduct });
    }
  }

  render() {
    const { product } = this.state;
    const { categories, isAddProduct } = this.props;
    const { handleSubmit, handleChange, handleAddUrl } = this;
    return (
      <div className="col-sm-2">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>{isAddProduct ? "Add a Product" : `Edit ${product.title}`}</h4>
          </div>
          <div className="panel-body">
            <form onSubmit={handleSubmit} value={product.id}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Inventory</label>
                <input
                  type="number"
                  className="form-control"
                  name="inventory"
                  value={product.inventory}
                  onChange={handleChange}
                />
              </div>
              {/*<div className="form-group">
                <label>Category:&nbsp;</label>
                <select name="categiries" onChange={handleChange} value={""}>
                  <option value="">(select a category)</option>
                  {categories.map(category => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>*/}
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  value={product.id}
                >
                  Save
                </button>
              </div>
              {/*<div className="form-group">
                <label>Add Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="imgURL"
                  value=""
                  onChange={handleAddUrl}
                />
              </div>*/}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories,
    product: ownProps.product || emptyProduct
  };
};

const mapDispatchToProps = dispatch => {
  return { updateProduct, addProduct };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
