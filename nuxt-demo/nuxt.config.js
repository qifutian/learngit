/**
 * Nuxt.js 配置文件 
 * 
 * 需要使用node.js中module规范
 *  
 */
module.export={
    router:{
        // // abc 成为默认路径
        // base:"/abc"
        extendRoutes(routes,resolve){
            routes.push({
                name:'/hello',
                path:'hello',
                component:resolve(__dirname,'pages/about.vue')
            })
        }
    }
}