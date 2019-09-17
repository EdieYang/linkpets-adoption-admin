import request from '@/plugin/axios'

export function listOrgUsers (orgId, data) {
  return request({
    url: '/adopt/orgs/' + orgId + '/user',
    method: 'get',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    params: data
  })
}
