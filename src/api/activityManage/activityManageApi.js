import request from '@/plugin/axios'

/**
 * 查询圈子列表
 * @param data
 */
export function circleList(data) {
  return request({
    url: '/group/list',
    method: 'get',
    params: data
  })
}

/**
 * 分页查询圈子活动列表
 * @param data
 */
export function activityList(data) {
  return request({
    url: '/group/activities/page',
    method: 'get',
    params: data
  })
}

/**
 * 创建圈子活动
 * @param data
 */
export function activityNew(data) {
  return request({
    url: '/group/activities',
    method: 'post',
    data
  })
}

/**
 * 更新圈子活动
 * @param data
 */
export function activityEdit(data) {
  return request({
    url: '/group/activities',
    method: 'put',
    data
  })
}

/**
 * 查询圈子活动详情
 * @param data
 */
export function activityDetail(data) {
  return request({
    url: '/group/activities',
    method: 'get',
    params: data
  })
}

/**
 * 删除圈子活动
 * @param data
 */
export function activityDelete(data) {
  return request({
    url: '/group/activities',
    method: 'delete',
    params: data
  })
}
