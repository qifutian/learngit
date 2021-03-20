<template>
    <div>
        <h1>About page</h1>
        <!-- a链接实现，刷新导航，走服务端渲染 -->
        <a href="/">首页</a>
        <!-- router-link 导航链接组件 -->
        <router-link to="/">首页</router-link>

        <!-- 编程式导航 -->
        <button @click="onClick">首页</button>
    </div>
</template>
<script>
export default {
    name: "AboutPage",
    methods:{
        onClick(){
            this.$router.push('/')
        }
    }
}
</script>