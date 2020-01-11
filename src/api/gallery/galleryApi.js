import request from '@/plugin/axios'

export function listGallery(data) {
  return request({
    url: '/adopt/orgs/gallery',
    method: 'get',
    params: data
  })
}

export function postGallery(data) {
  return request({
    url: '/adopt/orgs/gallery',
    method: 'post',
    data
  })
}

export function uptGallery(data) {
  return request({
    url: '/adopt/orgs/gallery',
    method: 'delete',
    data
  })
}
