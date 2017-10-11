import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    console.log('********** HOME - this.props: ', this.props)
    const categories = this.props.categories;
    const products = this.props.products;

    // create the Categories List - Sidebar
    const renderCategories = categories.map(category => {
        return (<Link to={ `/category/${ category.id }` } key={ category.id }><div
          className="col-sm-12">
          <h6>{ category.name }</h6></div></Link>)
      })
    /*********************************************/
    // create the Products List - Main Section
    const renderProducts = products.map(product => {
      if (product.inventory) {
        let image = (product.imgUrls[0].slice(0, 7) === 'http://') ? product.imgUrls[0] : `../assets/images/${ product.imgUrls[0] }.png` ;
        return (<Link to={ `/category/${ product.id }` } key={ product.id }>
            <div className="col-sm-6 border">
              <div className="col-sm-6">
                <img src={ image } className="responsive-image" />
              </div>
              <div className="col-sm-6">
                <h6>{ product.title }</h6>
                <h6>{ product.description.slice(0, 25) }...</h6>
                <h6>{ product.inventory }</h6>
              </div>
            </div>
          </Link>)
      }
    })
    /*********************************************/
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 marginbelow">
            <h6>Select a category (below) or enter search term (above)</h6>
          </div>
          <div className="col-sm-3 panel panel-default">
            <div className="col-sm-12 marginbelow panel-heading colWidth100">
              <h6 className="center">CATEGORIES</h6>
            </div>
            <div className="col-sm-12 marginbelow">
              { renderCategories }
            </div>
          </div>
          <div className="col-sm-9 panel panel-default">
            <div className="col-sm-12 marginbelow panel-heading colWidth100">
              <h6 className="center">PRODUCTS</h6>
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

export default connect(mapStateToProps)(Home);
