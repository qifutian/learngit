import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1e71fecf = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _418e9dc4 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _1f0539b8 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _c0500ab8 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _27312af0 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _12a32512 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _f2bb841e = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

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
    component: _1e71fecf,
    children: [{
      path: "",
      component: _418e9dc4,
      name: "home"
    }, {
      path: "/login",
      component: _1f0539b8,
      name: "login"
    }, {
      path: "/register",
      component: _1f0539b8,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _c0500ab8,
      name: "profile"
    }, {
      path: "/settings",
      component: _27312af0,
      name: "settings"
    }, {
      path: "/editor",
      component: _12a32512,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _f2bb841e,
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
