import { SHOWMODAL, HIDEMODAL, SHOWMODAL_ASYNC, HIDEMODAL_ASYNC } from '../const/modal.const'

export const show = () => ({ type: SHOWMODAL })
export const hide = () => ({ type: HIDEMODAL })

export const show_async = () => ({ type: SHOWMODAL_ASYNC })
export const hide_async = () => ({ type: HIDEMODAL_ASYNC })
