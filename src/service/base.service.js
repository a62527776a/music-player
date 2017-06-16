import xhr from './xhr/vueResource'

/**
 * 对应后端涉及到用户认证的 API
 */

let baseService = {

  post: (className, body) => {
    return xhr({
      method: 'post',
      url: `/`,
      body: body
    })
  }

}

// 实例化后再导出
export default baseService
