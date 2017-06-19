import xhr from './xhr/vueResource'

/**
 * 对应后端涉及到用户认证的 API
 */

let baseService = {

  find: () => {
    return xhr({
      url: `&baidu.ting`
    })
  },
  search: (keycode, offset = 1) => {
    return xhr({
      url: `search?keywords=${keycode}`
    })
  },
  getMusic: (id) => {
    return xhr({
      url: `music/url?id=${id}`
    })
  },
  getMusicDetail: (id) => {
    return xhr({
      url: `song/detail?ids=${id}`
    })
  }

}

// 实例化后再导出
export default baseService
