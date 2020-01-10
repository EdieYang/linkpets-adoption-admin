import request from '@/plugin/axios'


/**
 * 分页获取用户列表
 * @param data
 */
export function userPage(data) {
    return request({url: '/users/page', method: 'get', params: data})
}

/**
 * 获取用户详情
 * @param data
 */
export function userDetail(data) {
    return request({url: '/users/user', method: 'get', params: data})
}

/**
 * 添加用户积分:返回0表示积分已添加或已超过上限，前端不显示积分提示
 * @param data
 */
export function addUserPointStatement(data) {
    return request({url: '/pointStatement', method: 'post', params: data})
}

/**
 * 添加用户系统备注
 * @param data
 */
export function updateUserMemo(data) {
    return request({url: '/users/user/memo', method: 'put', params: data})
}
