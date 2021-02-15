import { takeEvery, put, delay } from 'redux-saga/effects'
import { show, hide } from '../actions/modal.actions'
import { SHOWMODAL_ASYNC, HIDEMODAL_ASYNC } from '../const/modal.const'

function* show_async_fn () {
  yield delay(2000)
  yield put(show())
}

function* hide_async_fn () {
  yield delay(2000)
  yield put(hide())
}

export default function* modalSaga () {
  yield takeEvery(SHOWMODAL_ASYNC, show_async_fn)
  yield takeEvery(HIDEMODAL_ASYNC, hide_async_fn)
}
