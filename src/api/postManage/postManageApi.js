import request from '@/plugin/axios'

/**
 * 分页获取圈子帖子
 * @param data
 */
export function postList(data) {
  return request({
    url: '/adopt/group/post/page',
    method: 'get',
    params: data
  })
}

/**
 * 删除圈子帖子
 * @param data
 */
export function postDelete(data) {
  return request({
    url: '/adopt/group/post',
    method: 'delete',
    params: data
  })
}
