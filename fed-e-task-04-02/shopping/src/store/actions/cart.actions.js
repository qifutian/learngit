import { createAction } from 'redux-actions'

// 向服务器发送请求，添加商品到在线购物车中
export const addProductToCart = createAction('addProductToCart')
// 将商品添加到本地的购物车数据中
export const addProductToLocalCart = createAction('addProductToLocalCart')
// 向服务器发送请求，获取购物车列表数据
export const loadCarts = createAction('loadCarts')
// 将服务器1返回的购物车列表数据同步到本地购物车中
export const saveCarts = createAction('saveCarts')
// 向服务器发送请求，告诉服务器删除哪一个商品
export const deleteProductFromCart = createAction('deleteProductFromCart')
// 删除本地购物车中的商品
export const deleteProductFromLocalCart = createAction('deleteProductFromLocalCart')
// 修改购物车中商品数量
export const changeServiceProductNumber = createAction('changeProductNumber')
// 更新购物车中商品信息
export const changeLocalProductNumber = createAction('changeLocalProductNumber')
