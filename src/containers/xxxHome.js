import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchProductsForCat, writeSearchTerm } from '../actions';

class Home extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentWillReceiveProps() {
  //   if (this.props.router) {
  //     const id = this.props.router.match.params.id;
  //     this.props.fetchProductsForCat(id)
  //   }
  // }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name) {
      this.props.addTest(this.state)
      this.clearState();
    } else {
      this.setState({ errorAdd: 'The name field is required', errorRemove: '' });
    }
  }

  render() {
    console.log('***Home component:......', this.props)
    const categories = this.props.state.shop.categories;
    const searchProducts = this.props.state.shop.searchProducts;
    const searchTerm = this.props.state.shop.searchTerm;
    if (!categories.length) return <div></div>;
    // Determine what is rendering: categories or searchProducts
    let renderingProd = false;
    let renderContainer;
    if (searchProducts.length) {
      renderProd = true;

      //need some code here....

    } else {
      renderContainer = categories.map(category => {
        return (<Link to={ `/category/${ category.id }` } key={ category.id }><div
          className="col-sm-12">
          <h5>{ category.name }</h5></div></Link>)
      })
    }

    //-------------------------------
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 panel panel-default">
            <div className="col-sm-12 marginbelow">
              { (renderingProd) ?
                <h6>{ searchProducts.length } results for { searchTerm }</h6> :
                <h6>Select a category (below) or enter search term (above)</h6>
              }
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
  return bindActionCreators({ fetchProductsForCat, writeSearchTerm }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
