const files = require.context('./', true, /\.js$/)
import layoutHeaderAside from '@/layout/header-aside'

let componentMaps = {
  layoutHeaderAside: layoutHeaderAside,
  menu: () => import(/* webpackChunkName: "menu" */ '@/views/sys/menu'),
  route: () => import(/* webpackChunkName: "route" */ '@/views/sys/route'),
  permission: () =>import(/* webpackChunkName: "route" */ '@/views/sys/permission'),
  role: () => import(/* webpackChunkName: "role" */ '@/views/sys/role'),
  user: () => import(/* webpackChunkName: "user" */ '@/views/sys/user')
}
files.keys().forEach(key => {
  if (key === './index.js') return
  Object.assign(componentMaps, files(key).default)
})
export default componentMaps
