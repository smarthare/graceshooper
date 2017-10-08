import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { } from '../actions';

class Home extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
    console.log('***SearchBar component:......', this.props)
    const categories = this.props.shop.categories;
    const searchProducts = this.props.shop.searchProducts;
    const searchTerm = this.props.shop.searchTerm;
    if (!categories.length) return <div></div>;
    // Determine what is rendering: categories or searchProducts
    let renderingProd = false;
    let renderContainer;
    if (searchProducts.length) {
      renderProd = true;

      //need some code here....

    } else {
      renderContainer = categories.map(category => {
        return (<Link to={  }><div
          className="col-sm-12"
          key={ category.id }>
          <h5>{ category.name }</h5></div></Link>)
      })
    }

    //-------------------------------
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 panel panel-default backTan">
            <div className="col-sm-12 marginbelow">
              { (renderingProd) ?
                <h6>{ searchProducts.length } results for { searchTerm }</h6> :
                <h6>Select a category or search term above</h6>
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

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
