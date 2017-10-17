import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductToCart } from '../store';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { productId: 0, msg: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    const { addToCart } = this.props;
    const productId = event.target.name * 1;
    addToCart(productId, 1);
    this.setState({ productId, msg: 'added' });
  }

  render() {
    if (!this.props.categories.length) return <div />;
    const { categories, categoryId, term, filter } = this.props;
    let products = this.props.products;
    /*********************************************/
    // filter the Products List? - Main Section
    // are we filtering by category?
    if (filter && categoryId) {
       products = products.filter(product => {
        let acceptProd = false;
        product.categories.forEach(category => {
          if (categoryId === category.id) acceptProd = true;
        })
        return acceptProd;
      })
    }
    // now check if we are filtering by search term.
    if (filter && term && products.length) {
      products = products.filter(product => {
        const regex = new RegExp(term, 'i');
        return regex.test(product.title);
      })
    }
    /*********************************************/
    // create the Products List &/or the Selected Product- Main Section
    /*********************************************/
    // if there is a selected Product, then render for the one product
    let renderProducts, price, renderReviews, reviewNum, reviewAvg, renderImg;
    // looking for products in a category &/or containing a search term
    renderProducts = products.map(product => {
      if (product.inventory) {
        /*************************************/
        // accounting for varied image inputs & price formatting:
        /*************************************/
        const formatResult = this.props.productWork(product.imgUrls[0], product.price);
        const image = formatResult[0];
        price = formatResult[1];
        /*************************************/
        // create a star rating output
        [reviewNum, reviewAvg, renderImg] = this.props.reviewWork(product.id);
        renderReviews = (<div className="col-sm-6">
            <img src={ renderImg } className="responsive-image2 moverightsm" />
            <h6 className="tabtoright">( { reviewNum } reviews ) </h6>
          </div>);
        /*************************************/
        return (
            <div className="col-sm-6 panel panel-default panelHeight" key={ product.id }>
              <Link to={ `/category/${ categoryId }/?product=${ product.id }` } key={ product.id }>
                <div className="col-sm-6 marginBelowLg margintopsm">
                  <img src={ image } className="responsive-image" />
                </div>
                <div className="col-sm-6 margintopsm">
                  <h6>{ product.title }</h6>
                  <h6><strong>Quantity Available:</strong> { product.inventory }</h6>
                  <h6><strong>Price: </strong>{ price }</h6>
                </div>
                { renderReviews }
              </Link>
              <div className="col-sm-6">
                <h6><form name={ product.id } onSubmit={this.handleSubmit}>
                  <div className="col-sm-12 moverightsm colWidth100">
                    <button className="btn btn-primary">
                      <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true" />
                      &ensp;Add
                    </button>
                    <div className="margintopsm moverightsm textBlue">{ (this.state.productId === product.id) ? this.state.msg : null }</div>
                  </div>
                </form></h6>
              </div>
            </div>)
      }
    })
    if (!renderProducts.length) renderProducts = <div className="center"><strong> - no products found - </strong></div>;
    /*********************************************/
    // Label Products section:
    let categoryName;
    if (categoryId) {
      const resultArr = categories.filter(category => {
        return category.id === categoryId;
      })
      categoryName = resultArr[0].name;
    } else {
      categoryName = 'all Categories';
    }
    /*********************************************/
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 marginbelow">
            <h6>Select a category (below) or enter search term (above)</h6>
          </div>
          <div className="col-sm-2 panel panel-default">
            <div className="col-sm-12 marginbelow panel-body backGreyBlue">
              <h6 className="center">CATEGORIES</h6>
            </div>
            <div className="col-sm-12 marginbelow">
              {
                categories.map(category => {
                  return (<Link to={ `/category/${ category.id }` } key={ category.id }><div
                    className="col-sm-12">
                    <h6>{ category.name }</h6></div></Link>)
                })
              }
            </div>
          </div>
          <div className="col-sm-10 panel panel-default">
            <div className="col-sm-12 marginbelow panel-body backGreyBlue">
              <h6 className="center">PRODUCTS - ( { categoryName } )</h6>
            </div>
            <div className="col-sm-12 marginbelow">
              { renderProducts }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state;
}

const mapDispatchToProps = { addToCart: addProductToCart };

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
