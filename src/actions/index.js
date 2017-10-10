import axios from 'axios';

// ***** ACTION TYPES *****

export const GOT_CATEGORIES = 'GOT_CATEGORIES';
export const WRITE_SEARCH_TERM = 'WRITE_SEARCH_TERM';
export const PRODUCTS_FOR_CATEGORY = 'PRODUCTS_FOR_CATEGORY';



// ***** ACTION CREATORS *****

export function fetchCategories() {
  return axios.get('/api/categories')
    .then(res => res.data)
    .then(categories => {
      return { type: GOT_CATEGORIES, payload: categories };
    })
}

export function fetchProductsForCat(id, searchTerm) {
  if (id && !searchTerm) {
    return axios.get(`/api/categories/${ id }`)
    .then(res => res.data)
    .then(category => {
      return { type: PRODUCTS_FOR_CATEGORY, payload: category };
    })
  } else if (!id && !searchTerm) {
    return axios.get(`/api/products/`)
    .then(res => res.data)
    .then(products => {
      const category = { id: 0, name: 'all categories', products };
      return { type: PRODUCTS_FOR_CATEGORY, payload: category };
    })
  } else if (!id && searchTerm) {
      return axios.get(`/api/products/`)
      .then(res => res.data)
      .then(products => {
        // got products, need to filter them:
        const _products = productsFilter(products, searchTerm)
        const category = { id: 0, searchTerm, name: 'all categories', _products };
        return { type: PRODUCTS_FOR_CATEGORY, payload: category };
    })
  } else {
      return axios.get(`/api/categories/${ id }/`)
      .then(res => res.data)
      .then(category => {
        // got category with associated products, filter:
        category.products = productsFilter(category.products, searchTerm);
        category.searchTerm = (category.searchTerm) ? category.searchTerm : '';
        return { type: PRODUCTS_FOR_CATEGORY, payload: category };
      })
  }
}

function productsFilter(products, searchTerm) {
    // searchTerm (caps, noCaps), (included in name)
    const _products = products.filter(product => {
      let searchUpper = searchTerm.slice(0, 1).toUpperCase() + searchTerm.slice(1).toLowerCase();
      let searchLower = searchTerm.slice(0).toLowerCase();
      let name = product.name;
      return product.name === name.includes(searchLower) || name.includes(searchUpper);
    })
    for (let i = 0; i < _products.length; i++) {
      console.log(_products[1].name)
    }
    return _products;
}

export function writeSearchTerm(searchTerm, searchCategory) {
  return { type: WRITE_SEARCH_TERM, payload: { searchTerm, searchCategory } }
}

//..........
//..........
//..........
//..........

export function removeTest(id) {
  // return axios.delete(`/api/tests/${ id }`)
  // .then(() => fetchData())
}

export function addTest(test) {
  // return axios.post('/api/tests', test)
  // .then(() => fetchData())
}

export function updateTest(test) {
  // return axios.put(`/api/tests/${ test.id }`, test)
  // .then(res => res.data)
  // .then(_test => {
  //   return gotSingleTest(_test.id)
  // })
}
