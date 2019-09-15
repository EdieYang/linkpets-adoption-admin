import request from '@/plugin/axios'

export function listOrgUsers (orgId, data) {
  return request({
    url: 'http://192.168.0.110:8095/lpCmsTest/adopt/orgs/' + orgId + '/user',
    method: 'get',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    params: data
  })
}
