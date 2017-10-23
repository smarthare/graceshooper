import React from 'react'
import { connect } from 'react-redux'
import { auth, fetchCart, mergeCart } from '../store'

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props
  return (
    <div className='col-md-4 col-md-offset-4'>
      <div className='panel panel-default'>
        <div className='panel-body'>
          <form onSubmit={handleSubmit} name={name}>
            <div className='form-group'>
              <label htmlFor='email'><small>Email</small></label>
              <input className='form-control' name='email' type='text' />
            </div>
            <div className='form-group'>
              <label htmlFor='password'><small>Password</small></label>
              <input className='form-control' name='password' type='password' />
            </div>
            <div className='row'>
              <div className='col-xs-6'>
                <button className='btn btn-primary' type='submit'>{displayName}</button>
              </div>
              <div className='col-xs-6'>
                <a href='/api/auth/google'>
                  <img src={`../../assets/images/gsignin.png`} style={{width: 'auto', height: 44}}/>
                </a>
              </div>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>

        </div>
      </div>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.currentUser.error,
    cart: state.cart
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.currentUser.error,
    cart: state.cart
  }
}

const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit (evt) {
    evt.preventDefault()
    const formName = evt.target.name
    const credentials = {
      email: evt.target.email.value,
      password: evt.target.password.value
    }
    dispatch(auth(credentials, ownProps.history, formName))
    .then(() => dispatch(mergeCart()))
    .then(() => dispatch(fetchCart()))
  }
})

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
