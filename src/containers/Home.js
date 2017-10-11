import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    console.log('********** HOME - this.props: ', this.props)
    // const categories = this.props.shop.categories;
    const categories = this.props.categories;
    // if (!categories.length) return <div></div>;
    const renderCategories = categories.map(category => {
        return (<Link to={ `/category/${ category.id }` } key={ category.id }><div
          className="col-sm-12">
          <h6>{ category.name }</h6></div></Link>)
      })
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
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state;
}

export default connect(mapStateToProps)(Home);
