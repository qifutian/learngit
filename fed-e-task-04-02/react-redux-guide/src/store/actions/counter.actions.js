import { DECREMENT, DECREMENT_ASYNC, INCREMENT, INCREMENT_ASYNC } from "../const/counter.const"
import { createAction } from 'redux-actions'

// export const increment = payload => ({ type: INCREMENT, payload })
// export const decrement = payload => ({ type: DECREMENT, payload })

export const increment = createAction('increment')
export const decrement = createAction('decrement')

// export const increment_async = payload => dispatch => {
//   setTimeout(() => {
//     dispatch(increment(payload))
//   }, 2000)
// }

// export const decrement_async = payload => dispatch => {
//   setTimeout(() => {
//     dispatch(decrement(payload))
//   }, 2000)
// }

export const increment_async = payload => ({ type: INCREMENT_ASYNC, payload })

export const decrement_async = payload => ({ type: DECREMENT_ASYNC, payload })
