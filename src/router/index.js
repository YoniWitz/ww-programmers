import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'


Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'gMap',
        component: GMap
    }
]


const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router