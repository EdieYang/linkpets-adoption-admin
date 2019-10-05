import request from '@/plugin/axios'

export function listApplys (data) {
  return request({
    url: '/adopt/orgs/apply',
    method: 'get',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    params: data
  })
}

export function detail (data) {
  return request({
    url: '/adopt/agreement/info',
    method: 'get',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    params: data
  })
}
