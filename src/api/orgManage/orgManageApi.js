import request from '@/plugin/axios'

export function listOrgUsers (orgId, data) {
  return request({
    url: '/adopt/orgs/' + orgId + '/user',
    method: 'get',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    params: data
  })
}

export function getOrgInfo (data) {
  return request({
    url: '/adopt/orgs/info',
    method: 'get',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    params: data
  })
}

export function saveOrgInfo (data) {
  return request({
    url: '/adopt/orgs/org',
    method: 'put',
    data
  })
}
