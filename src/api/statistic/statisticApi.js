import request from '@/plugin/axios'

export function getOrgStatistic(orgId) {
    return request({
        url: '/adopt/statistic/' + orgId + '/data',
        method: 'get',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    })
}

export function getStatisticList() {
    return request({url: '/adopt/statistic/list', method: 'get'})
}
