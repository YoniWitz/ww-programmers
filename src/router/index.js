import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'


Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'GMap',
        component: GMap
    },
    {
        path: '/signup',
        name:'Signup',
        component:Signup
    }
    ,
    {
        path: '/login',
        name:'Login',
        component:Login
    }
]


const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router