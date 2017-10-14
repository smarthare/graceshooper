import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { logout } from '../store'

// To Do: add currentUser.isAdmin in front of admin link

class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // searchTerm: this.props.state.shop.searchTerm,
      // searchCategory: this.props.state.shop.searchCategory };
      searchTerm: '',
      searchCategory: 0 }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
    // this.clearState = this.clearState.bind(this);
  }

  // clearState() {
  //   this.setState({
  //     searchTerm: this.props.state.shop.searchTerm,
  //     searchCategory: this.props.state.shop.searchCategory
  //   })
  // }

  componentDidMount () {
      // this.clearState();
  }

  componentWillReceiveProps (nextProps) {
    console.log('.......Search this.props: ', this.props)
    console.log('.......Search nextPops: ', nextProps)
    // const routePath = nextProps.router.location.pathname.slice(0, 9);
    // const idLast = this.props.router.match.params.id * 1;
    // const idNext = nextProps.router.match.params.id * 1;
    // const termLast = this.props.router.match.params.term;
    // const termNext = nextProps.router.match.params.term;
    // const catLenLast = this.props.state.categories.length;
    // if (!idLast && !idNext && routePath === '/' && !catLenLast) {
    //   console.log('****** Starting the App ******')
    //   // *****       Starting the App      *****
    //   // ***** Just start, do nothing else *****
    // } else if (routePath === '/category' && (idNext !== idLast || (termNext !== termLast))) {
    //   console.log('****** Select Categories from Home Display List *********')
    //   // *****      Select Categories from Home Display List       *****
    //   // ***** fetch categories & display on ProductList component *****
    //   this.props.fetchProductsForCat(idNext, termNext)
    // } else if (!idNext && routePath === '/') {
    //   console.log('****** //// Hitting the Grace Hopper link //// ******')
    // }
  }

  handleSubmit (event) {
    event.preventDefault()
    const { searchCategory, searchTerm } = this.state
    const pushPath = `/category/${searchCategory}/${searchTerm || ''}`
    this.props.router.history.push(pushPath)
  }

  handleInput (event) {
    const name = event.target.name
    const value = event.target.value
    switch (name) {
      case 'searchTerm':
        this.setState({ searchTerm: value })
        break
      case 'searchCategory':
        this.setState({ searchCategory: value })
        break
    }
  }

  render () {
    const { categories, currentUser, onLogOut, cart } = this.props
    // Develop category select control
    const _categories = [{ id: 0, name: 'All Categories' }].concat(categories)
    const selectCat = _categories.map(category => {
      return <option key={category.id} value={category.id}>{ category.name }</option>
    })
    let renderAuth, renderAdmin;
    if (currentUser.id) {
      renderAdmin = <Link to="/admin"><div className="col-sm-2 moverightsm margintopsm center">Admin Portal</div></Link>;
      renderAuth = <div onClick={onLogOut} className="col-sm-2 moverightsm margintopsm center">Log Out</div>
    } else {
      renderAuth = (<div className="col-sm-4 moverightsm margintopsm center">
          <Link to="/signin"><div className="col-sm-2 center">Login</div></Link>
          <Link to="/signup"><div className="col-sm-7 center">Sign Up</div></Link>
        </div>
      )
    }
    // -------------------------------
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 panel panel-default nomarginBot backGreyBlue">
            <h4 className="col-sm-3 margintopmore marginbelowsm"><Link to={`/category/0`}>Grace Shopper</Link></h4>
            <div className="col-sm-9 margintopmore marginbelowsm">
              <form onSubmit={this.handleSubmit}>
                <select
                  onChange={this.handleInput}
                  value={this.state.searchCategory}
                  name="searchCategory"
                  type="text">
                  { selectCat }
                </select>
                <input
                  value={this.state.searchTerm}
                  onChange={this.handleInput}
                  className="colWidth60"
                  name="searchTerm" />
                <button type="submit">
                  <span className="glyphicon glyphicon-search" aria-hidden="true" />
                </button>
              </form>
            </div>
              <div className="col-sm-12 marginbelowsm">
                <Link to="/"><div className="col-sm-1 moverightsm margintopsm center">Home</div></Link>
                <Link to="/account"><div className="col-sm-2 moverightsm margintopsm center">Account</div></Link>
                <Link to="/cart"><div className="col-sm-2 moverightsm margintopsm center">Cart ({cart.lineItems.length})</div></Link>
                { renderAuth }
                { renderAdmin }
              </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state, { router }) => ({
  currentUser: state.currentUser,
  categories: state.categories,
  cart: state.cart,
  router
})

const mapDispatch = ({
  onLogOut: logout
})

export default withRouter(connect(mapState, mapDispatch)(SearchBar))
