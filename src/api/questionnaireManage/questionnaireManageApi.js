import request from '@/plugin/axios'

/**
 * 分页查询问卷列表
 * @param data
 */
export function questionnaireList(data) {
  return request({
    url: '/adopt/questionnaire/page',
    method: 'get',
    params: data
  })
}

/**
 * 创建问卷
 * @param data
 */
export function questionnaireNew(data) {
  return request({
    url: '/adopt/questionnaire',
    method: 'post',
    data
  })
}

/**
 * 更新问卷
 * @param data
 */
export function questionnaireEdit(data) {
  return request({
    url: '/adopt/questionnaire',
    method: 'put',
    data
  })
}

/**
 * 查询问卷详情
 * @param data
 */
export function questionnaireDetail(data) {
  return request({
    url: '/adopt/questionnaire',
    method: 'get',
    params: data
  })
}

/**
 * 删除问卷
 * @param data
 */
export function questionnaireDelete(data) {
  return request({
    url: '/adopt/questionnaire',
    method: 'delete',
    params: data
  })
}

/**
 * 查询问卷列表
 * @param data
 */
export function questionnaireListAll(data) {
  return request({
    url: '/adopt/questionnaire/list',
    method: 'get',
    params: data
  })
}
