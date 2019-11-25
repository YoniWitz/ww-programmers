import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import Signup from '@/components/auth/Signup'


Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'gMap',
        component: GMap
    },
    {
        path: '/signup',
        name:'Signup',
        component:Signup
    }
]


const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router