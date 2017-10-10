import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    console.log('..........  orig home  ..........')
    const categories = this.props.shop.categories;
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
              <h6>Select a category (below) or enter search term (above)</h6>
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

export default connect(mapStateToProps)(Home);
