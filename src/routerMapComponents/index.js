const files = require.context('./', true, /\.js$/)
import layoutHeaderAside from '@/layout/header-aside'

let componentMaps = {
  layoutHeaderAside: layoutHeaderAside,
  menu: () =>
    import(
      /* webpackChunkName: "menu" */
      '@/views/sys/menu'
    ),
  route: () =>
    import(
      /* webpackChunkName: "route" */
      '@/views/sys/route'
    ),
  permission: () =>
    import(
      /* webpackChunkName: "route" */
      '@/views/sys/permission'
    ),
  role: () =>
    import(
      /* webpackChunkName: "role" */
      '@/views/sys/role'
    ),
  user: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/sys/user'
    ),
  orgMange: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/orgManage'
    ),
  organizationStructure: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/orgManage/structure'
    ),
  adoptionRealseIndex: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/adoptRelease/index'
    ),
  adoptionNew: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/adoptRelease/new'
    ),
  adoptionWxArticle: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/activityRelease'
    ),
  adoptionGallery: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/galleryRelease'
    ),
  adoptionBackup: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/adoptedMgn/index'
    ),
  adoptionBackupDetail: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/adoptedMgn/detail'
    ),
  groupIndex: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/circleMgn'
    ),
  activityIndex: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/activityMgn/index'
    ),
  activityNew: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/activityMgn/new'
    ),
  activityDetail: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/activityMgn/detail'
    ),
  questionnaireIndex: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/questionnaireMgn/index'
    ),
  questionnaireNew: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/questionnaireMgn/new'
    ),
  postIndex: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/postMgn'
    ),
  userIndex: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/userCenter/user/index'
    ),
  bannerIndex: () =>
    import(
      /* webpackChunkName: "user" */
      '@/views/baseMgn/bannerMgn/index'
    )
}
files.keys().forEach(key => {
  if (key === './index.js') return

  Object.assign(componentMaps, files(key).default)
})
export default componentMaps
