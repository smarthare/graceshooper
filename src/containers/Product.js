import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { selectedProduct } from '../actions';

class Product extends Component {

  componentWillReceiveProps(nextProps) {
    console.log('.......Search this.props: ', this.props)
    console.log('.......Search nextPops: ', nextProps)
    
  }

  render() {
    console.log('..........  ProductList component:  ..........', this.props)
    const category = this.props.state.shop.selectedCategory;
    const products = this.props.state.shop.searchProducts;
    if (!category.name) return <div></div>;
    const renderContainer = products.map(product => {
        return (<Link to={ `/product/${ product.id }` } key={ product.id }><div
          className="col-sm-12">
          <h5>{ product.name }</h5></div></Link>)
      })
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 panel panel-default backTan">
            <div className="col-sm-12 marginbelow">
              <h6>product view: { category.name }</h6>
            </div>
            <div className="col-sm-12 marginbelow">
              { renderContainer }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, { router }) {
  return { state, router };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ selectedProduct }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));
