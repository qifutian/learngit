import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _387b6771 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _2a847234 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _6d335e42 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _7208b37c = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _ac8d9aac = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _2cac8db4 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _a4742ce2 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _387b6771,
    children: [{
      path: "",
      component: _2a847234,
      name: "home"
    }, {
      path: "/login",
      component: _6d335e42,
      name: "login"
    }, {
      path: "/register",
      component: _6d335e42,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _7208b37c,
      name: "profile"
    }, {
      path: "/settings",
      component: _ac8d9aac,
      name: "settings"
    }, {
      path: "/editor",
      component: _2cac8db4,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _a4742ce2,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
