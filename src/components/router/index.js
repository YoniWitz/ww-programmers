import Vue from 'vue'
import Router from 'router'
import GMap from '@/components/home/GMap'


Vue.use(Router)

export default new Router({
    routes:[
        {
           path:'/' ,
           name:'gMap',
           component:GMap
        }
    ]
})