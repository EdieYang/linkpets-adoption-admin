import request from '@/plugin/axios'

/**
 * 分页查询圈子活动报名列表
 * @param data
 */
export function getGroupActivityRegisterPage(data) {
  return request({
    url: '/group/activity/register/page',
    method: 'get',
    params: data
  })
}

/**
 * 查询圈子活动报名列表
 * @param data
 */
export function getGroupActivityRegisterList(data) {
  return request({
    url: '/group/activity/register/list',
    method: 'get',
    params: data
  })
}

/**
 * 取消用户活动报名
 * @param data
 */
export function delGroupActivityRegister(data) {
  return request({
    url: '/group/activity/register',
    method: 'delete',
    params: data
  })
}
