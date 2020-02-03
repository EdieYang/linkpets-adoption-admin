import request from '@/plugin/axios'

/**
 * 分页查询banner列表
 * @param data
 */
export function bannerPage(data) {
  return request({
    url: '/adopt/banner/page',
    method: 'get',
    params: data
  })
}

/**
 * 创建圈子
 * @param data
 */
export function crtBanner(data) {
  return request({
    url: '/adopt/banner',
    method: 'post',
    data
  })
}

/**
 * 更新圈子
 * @param data
 */
export function uptBanner(data) {
  return request({
    url: '/adopt/banner',
    method: 'put',
    data
  })
}

/**
 * 删除banner
 */
export function delBanner(data) {
  return request({
    url: '/adopt/banner',
    method: 'put',
    data
  })
}
