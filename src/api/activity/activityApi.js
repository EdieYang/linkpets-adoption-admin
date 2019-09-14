import request from '@/plugin/axios'

export function listActivities (data) {
  return request({
    url: 'https://www.linchongpets.com/lpCmsTest/adopt/orgs/activity',
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
