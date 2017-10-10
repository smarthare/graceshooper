import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ProductList extends Component {
  render() {
    console.log('..........  ProductList component:  ..........', this.props)
    const categories = this.props.state.shop.categories;
    if (!categories.length) return <div></div>;
    const renderContainer = categories.map(category => {
        return (<Link to={ `/category/${ category.id }` } key={ category.id }><div
          className="col-sm-12">
          <h5>{ category.name }</h5></div></Link>)
      })
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 panel panel-default backTan">
            <div className="col-sm-12 marginbelow">
              <h6>result - products....</h6>
            </div>
            <div className="col-sm-12 marginbelow">
              ProductList
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

export default connect(mapStateToProps)(ProductList);
