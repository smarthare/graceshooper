import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { logout, clearUserOrders, clearCart } from '../store'

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
  }

  componentWillReceiveProps (nextProps) {
    /*********************************************/
    // get nextProps variables
    const pathnameLast = this.props.location.pathname
    const pathname = nextProps.router.location.pathname
    const searchCategory = (nextProps.router.match.params.id) ? nextProps.router.match.params.id * 1 : 0
    const searchTerm = (nextProps.router.match.params.term) ? nextProps.router.match.params.term : ''
    /*********************************************/
    // update state......
    if (pathname !== pathnameLast) this.setState({ searchCategory, searchTerm })
    /*********************************************/
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
    let renderAccount, renderAuth, renderAdmin;
    if (currentUser.id) {
      renderAccount = <Link to="/account"><div className="col-sm-2 center">Account</div></Link>
      renderAdmin = <Link to="/admin"><div className="col-sm-2 center">Admin Portal</div></Link>;
      renderAuth = <div onClick={onLogOut} className="col-sm-2 center">Log Out</div>
    } else {
      renderAuth = (<div>
          <Link to="/signin"><div className="col-sm-2 center">Login</div></Link>
          <Link to="/signup"><div className="col-sm-2 center">Sign Up</div></Link>
        </div>
      )
    }
    // -------------------------------
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 panel panel-default nomarginBot backGreyBlue">
            <h2 className="col-sm-3 margintopmore marginbelowsm"><Link to={`/category/0`}>Grace Shopper</Link></h2>
            <div className="col-sm-9 margintopmore marginbelowsm h4">
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
                { renderAdmin }
                <Link to="/"><div className="col-sm-2 center">Home</div></Link>
                { renderAccount }
                { renderAuth }
                <Link to="/cart"><div className="col-sm-2 center">Cart ({cart.lineItems.length})</div></Link>
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

const mapDispatch = (dispatch, ownProps) => ({
  onLogOut () {
    dispatch(logout(ownProps.history))
    dispatch(clearCart())
    dispatch(clearUserOrders())
  }
})

export default withRouter(connect(mapState, mapDispatch)(SearchBar))
