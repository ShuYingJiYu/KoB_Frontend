import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  //1.先默认加载所有的routes
  //加载文件夹
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    routes.push(route.default)
    console.log(route)
  })

  return routes
}
