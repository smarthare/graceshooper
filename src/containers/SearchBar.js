import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchCategories, writeSearchTerm } from '../actions';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '', searchCategory: '0' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  clearState() {
    this.setState({
      searchTerm: this.props.state.shop.searchTerm,
      searchCategory: this.props.state.shop.searchCategory
    })
  }

  componentDidMount() {
      this.clearState();
      this.props.fetchCategories();
  }

  componentWillReceiveProps(nextProps) {
    const routePath = (nextProps.router) ? nextProps.router.location.pathname.slice(0, 9) : '/';
    const idLast = (this.props.router) ? this.props.router.match.params.id : null;
    const idNext = (nextProps.router) ? nextProps.router.match.params.id : null;
    if (idNext && routePath === '/category' && idNext !== idLast) {
      console.log('-------------in thunk....')
      this.props.writeSearchTerm('', idNext);
    } else {
      console.log('--------------in setState......')
      if (nextProps.router) {
        const idMatch = nextProps.router.match.params.id;
        const idState = nextProps.state.shop.searchCategory;
        if (idState !== idMatch) this.props.router.history.push('/');
      }
      this.setState({
        searchTerm: nextProps.state.shop.searchTerm,
        searchCategory: nextProps.state.shop.searchCategory
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.writeSearchTerm(this.state.searchTerm, this.state.searchCategory);
  }

  handleInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case 'searchTerm':
        this.setState({ searchTerm: value });
        break;
      case 'searchCategory':
        this.setState({ searchCategory: value })
        break;
    }
  }

  render() {
    console.log('***Search component:......', this.props)
    const state = this.props.state;
    const categories = state.shop.categories;
    if (!categories.length) return <div></div>;
    //Develop category select control
    const _categories = [{ id: 0, name: 'All Categories' }].concat(categories);
    const selectCat = _categories.map(category => {
      return <option key={ category.id } value={ category.id }>{ category.name }</option>
    })
    //-------------------------------
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 panel panel-default nomarginBot">
            <h4 className="col-sm-3 textBlk margintop marginbelowsm"><Link to={ `/` }>Grace Shopper</Link></h4>
            <div className="col-sm-9 search-bar margintop marginbelowsm">
              <form onSubmit={ this.handleSubmit }>
                <select
                  onChange={ this.handleInput }
                  value={ this.state.searchCategory }
                  name="searchCategory"
                  type="text">
                  { selectCat }
                </select>
                <input
                  value ={ this.state.searchTerm }
                  onChange={ this.handleInput }
                  className="colWidth60"
                  name="searchTerm" />
                <button type="submit">
                <span className="glyphicon glyphicon-search" aria-hidden="true" />
                </button>
              </form>
            </div>
            <div className="col-md-6 col-md-offset-6 search-bar marginbelowsm">
              <Link to={ `/admin` }><button>Admin Portal</button></Link>
              <Link to={ `/signin` }><button className="moverightsm">sign-in</button></Link>
              <Link to={ `/account` }><button className="moverightsm">Account</button></Link>
              <Link to={ `/orders` }><button className="moverightsm">Orders</button></Link>
              <Link to={ `/cart` }><button className="moverightsm margintopsm">Cart (0)</button></Link>
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
  return bindActionCreators({ fetchCategories, writeSearchTerm }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
