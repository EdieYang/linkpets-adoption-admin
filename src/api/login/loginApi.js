import request from '@/plugin/axios'

export function Login (data) {
  return request({
    url: '/api?uri=/adopt/login',
    method: 'post',
    data
  })
}
