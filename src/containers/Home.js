import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: '/',
      categoryId: 0,
      term: '',
      filter: false
    }
  }

  componentWillReceiveProps(nextProps) {
    /*********************************************/
    // console.log - delete at some point
    console.log('>>>>>>>>>receiving Props:');
    console.log('>>>This Props:', this.props);
    console.log('>>>Next Props:', nextProps);
    /*********************************************/
    // get nextProps variables
    const pathnameLast = this.state.pathname;
    const pathname = nextProps.router.location.pathname;
    const categoryId = (nextProps.router.match.params.id) ? nextProps.router.match.params.id * 1 : 0;
    const term = (nextProps.router.match.params.term) ? nextProps.router.match.params.term : '';
    /*********************************************/
    // checking to see if someone clicked a link and changed the url
    // if yes, then lets see what we see...
    if (pathname !== pathnameLast) this.setState({ pathname, categoryId, term, filter: true })
  }

  render() {
    /*********************************************/
    // setup local variables
    let products = this.props.products;
    const categories = this.props.categories;
    const filter = this.state.filter;
    const categoryId = this.state.categoryId;
    const term = this.state.term;
    /*********************************************/
    //if ( !categories.length && !products.length) return <div></div>

    console.log('********** HOME - this.props: ', this.props)

    /*********************************************/
    // filter the Products List? - Main Section
    // are we filtering by category?
    if (filter && categoryId) {
       products = products.filter(product => {
        let acceptProd = false;
        product.categories.forEach(category => {
          if (categoryId === category.id) acceptProd = true;
        })
        return acceptProd;
      })
    }
    // now check if we are filtering by search term.
    if (filter && term && products.length) {
      products = products.filter(product => {
        let searchUpper = term.slice(0, 1).toUpperCase() + term.slice(1).toLowerCase();
        let searchLower = term.toLowerCase();
        let title = product.title;
        return title.includes(searchLower) || title.includes(searchUpper);
      })
    }
    /*********************************************/
    // create the Categories List - Sidebar
    const renderCategories = categories.map(category => {
        return (<Link to={ `/category/${ category.id }` } key={ category.id }><div
          className="col-sm-12">
          <h6>{ category.name }</h6></div></Link>)
      })
    /*********************************************/
    // create the Products List - Main Section
    const renderProducts = products.map(product => {
      if (product.inventory) {
        /*************************************/
        // accounting for varied image inputs:
        let image;
        if (product.imgUrls[0].slice(0, 7) === 'http://') {
          image = product.imgUrls[0]
        } else {
          image = `../../assets/images/${ product.imgUrls[0] }`;
        }
        /*************************************/
        // formating the price:
        const price = '$' + product.price.toString();
        /*************************************/
        return (<Link to={ `/category/${ product.id }` } key={ product.id }>
            <div className="col-sm-6 border">
              <div className="col-sm-6">
                <img src={ image } className="responsive-image" />
              </div>
              <div className="col-sm-6">
                <h6>{ product.title }</h6>     
                <h6><strong>Quantity Available:</strong> { product.inventory }</h6>
                <h6><strong>Price: </strong>{ price }</h6>
              </div>
            </div>
          </Link>)
      }
    })
    /*********************************************/
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 marginbelow">
            <h6>Select a category (below) or enter search term (above)</h6>
          </div>
          <div className="col-sm-2 panel panel-default">
            <div className="col-sm-12 marginbelow panel-heading colWidth100">
              <h6 className="center">CATEGORIES</h6>
            </div>
            <div className="col-sm-12 marginbelow">
              { renderCategories }
            </div>
          </div>
          <div className="col-sm-10 panel panel-default">
            <div className="col-sm-12 marginbelow panel-heading colWidth100">
              <h6 className="center">PRODUCTS</h6>
            </div>
            <div className="col-sm-12 marginbelow">
              { renderProducts }
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
