import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductToCart } from '../store';

class ProductDetail extends Component {
  constructor (props) {
    super(props);
    this.state = { selectQty: 1, msg: '' };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reviewsList = this.reviewsList.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    const { selectedProduct, addToCart } = this.props;
    addToCart(selectedProduct.id, this.state.selectQty);
    this.setState({ msg: 'Product has been added to the cart' })
  }

  handleInput (event) {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case 'selectQty':
        this.setState({ selectQty: value });
        break;
    }
  }

  reviewsList (reviewsArr) {
    return reviewsArr.map(review => {
      const reviewer = this.props.users.filter(user => user.id === review.userId)[0].name;
      const date = review.updatedAt.slice(0, 10);
      return (<div key={ review.id }>
          <div className="col-sm-12"><strong>Date Updated: </strong> { date }</div>
          <div className="col-sm-12"><strong>Reviewer: </strong> { reviewer }</div>
          <div className="col-sm-12"><strong>Rating: </strong>{ review.rating }</div>
          <div className="col-sm-12 marginB"><strong>Title: </strong>{ review.title }</div>
          <div className="col-sm-12 marginB"><strong>Review: </strong>{ review.body }</div>
          <div className="col-sm-12"><hr /></div>
        </div>
      )
    })
  }

  render () {
    /*********************************************/
    // setup local variables from props
    const { categoryId, categories, selectedProduct } = this.props;
    /*********************************************/
    let renderProducts, renderProducts2, price, renderReviews, reviewNum, reviewAvg, renderImg, reviewsArr, renderAllRevs;
    if (selectedProduct.title) {
      /*************************************/
      // accounting for varied image inputs & price formatting:
      /*************************************/
      const [imagesMain, ...imagesExtra] = selectedProduct.imgUrls.map(image => this.props.productWork(image)[0]);
      price = this.props.productWork(null, selectedProduct.price)[1];
      /*************************************/
      // create render for the multiple extra images
      if (imagesExtra.length) {
        renderProducts = (
          <div className="col-sm-3 panel panel-default marginBSM">
            {
              imagesExtra.map(img => {
                return (<div className="col-sm-12 marginBSM" key={img}>
                  <img src={img} className="responsive-image" />
                </div>)
              })
            }
          </div>);
      } else {
        renderProducts = <div className="col-sm-1 border panel panel-default" />;
      }
      /*************************************/
      // create a star rating output
      [reviewNum, reviewAvg, renderImg, reviewsArr] = this.props.reviewWork(selectedProduct.id);
      renderReviews = (<div>
          <img src={ renderImg } className="responsive-image2" />
          <h6 className="center">( { reviewNum } reviews ) </h6>
        </div>);
      /*************************************/
      // create a star reviews Listing of all reviews
      renderAllRevs = this.reviewsList(reviewsArr);
      /*************************************/
      // create render for the main image
      renderProducts2 = <div className="col-sm-9"><img src={imagesMain} className="responsive-image" /></div>;
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
      return <option key={count} value={count}>{ count }</option>;
    })
    /*********************************************/
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 marginB">
            <h6>Select a category (below) or enter search term (above)</h6>
          </div>
          <div className="col-sm-2 panel panel-default">
            <div className="col-sm-12 marginB panel-body backGreyBlue">
              <h6 className="center">CATEGORIES</h6>
            </div>
            <div className="col-sm-12 marginB">
              {
                categories.map(category => {
                  return (<Link to={`/category/${category.id}`} key={category.id}><div
                    className="col-sm-12">
                    <h6>{ category.name }</h6></div></Link>)
                })
              }
            </div>
          </div>
          <div className="col-sm-10 panel panel-default">
            <div className="col-sm-12 marginB panel-body backGreyBlue">
              <h6 className="center">PRODUCTS - ( { categoryName } )</h6>
            </div>
            <div className="col-sm-12 center marginB">
              <strong>{ selectedProduct.title }</strong>
            </div>
            <div className="col-sm-12 marginB">
              { selectedProduct.description } - ( Product #: { selectedProduct.id } )
            </div>
            <div className="col-sm-9 marginB">
              { renderProducts2 }
              { renderProducts }
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="col-sm-3 marginB marginT panel panel-default backGreyBlue">
                <div className="col-sm-12 panel-body">
                  <div className="col-sm-12 center"><strong>Stock Qty: </strong></div>
                  <div className="col-sm-12 marginB center">{ selectedProduct.inventory }</div>
                  <div className="col-sm-12 center"><strong>Unit Price: </strong></div>
                  <div className="col-sm-12 marginB center">{ price }</div>
                  <div className="col-sm-12 marginB center"><a href="#reviews">{ renderReviews }</a></div>
                  <div className="col-sm-12 marginB center"><strong>Qty to Order: </strong>
                    <select
                      name="selectQty"
                      value={this.state.selectQty}
                      onChange={this.handleInput}>
                      { renderOptions }
                    </select>
                  </div>
                  <button id="content" className="btn btn-primary marginB marginT" >
                    <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true" />
                    &ensp;Add to Cart
                  </button>
                  <div className="marginB marginT center textBlue">{ this.state.msg }</div>
                </div>
              </div>
            </form>
            <div id="reviews" className="col-sm-12 marginB">
              <div className="col-sm-12">
                <hr />
              </div>
              <div className="col-sm-3">
                <h5>Reviews Summary:</h5>
              </div>
              <div className="col-sm-9">
                <h5>Overall:</h5> { reviewAvg } out of 5 stars
              </div>
              <div className="col-sm-12">
                <hr />
              </div>
              <div className="col-sm-12">
                { renderAllRevs }
              </div>
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

const mapDispatchToProps = ({ addToCart: addProductToCart })

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
