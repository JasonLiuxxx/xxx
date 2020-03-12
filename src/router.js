import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const routes = [
    // {
    //     path: '/',
    //     redirect: '/index',
    // },
    {
        path: '/',
        component: () => import('@/views/index'),
        name: 'index',
        meta:{
            title:'首页'
        },
        redirect: '/publish',
        children: [
            {
                path: 'article',
                component: () => import('@/views/article'),
                name: 'article',
                meta:{
                    title:'内容列表'
                }
            },
            {
                path: 'publish',
                component: () => import('@/views/publish'),
                name: 'publish',
                meta:{
                    title:'发布文章'
                }
            },
            {
                path: 'media',
                component: () => import('@/views/media'),
                name: 'media',
                meta:{
                    title:'素材管理'
                }
            },
            {
                path: 'overview',
                component: () => import('@/views/overview'),
                name: 'overview'
            },
            {
                path: 'account',
                component: () => import('@/views/account'),
                name: 'account'
            },
            {
                path: 'map',
                component: () => import('@/views/map'),
                name: 'map'
            },
            {
                path: 'map1',
                component: () => import('@/views/map1'),
                name: 'map1'
            },
            {
                path: 'test',
                component: () => import('@/views/test'),
                name: 'test'
            },{
                path: 'test1',
                component: () => import('@/views/test1'),
                name: 'test1'
            },
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login'),
        name: 'login',
        meta:{
            title:'登录'
        }
    }
]

const router = new VueRouter({
    // mode:'history',
    routes
})

export default router