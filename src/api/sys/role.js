import request from '@/plugin/axios'

export function getRolePage(data) {
  return request({
    url: '/sys/role/page',
    method: 'get',
    params: data
  })
}
export function getRole(data) {
  return request({
    url: '/sys/role',
    method: 'get',
    params: data
  })
}
export function getRoleByRoleCode(data) {
  return request({
    url: '/sys/role/roleCode',
    method: 'get',
    params: data
  })
}
export function saveRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
export function uptRole(data) {
  return request({
    url: '/sys/role',
    method: 'put',
    data
  })
}
export function delRole(data) {
  return request({
    url: '/sys/role',
    method: 'delete',
    params: data
  })
}
export function delRoles(data) {
  return request({
    url: '/sys/role/batch',
    method: 'delete',
    params: data
  })
}
export function getRolePagByUserId(data) {
  return request({
    url: '/sys/role/userRole/page',
    method: 'get',
    params: data
  })
}
export function getUserPageByRoleId(data) {
  return request({
    url: '/sys/role/user/page',
    method: 'get',
    params: data
  })
}
export function crtUserRole(data) {
  return request({
    url: '/sys/role/user',
    method: 'post',
    params: data
  })
}
export function delUserRole(data) {
  return request({
    url: '/sys/role/user',
    method: 'delete',
    params: data
  })
}
export function saveRoleMenus(data) {
  return request({
    url: '/sys/role/menu',
    method: 'post',
    params: data
  })
}
