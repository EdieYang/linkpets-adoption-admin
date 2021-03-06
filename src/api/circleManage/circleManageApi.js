import request from '@/plugin/axios'

/**
 * 分页查询圈子列表
 * @param data
 */
export function circleList(data) {
  return request({
    url: '/group/page',
    method: 'get',
    params: data
  })
}

/**
 * 查询圈子列表
 * @param data
 */
export function circleListAll(data) {
  return request({
    url: '/group/list',
    method: 'get',
    params: data
  })
}

/**
 * 创建圈子
 * @param data
 */
export function circleNew(data) {
  return request({
    url: '/group',
    method: 'post',
    data
  })
}

/**
 * 更新圈子
 * @param data
 */
export function circleEdit(data) {
  return request({
    url: '/group',
    method: 'put',
    data
  })
}
