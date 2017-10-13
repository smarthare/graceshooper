import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProductDetail from './ProductDetail';
import { addProductsToCart } from '../store';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: '/',
      categoryId: 0,
      selectedProduct: {},
      term: '',
      filter: false,
      selectQty: 1
    }

    this.productWork = this.productWork.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  productWork(imgBefore, priceBefore) {
    // can send only one argument or both for a result
    // accounting for varied image inputs:
    let imgAfter = 'none given';
    if (imgBefore) {
      if (imgBefore.slice(0, 7) === 'http://') {
        imgAfter = imgBefore;
      } else {
        imgAfter = `../../assets/images/${ imgBefore }`;
      }
    }
    // possible price formating:
    const priceAfter = (priceBefore) ? '$' + priceBefore.toString() : 'none given';
    return [imgAfter, priceAfter];
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addProductsToCart(this.state.selectedProduct.id, this.state.selectQty)
  }

  handleInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case 'selectQty':
        this.setState({ selectQty: value })
        break;
    }
  }

  componentWillReceiveProps(nextProps) {
    /*********************************************/
    // get nextProps variables
    const pathnameLast = this.state.pathname;
    const pathname = nextProps.router.location.pathname;
    const categoryId = (nextProps.router.match.params.id) ? nextProps.router.match.params.id * 1 : 0;
    const term = (nextProps.router.match.params.term) ? nextProps.router.match.params.term : '';
    const products = nextProps.products;
    /*********************************************/
    // checking to see if someone clicked a link and changed the url
    /*********************************************/
    // did someone click a specific product? ...yes?: get that instance:
    const productId = (nextProps.router.location.search) ? nextProps.router.location.search.slice(9) * 1 : 0;
    let selectedProduct = {};
    if (productId) {
      const selectedProductArr = products.filter(product => {
        return productId === product.id;
      })
      selectedProduct = selectedProductArr[0];
    }
    /*********************************************/
    // update state......
    if (pathname !== pathnameLast) this.setState({ pathname, categoryId, term, selectedProduct, filter: true });
    /*********************************************/
  }

  render() {
    /*********************************************/
    // setup local variables
    let products = this.props.products;
    const categories = this.props.categories;
    const filter = this.state.filter;
    const categoryId = this.state.categoryId;
    const selectedProduct = this.state.selectedProduct;
    const term = this.state.term;
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
        let searchUpper = term.slice(0, 1).toUpperCase() + term.slice(1).toLowerCase();
        let searchLower = term.toLowerCase();
        let title = selectedProduct.title;
        return title.includes(searchLower) || title.includes(searchUpper);
      })
    }
    /*********************************************/
    // create the Products List &/or the Selected Product- Main Section
    /*********************************************/
    // if there is a selected Product, then render for the one product
    let renderProducts, renderProducts2, renderswitch, price;
    if (selectedProduct.title) {
      /*************************************/
      //single product work here
      /*************************************/
      // accounting for varied image inputs & price formatting:
      /*************************************/
      renderswitch = false;
      const images = selectedProduct.imgUrls.map(image => {
        return this.productWork(image)[0];
      })
      price = this.productWork(null, selectedProduct.price)[1];
      /*************************************/
      //create <div></div> for the multiple extra images
      const imagesExtra = images.slice(1);
      if (imagesExtra.length) {
        renderProducts = (
          <div className="col-sm-3 panel panel-default marginbelowsm">
            {
              imagesExtra.map(img => {
                return (<div className="col-sm-12" key={ img }>
                  <img src={ img } className="responsive-image" />
                  </div>)
              })
            }
          </div>)
      } else {
        renderProducts = <div className="col-sm-1 border panel panel-default"></div>
      }
      /*************************************/
      //create <div></div> for the main image
      const imagesMain = images.slice(0, 1);
      renderProducts2 = <div className="col-sm-9"><img src={ imagesMain } className="responsive-image" /></div>;
    /*************************************/
    } else {
      // looking for products in a category &/or containing a search term
      renderswitch = true;
      renderProducts = products.map(product => {
        if (product.inventory) {
          /*************************************/
          // accounting for varied image inputs & price formatting:
          /*************************************/
          const formatResult = this.productWork(product.imgUrls[0], product.price);
          const image = formatResult[0];
          price = formatResult[1];
          /*************************************/
          return (<Link to={ `/category/${ categoryId }/?product=${ product.id }` } key={ product.id }>
              <div className="col-sm-6 panel panel-default">
                <div className="col-sm-6">
                  <img src={ image } className="responsive-image" />
                </div>
                <div className="col-sm-6">
                  <h6>{ product.title }</h6>     
                  <h6><strong>Quantity Available:</strong> { product.inventory }</h6>
                  <h6><strong>Price: </strong>{ price }</h6>
                </div>
              </div>
            </Link>)
        }
      })
      if (!renderProducts.length) renderProducts = <div className="center"><strong> - no products found - </strong></div>;
    }
    /*********************************************/
    // Label Products section:
    let categoryName;
      categoryName = (selectedProduct.title) ? 'Single Product Selected - ' : '';
    if (categoryId) {
      const resultArr = categories.filter(category => {
        return category.id === categoryId;
      })
      categoryName = categoryName + resultArr[0].name;
    } else {
      categoryName = categoryName + 'all Categories';
    }
    /*********************************************/
    if (renderswitch) {
      return (
        <div>
          <div className="row">
            <div className="col-sm-12 marginbelow">
              <h6>Select a category (below) or enter search term (above)</h6>
            </div>
            <div className="col-sm-2 panel panel-default">
              <div className="col-sm-12 marginbelow panel-body colWidth100 backGreyBlue">
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
              <div className="col-sm-12 marginbelow panel-body colWidth100 backGreyBlue">
                <h6 className="center">PRODUCTS - ( { categoryName } )</h6>
              </div>
              <div className="col-sm-12 marginbelow">
                { renderProducts }
              </div>
            </div>
  
          </div>
        </div>
      )
    } else {
      return <ProductDetail categoryId={ categoryId } categories={ categories } selectedProduct={ selectedProduct } />
    }
  }
}

function mapStateToProps (state) {
  return state;
}

export default connect(mapStateToProps)(Home);
