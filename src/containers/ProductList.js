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
        renderReviews = (<div>
            <img src={ renderImg } className="responsive-image2" />
            <h5 className="marginB">( { reviewNum } reviews ) </h5>
          </div>);
        /*************************************/
        return (
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 panel panel-default panelHeight" key={ product.id }>
              <Link to={ `/category/${ categoryId }/?product=${ product.id }` } key={ product.id }>
                <div className="col-xs-4 col-sm-5 col-md-5 marginBLG marginTSM">
                  <img src={ image } className="responsive-image" />
                </div>
              </Link>
                <div className="col-xs-7 col-sm-7 col-md-7 marginTSM">
                  <Link to={ `/category/${ categoryId }/?product=${ product.id }` } key={ product.id }>
                    <h5>{ product.title }</h5>
                    <h5><strong>Qty Available:</strong></h5>
                    <h5>{ product.inventory }</h5>
                    <h5><strong>Price: </strong>{ price }</h5>
                    { renderReviews }
                    </Link>
                    <h5><form name={ product.id } onSubmit={this.handleSubmit}>
                    <div className="">
                      <button className="btn btn-primary">
                        <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true" />
                        &ensp;Add
                      </button>
                      <div className="marginTSM textBlue">{ (this.state.productId === product.id) ? this.state.msg : null }</div>
                    </div>
                  </form></h5>
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
      categoryName = resultArr[0].name.toUpperCase();
    } else {
      categoryName = 'ALL CATEGORIES';
    }
    /*********************************************/
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 marginB textAll">
            <h5>Select a category (below) or enter search term (above)</h5>
          </div>
          <div className="col-xs-12 col-sm-2 col-md-2 noPadLR panel panel-default">
            <div className="col-xs-12 col-sm-12 col-md-12 marginB panel-heading backBlack noPadLR padTBSMM">
              <h5 className="center">CATEGORIES</h5>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 marginB">
              {
                categories.map(category => {
                  return (<Link to={ `/category/${ category.id }` } key={ category.id }><div
                    className="col-xs-12 col-sm-12 col-md-12">
                    <h5>{ category.name }</h5></div></Link>)
                })
              }
            </div>
          </div>
          <div className="col-xs-12 col-sm-10 col-md-10 panel panel-default noPadLR">
            <div className="col-xs-12 col-sm-12 col-md-12 marginB panel-heading backBlack noPadLR padTBSMM">
              <h5 className="center">PRODUCTS - ( { categoryName } )</h5>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 marginB">
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
