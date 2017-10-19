import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductDetail from './ProductDetail';
import ProductList from './ProductList';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: '/',
      categoryId: 0,
      selectedProduct: {},
      term: '',
      filter: false
    };

    this.productWork = this.productWork.bind(this);
    this.reviewWork = this.reviewWork.bind(this);
  }

  productWork (imgBefore, priceBefore) {
    // can send only one argument or both for a result
    // accounting for varied image inputs:
    let imgAfter = 'none given';
    if (imgBefore) {
      if (imgBefore.slice(0, 7) === 'http://') {
        imgAfter = imgBefore;
      } else {
        imgAfter = `../../assets/images/${imgBefore}`;
      }
    }
    // possible price formating:
    const priceAfter = (priceBefore) ? '$' + priceBefore.toString() : 'none given';
    return [imgAfter, priceAfter];
  }

  reviewWork (id) {
    // create a star rating output
    let reviewNum, reviewAvg;
    const reviewsArr = this.props.reviews.filter(review => review.productId === id);
    if (reviewsArr.length) {
      reviewNum = reviewsArr.length;
      reviewAvg = reviewsArr.reduce((sum, elem) => {
        return sum + elem.rating;
      }, 0) / reviewNum;
    } else {
      reviewNum = 0;
      reviewAvg = 0;
    }
    const fileLoc1 = Math.floor(reviewAvg);
    const fileLoc2 = (reviewAvg - fileLoc1) ? 1 : 0;
    const imgBefore = `stars${ fileLoc1 }${ fileLoc2 }.png`;
    const renderImg = `../../assets/images/${imgBefore}`;

    return [reviewNum, reviewAvg, renderImg, reviewsArr];
  }

  componentDidMount () {
    if (!this.props.users.length) return;
    const categoryId = (this.props.router.match.params.id) ? this.props.router.match.params.id * 1 : 0;
    const term = (this.props.router.match.params.term) ? this.props.router.match.params.term : '';
    const products = this.props.products;
    /*********************************************/
    // checking to see if someone clicked a link and changed the url
    /*********************************************/
    // did someone click a specific product? ...yes?: get that instance:
    const productId = (this.props.router.location.search) ? this.props.router.location.search.slice(9) * 1 : 0;
    let selectedProduct = {};
    if (productId) {
      if (!products.length) return;
      const selectedProductArr = products.filter(product => {
        return productId === product.id;
      })
      selectedProduct = selectedProductArr[0];
      /*********************************************/
      // update state......
      this.setState({ categoryId, term, selectedProduct, filter: true });
    }
  }

  componentWillReceiveProps (nextProps) {
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
      if (!products.length) return;
      const selectedProductArr = products.filter(product => {
        return productId === product.id;
      })
      selectedProduct = selectedProductArr[0];
    }
    /*********************************************/
    // update state......
    if (pathname !== pathnameLast) this.setState({ pathname, categoryId, term, selectedProduct, filter: true });
  }

  render() {
    const categories = this.props.categories;
    const { filter, categoryId, selectedProduct, term } = this.state;
    let renderSwitch;
    if (selectedProduct.title) {
      // single product work here
      renderSwitch = false;
    } else {
      renderSwitch = true;
    }
    if (renderSwitch) {
      return (<ProductList
        categoryId={categoryId}
        categories={categories}
        filter={filter} term={term}
        productWork={ this.productWork }
        reviewWork={ this.reviewWork }
      />);
    } else {
      return  (<ProductDetail
        categoryId={categoryId}
        categories={categories}
        selectedProduct={selectedProduct}
        productWork={ this.productWork }
        reviewWork={ this.reviewWork }
      />);
    }
  }
}

function mapState(state) {
  return state;
}

export default connect(mapState)(Home);
