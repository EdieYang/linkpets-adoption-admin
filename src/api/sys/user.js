import request from '@/plugin/axios'

export function getUserPage(data) {
  return request({
    url: '/sys/user/page',
    method: 'get',
    params: data
  })
}
export function getUser(data) {
  return request({
    url: '/sys/user',
    method: 'get',
    params: data
  })
}
export function saveUser(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
export function uptUser(data) {
  return request({
    url: '/sys/user',
    method: 'put',
    data
  })
}
export function delUser(data) {
  return request({
    url: '/sys/user',
    method: 'delete',
    params: data
  })
}
export function delUsers(data) {
  return request({
    url: '/sys/user/batch',
    method: 'delete',
    params: data
  })
}
export function saveOrgUser(data) {
  return request({
    url: '/sys/user/orgUser',
    method: 'post',
    params: data
  })
}
export function delOrgUser(data) {
  return request({
    url: '/sys/user/orgUser',
    method: 'delete',
    params: data
  })
}
