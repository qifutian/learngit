import { takeEvery, put, delay } from 'redux-saga/effects'
import { decrement, increment } from '../actions/counter.actions'
import { DECREMENT_ASYNC, INCREMENT_ASYNC } from '../const/counter.const'
// takeEvery 接收 action
// put 触发 action

function* increment_async_fn (action) {
  yield delay(2000)
  yield put(increment(action.payload))
}

function* decrement_async_fn (action) {
  yield delay(2000)
  yield put(decrement(action.payload))
}

export default function* counterSaga () {
  // 接收 action
  yield takeEvery(INCREMENT_ASYNC, increment_async_fn)
  yield takeEvery(DECREMENT_ASYNC, decrement_async_fn)
}
