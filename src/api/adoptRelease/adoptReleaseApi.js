import request from '@/plugin/axios'

/**
 * 获取领养列表
 * @param data
 */
export function adoptList (data) {
  return request({
    url: '/test/adopt/orgs/pets',
    method: 'get',
    params: data
  })
}

/**
 * 新增领养发布
 * @param data
 */
export function adoptNew (data) {
  return request({
    url: '/test/adopt/pets/info',
    method: 'post',
    data
  })
}

/**
 * 新增领养发布
 * @param data
 */
export function adoptEdit (data) {
  return request({
    url: '/test/adopt/pets/info',
    method: 'put',
    data
  })
}

export function adoptDetail (data) {
  return request({
    url: '/test/adopt/pets/'+data.petId,
    method: 'get',
    params: data
  })
}
