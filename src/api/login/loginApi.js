import request from '@/plugin/axios'

export function Login (data) {
  return request({
    url: '/api/adopt/login/login',
    method: 'post',
    data
  })
}
