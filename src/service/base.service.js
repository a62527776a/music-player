import xhr from './xhr/vueResource'

/**
 * 对应后端涉及到用户认证的 API
 */

let baseService = {

  find: (method, body) => {
    return xhr({
      method: 'get',
      url: `&baidu.ting.${method}`
    })
  }

}

// 实例化后再导出
export default baseService
