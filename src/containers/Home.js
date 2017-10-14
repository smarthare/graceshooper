import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ProductDetail from './ProductDetail'
import ProductList from './ProductList'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pathname: '/',
      categoryId: 0,
      selectedProduct: {},
      term: '',
      filter: false
    }

    this.productWork = this.productWork.bind(this)
  }

  productWork (imgBefore, priceBefore) {
    // can send only one argument or both for a result
    // accounting for varied image inputs:
    let imgAfter = 'none given'
    if (imgBefore) {
      if (imgBefore.slice(0, 7) === 'http://') {
        imgAfter = imgBefore
      } else {
        imgAfter = `../../assets/images/${imgBefore}`
      }
    }
    // possible price formating:
    const priceAfter = (priceBefore) ? '$' + priceBefore.toString() : 'none given'
    return [imgAfter, priceAfter]
  }

  componentWillReceiveProps (nextProps) {
    /*********************************************/
    // get nextProps variables
    const pathnameLast = this.state.pathname
    const pathname = nextProps.router.location.pathname
    const categoryId = (nextProps.router.match.params.id) ? nextProps.router.match.params.id * 1 : 0
    const term = (nextProps.router.match.params.term) ? nextProps.router.match.params.term : ''
    const products = nextProps.products
    /*********************************************/
    // checking to see if someone clicked a link and changed the url
    /*********************************************/
    // did someone click a specific product? ...yes?: get that instance:
    const productId = (nextProps.router.location.search) ? nextProps.router.location.search.slice(9) * 1 : 0
    let selectedProduct = {}
    if (productId) {
      const selectedProductArr = products.filter(product => {
        return productId === product.id
      })
      selectedProduct = selectedProductArr[0]
    }
    /*********************************************/
    // update state......
    if (pathname !== pathnameLast) this.setState({ pathname, categoryId, term, selectedProduct, filter: true })
    /*********************************************/
  }

  render () {
    let products = this.props.products
    const categories = this.props.categories
    const { filter, categoryId, selectedProduct, term } = this.state
    /*********************************************/
    // filter the Products List? - Main Section
    // are we filtering by category?
    if (filter && categoryId) {
      products = products.filter(product => {
        let acceptProd = false
        product.categories.forEach(category => {
          if (categoryId === category.id) acceptProd = true
        })
        return acceptProd
      })
    }
    // now check if we are filtering by search term.
    if (filter && term && products.length) {
      products = products.filter(product => {
        const regex = new RegExp(term, 'i')
        return regex.test(product.title)
      })
    }
    let renderswitch;
    if (selectedProduct.title) {
      // single product work here
      renderswitch = false
    //   const [imagesMain, ...imagesExtra] = selectedProduct.imgUrls.map(image => {
    //     return this.productWork(image)[0]
    //   })
    //   price = this.productWork(null, selectedProduct.price)[1]
    //   /*************************************/
    //   // create <div></div> for the multiple extra images
    //   if (imagesExtra.length) {
    //     renderProducts = (
    //       <div className='col-sm-3 panel panel-default marginbelowsm'>
    //         {
    //           imagesExtra.map(img => {
    //             return (<div className='col-sm-12' key={img}>
    //               <img src={img} className='responsive-image' />
    //             </div>)
    //           })
    //         }
    //       </div>)
    //   } else {
    //     renderProducts = <div className='col-sm-1 border panel panel-default' />
    //   }
    //   /*************************************/
    //   // create <div></div> for the main image
    //   renderProducts2 = <div className='col-sm-9'><img src={imagesMain} className='responsive-image' /></div>
    // /*************************************/
    } else {
      // looking for products in a category &/or containing a search term
      renderswitch = true;
    }
    if (renderswitch) {
      return <ProductList categoryId={ categoryId } categories={ categories } filter={ filter } term={ term } />
    } else {
      return <ProductDetail categoryId={categoryId} categories={categories} selectedProduct={selectedProduct} />
    }
  }
}

function mapState (state) {
  return state
}

export default connect(mapState)(Home)
