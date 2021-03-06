import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: false
        },
        component: _import('system/index')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: false
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  },
  // {
  //   path: '/orgManage',
  //   redirect: { name: 'index' },
  //   component: layoutHeaderAside,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'orgManage',
  //       meta: {
  //         title: '组织管理',
  //         auth: true
  //       },
  //       component: _import('orgManage/index')
  //     }
  //   ]
  // },
  // {
  //   path: '/adoptRelease',
  //   redirect: { name: 'index' },
  //   component: layoutHeaderAside,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'adoptRelease',
  //       meta: {
  //         title: '领养信息列表',
  //         auth: true
  //       },
  //       component: _import('adoptRelease/index')
  //     },
  //     {
  //       path: 'new',
  //       name: 'adoptNew',
  //       meta: {
  //         title: '领养信息发布',
  //         auth: true
  //       },
  //       component: _import('adoptRelease/new')
  //     },
  //     {
  //       path: 'check',
  //       name: 'adoptCheck',
  //       meta: {
  //         title: '查看领养信息',
  //         auth: true
  //       },
  //       component: _import('adoptRelease/check')
  //     }
  //   ]
  // },
  // {
  //   path: '/activityRelease',
  //   redirect: { name: 'index' },
  //   component: layoutHeaderAside,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'activityRelease',
  //       meta: {
  //         title: '活动发布',
  //         auth: true
  //       },
  //       component: _import('activityRelease/index')
  //     }
  //   ]
  // },
  // {
  //   path: '/galleryRelease',
  //   redirect: { name: 'index' },
  //   component: layoutHeaderAside,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'galleryRelease',
  //       meta: {
  //         title: '相册墙',
  //         auth: true
  //       },
  //       component: _import('galleryRelease/index')
  //     }
  //   ]
  // },
  // {
  //   path: '/adoptedMgn',
  //   redirect: { name: 'index' },
  //   component: layoutHeaderAside,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'adoptedMgn',
  //       meta: {
  //         title: '送养备案',
  //         auth: true
  //       },
  //       component: _import('adoptedMgn/index')
  //     },
  //     {
  //       path: 'detail',
  //       name: 'adoptedMgnDetail',
  //       meta: {
  //         title: '备案详情',
  //         auth: true
  //       },
  //       component: _import('adoptedMgn/detail')
  //     }
  //   ]
  // },
  // {
  //   path: '/circleMgn',
  //   redirect: { name: 'index' },
  //   component: layoutHeaderAside,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'circleMgn',
  //       meta: {
  //         title: '圈子管理',
  //         auth: true
  //       },
  //       component: _import('circleMgn/index')
  //     }
  //   ]
  // },
  // {
  //   path: '/activityMgn',
  //   redirect: { name: 'index' },
  //   component: layoutHeaderAside,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'activityMgn',
  //       meta: {
  //         title: '活动管理',
  //         auth: true
  //       },
  //       component: _import('activityMgn/index')
  //     },
  //     {
  //       path: 'new',
  //       name: 'activityNew',
  //       meta: {
  //         title: '活动管理',
  //         auth: true
  //       },
  //       component: _import('activityMgn/new')
  //     }
  //   ]
  // },
  // {
  //   path: '/questionnaireMgn',
  //   redirect: { name: 'index' },
  //   component: layoutHeaderAside,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'questionnaireMgn',
  //       meta: {
  //         title: '问卷管理',
  //         auth: true
  //       },
  //       component: _import('questionnaireMgn/index')
  //     },
  //     {
  //       path: 'new',
  //       name: 'questionnaireNew',
  //       meta: {
  //         title: '问卷管理',
  //         auth: true
  //       },
  //       component: _import('questionnaireMgn/new')
  //     }
  //   ]
  // },
  // {
  //   path: '/postMgn',
  //   redirect: { name: 'index' },
  //   component: layoutHeaderAside,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'postMgn',
  //       meta: {
  //         title: '发帖内容管理',
  //         auth: true
  //       },
  //       component: _import('postMgn/index')
  //     }
  //   ]
  // }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage]
