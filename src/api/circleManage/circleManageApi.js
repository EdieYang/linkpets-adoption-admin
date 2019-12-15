import request from '@/plugin/axios'

/**
 * 分页查询圈子列表
 * @param data
 */
export function circleList(data) {
  return request({
    url: '/adopt/group/page',
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
    url: '/adopt/group',
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
    url: '/adopt/group',
    method: 'put',
    data
  })
}
