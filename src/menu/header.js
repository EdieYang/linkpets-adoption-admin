// 菜单 顶栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '页面',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '页面 1' },
      { path: '/page2', title: '页面 2' },
      { path: '/page3', title: '页面 3' }
    ]
  },
  { path: '/orgManage/index', title: '组织管理', icon: 'folder-o' },
  { path: '/orgManage/index', title: '组织管理', icon: 'folder-o' },
  { path: '/adoptRelease/index', title: '领养发布', icon: 'folder-o' },
  { path: '/activityRelease/index', title: '活动发布', icon: 'folder-o' }
]
