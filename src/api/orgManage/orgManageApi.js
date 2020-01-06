import request from '@/plugin/axios'

export function getOrgPage(data) {
  return request({
    url: '/adopt/orgs/page',
    method: 'get',
    params: data
  })
}

export function listOrg(data) {
  return request({
    url: '/adopt/orgs/list',
    method: 'get',
    params: data
  })
}

export function listOrgUsers(data) {
  return request({
    url: '/adopt/orgs/user',
    method: 'get',
    params: data
  })
}

export function getOrgUserPage(data) {
  return request({
    url: '/adopt/orgs/user/page',
    method: 'get',
    params: data
  })
}

export function getOrgInfo(data) {
  return request({
    url: '/adopt/orgs/info',
    method: 'get',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    params: data
  })
}

export function saveOrgInfo(data) {
  return request({
    url: '/adopt/orgs/org',
    method: 'post',
    data
  })
}

export function uptOrgInfo(data) {
  return request({
    url: '/adopt/orgs/org',
    method: 'put',
    data
  })
}

export function delOrg(data) {
  return request({
    url: '/adopt/orgs/org',
    method: 'delete',
    params: data
  })
}
