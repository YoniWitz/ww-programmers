import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import firebase from 'firebase'
import ViewProfile from '@/components/profile/ViewProfile'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'GMap',
        component: GMap,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: '/signup',
        name:'Signup',
        component:Signup
    },
    {
        path: '/profile/:id',
        name: 'ViewProfile',
        component: ViewProfile,
        meta:{
            requiresAuth:true
        }
    },
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

router.beforeEach((to, from , next) => {
    if(to.matched.some(rec => rec.meta.requiresAuth)){
        let user = firebase.auth().currentUser;
        user? next() : next({name:'Login'})
    }
    else
        next()
})

export default router