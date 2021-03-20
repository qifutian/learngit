import { HIDEMODAL, SHOWMODAL } from "../const/modal.const"

const initialState = {
  show: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HIDEMODAL:
      return {
        ...state,
        show: false
      }
    case SHOWMODAL:
      return {
        ...state,
        show: true
      }
    default:
      return state
  }
}