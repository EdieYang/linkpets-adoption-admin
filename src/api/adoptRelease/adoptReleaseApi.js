import request from '@/plugin/axios'

export function adoptNew (data) {
  return request({
    url: '/test/adopt/pets/info',
    method: 'post',
    data
  })
}

export function adoptList (data) {
  return request({
    url: '/test/adopt/orgs/pets',
    method: 'get',
    params: data
  })
}
