import axios from 'axios'
import qs from 'qs'
/**
 * 发送请求，并对返回的数据进行整型
 */
const serveUrl = ' http://*/tree.php'
class TreeNode {
  constructor (name) {
    this.name = name
    this.children = []
  }
}
export function fetchFamilyData (place, subName) {
  return axios.post(serveUrl, qs.stringify({
    Place: place,
    SubName: subName
  })).then(ret => {
    console.log(ret.data)
    // 返回都流 开头多了一个非法字符 fuck this chart！
    let data = ret.data.substring(1)
    data = JSON.parse(data).data
    // 构建父子关系表
    let fatherSonMap = {}
    data.forEach(item => {
      fatherSonMap[item['T_Name']] = item['T_Son'] && item['T_Son'].split('+')
    })
    // 先构建根节点
    let rootNodes = data.filter(item => item['T_Grade'] == '1').map(item => new TreeNode(item['T_Name']))
    // 构建子节点的方法
    function getChildrens (node) {
      // 找到儿子的名字
      let childernNames = fatherSonMap[node.name]
      // 构建儿子节点
      node.children = childernNames ? childernNames.map(name => new TreeNode(name)) : []
      // 递归
      node.children.forEach(cnode => {
        getChildrens(cnode)
      })
    }
    // 开始构建树
    rootNodes.forEach(node => getChildrens(node))
    return rootNodes
  })
}
