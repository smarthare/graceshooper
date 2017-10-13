import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addProductsToCart } from '../store';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { selectQty: 1 };

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
    const { selectedProduct } = this.props.myProps;
    this.addProductsToCart(selectedProduct.id, this.state.selectQty)
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

  render() {
    /*********************************************/
    // setup local variables from props
    console.log('>>>>>>>>>>>>>>>>>>>>>>', this.props)
    const { categoryId, categories, selectedProduct } = this.props;
    /*********************************************/
    let renderProducts, renderProducts2, price;
    if (selectedProduct.title) {
      /*************************************/
      // accounting for varied image inputs & price formatting:
      /*************************************/
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
    // Create Qty options in "add to Cart" section:
    const qtyLimiter = (selectedProduct.inventory < 16) ? selectedProduct.inventory : 15;
    const countArr = []; 
    for (let i = 1; i <= qtyLimiter; i++) {
      countArr.push(i);
    }
    const renderOptions = countArr.map(count => {
      return <option key={ count } value={ count }>{ count }</option>;
    })
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
            <div className="col-sm-12 center marginbelow">
              <strong>{ selectedProduct.title }</strong>
            </div>
            <div className="col-sm-12 marginbelow">
              { selectedProduct.description } - ( Product #: { selectedProduct.id } )
            </div>
            <div className="col-sm-9 marginbelow">
              { renderProducts2 }
              { renderProducts }
            </div>
            <form onSubmit={ this.handleSubmit }>
              <div className="col-sm-3 marginbelow margintop panel panel-default backGreyBlue">
                <div className="col-sm-12 panel-body colWidth100">
                <div className="col-sm-12 marginbelow center"><strong>Stock Qty: </strong>{ selectedProduct.inventory }</div>
                <div className="col-sm-12 marginbelow center"><strong>Unit Price: </strong>{ price }</div>
                <div className="col-sm-12 marginbelow center"><strong>Qty to Order: </strong>
                  <select
                    name="selectQty"
                    value={ this.state.selectQty }
                    onChange={ this.handleInput }>
                   { renderOptions }
                  </select>
                </div>
                  <button id="content" className="btn btn-primary marginbelow margintop" >
                    <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
                    &ensp;Add to Cart
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { state };
}

function mapDispatchToProps (dispatch) {
return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
