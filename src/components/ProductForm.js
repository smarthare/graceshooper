import React from "react";
import { connect } from "react-redux";
import store from "../store";
import { updateProduct, addProduct } from "../reducers/reducer_products";
import _ from "lodash";
import { WithContext as ReactTags } from "react-tag-input";

const emptyProduct = {
  title: "",
  description: "",
  price: "",
  inventory: "",
  imageUrls: [],
  categories: []
};

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      tags: props.product.categories.map(category => {
        return { id: category.id, text: category.name };
      }),
      showSuccess: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTagDelete = this.handleTagDelete.bind(this);
    this.handleTagAddition = this.handleTagAddition.bind(this);
    this.handleTagDrag = this.handleTagDrag.bind(this);
  }

  handleChange(e) {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState({ product: { ...this.state.product, ...change } });
    this.setState({ showSuccess: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { product, tags } = this.state;
    const { updateProduct, addProduct } = this.props;
    //this calls add product/update product - doesn't need dispatch because of how we mapped to props
    this.props.isAddProduct
      ? addProduct(product, tags)
      : updateProduct(product, tags);

    //sets success so we display message
    this.setState({ showSuccess: true });

    //empties product out
    if (this.props.isAddProduct) {
      this.setState({ product: emptyProduct });
    }
  }

  handleTagDelete(i) {
    const { tags } = this.state;
    tags.splice(i, 1);
    this.setState({ tags });
  }

  handleTagAddition(tag) {
    const { tags } = this.state;
    const tagId = this.props.categories.find(category => category.name === tag)
      .id;
    this.setState({ tags: [...tags, { id: tagId, text: tag }] });
  }

  handleTagDrag(tag, currPos, newPos) {
    const { tags } = this.state;
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);
    this.setState({ tags });
  }

  //TODO deal with categories & images
  render() {
    const {
      handleSubmit,
      handleChange,
      handleAddUrl,
      handleTagAddition,
      handleTagDelete,
      handleTagDrag,
      state,
      props
    } = this;
    const { product, tags, showSuccess } = state;
    const { categories, isAddProduct } = props;
    return (
      <div className="col-sm-2">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>{isAddProduct ? "ADD A PRODUCT" : `EDIT PRODUCT`}</h4>
          </div>
          <div className="panel-body">
            <form onSubmit={handleSubmit} value={product.id}>
              {[
                { name: "title", type: "text" },
                { name: "description", type: "text" },
                { name: "imgUrls", type: "text" },
                { name: "price", type: "number" },
                { name: "inventory", type: "number" }
              ].map(attr => {
                const name = attr.name;
                return (
                  <div className="form-group" key={name}>
                    <label>{name.toUpperCase()}</label>
                    <input
                      type={attr.type}
                      className="form-control"
                      name={name}
                      value={product[name]}
                      onChange={handleChange}
                    />
                  </div>
                );
              })}
              <div className="form-group">
                <label>CATEGORIES:&nbsp;</label>
                <ReactTags
                  suggestions={categories.map(category => category.name)}
                  tags={tags}
                  handleDelete={handleTagDelete}
                  handleAddition={handleTagAddition}
                  handleDrag={handleTagDrag}
                />
              </div>
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
            {showSuccess && (
              <div>
                <strong>
                  {this.props.isAddProduct ? (
                    "Product Added!"
                  ) : (
                    "Product Updated!"
                  )}
                </strong>
              </div>
            )}
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

//map dipatch to props this way to not need dispatch in code

const mapDispatchToProps = { updateProduct, addProduct };

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
