import xhr from './xhr/vueResource'

/**
 * 对应后端涉及到用户认证的 API
 */

let baseService = {

  find: (body) => {
    return xhr({
      method: 'get',
      url: `&baidu.ting.${body}`
    })
  },
  search: (keycode, offset) => {
    return xhr({
      method: 'post',
      url: 'search/pc',
      body: {
        type: 1,
        limit: 10,
        offset: offset,
        s: keycode
      }
    })
  }

}

// 实例化后再导出
export default baseService
