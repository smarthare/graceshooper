import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchCategories } from '../actions';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = { term: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  clearState() {
    this.setState({ searchTerm: '' })
  }

  componentDidMount() {
    this.clearState();
    this.props.fetchCategories();
  }

  componentWillReceiveProps() {
    this.clearState();
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

  onInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case 'name':
        this.setState({ name: value });
        break;
      case 'phone':
        this.setState({ phone: value });
        break;
      case 'selectTest':
        this.setState({ selectTest: value })
        break;
    }
  }

  render() {
    console.log('***SearchBar component:......', this.props)
    const categories = this.props.shop.categories;
    if (!categories.length) return <div></div>;
    //Develop category select control
    const _categories = [{ id: 0, name: 'All Categories' }].concat(categories);
    const selectCat = _categories.map(category => {
      return (<option
          className="textBlk"
          key={ category.id }
          value={ category.id }>{ category.name }</option>)
    })
    //-------------------------------
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 panel panel-default backTan">
            <h4 className="col-sm-3 textBlk margintop marginbelowsm">Grace Shopper</h4>
            <div className="col-sm-9 search-bar margintop marginbelowsm">
              <select>
                { selectCat }
              </select>
              <input
                className="colWidth55"
                value ={ this.state.term }
                onChange={ this.onInputChange } />
              <button>
              <span className="glyphicon glyphicon-search" aria-hidden="true" />
              </button>
            </div>

            <div className="col-md-6 col-md-offset-5 search-bar marginbelowsm">
              <button>Admin Portal</button>
              <button className="moverightsm">sign-in</button>
              <button className="moverightsm">Account</button>
              <button className="moverightsm">Orders</button>
              <button className="moverightsm margintopsm">Cart (0)</button>
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
  return bindActionCreators({ fetchCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
