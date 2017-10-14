import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.productWork = this.productWork.bind(this);
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

  render() {
    /*********************************************/
    // setup local variables
    console.log('>>>>>>>>>>>>>> props: ', this.props);
    if (!this.props.categories.length) return <div></div>;
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
        const regex = new RegExp(term, 'i')
        return regex.test(product.title)
      })
    }
    /*********************************************/
    // create the Products List &/or the Selected Product- Main Section
    /*********************************************/
    // if there is a selected Product, then render for the one product
    let renderProducts, price;
    // looking for products in a category &/or containing a search term
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

export default connect(mapStateToProps)(ProductList);
