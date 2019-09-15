import request from '@/plugin/axios'

export function listActivities (data) {
  return request({
    url: 'http://192.168.0.110:8095/lpCmsTest/adopt/orgs/activity',
    method: 'get',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    params: data
  })
}

export function postActivity (data) {
  return request({
    url: 'https://www.linchongpets.com/lpCmsTest/adopt/orgs/activity',
    method: 'post',
    data
  })
}

export function uptActivity (data) {
  return request({
    url: 'https://www.linchongpets.com/lpCmsTest/adopt/orgs/activity',
    method: 'put',
    data
  })
}
