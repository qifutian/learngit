import { all } from 'redux-saga/effects'
import counterSaga from './counter.saga'
import modalSaga from './modal.saga'

export default function* saga () {
  yield all([
    counterSaga(),
    modalSaga()
  ])
}
