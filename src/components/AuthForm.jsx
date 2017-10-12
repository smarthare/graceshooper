import React from 'react'
import { connect } from 'react-redux'
import { auth } from '../store'

const AuthForm = (props) => {
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
            <div>
              <button className='btn btn-primary' type='submit'>{displayName}</button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <a href='/auth/google'>{displayName} with Google</a>
        </div>
      </div>
    </div>
  )
}

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.currentUser.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.currentUser.error
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const credentials = {
        email: evt.target.email.value,
        password: evt.target.password.value
      }
      dispatch(auth(credentials, ownProps.history, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
