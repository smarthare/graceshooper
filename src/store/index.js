import { createStore, applyMiddleware } from 'redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxPromise from 'redux-promise'
import thunkMiddleware from 'redux-thunk'

import reducers from '../reducers'

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, ReduxPromise, createLogger()),
    autoRehydrate()
  )
)

persistStore(store)

export default store
export * from '../reducers'
