import request from '@/plugin/axios'

export function getOrgStatistic (orgId) {
  return request({
    url:
      'http://192.168.0.110:8095/lpCmsTest/adopt/statistic/' + orgId + '/data',
    method: 'get',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' }
  })
}
