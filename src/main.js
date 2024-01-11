import { createApp } from 'vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/display.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min'
import ElementPlus, {ElMessage} from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import 'vue3-video-play/dist/style.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import VueUuid from 'vue-uuid'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import IndexDB from "@/utils/indexDB";
import '@/style/LoginCSS.css'
import axios from "axios";
import {createRouter, createWebHistory} from "vue-router";



let elementApp = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    elementApp.component(key, component)
}



// 请求拦截器
axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem("token")
    config.headers['Uuid'] = localStorage.getItem("uuid")
    return config
}, function (error) {
    router.push('/error');
    return Promise.reject(error)
})

axios.interceptors.response.use(function(response){
        if (response.data){
            switch (response.data.code){
                case 6000 : {localStorage.setItem("token",response.data.data);break}
                case 4001 : {
                    ElMessage.error(response.data.message);
                    localStorage.removeItem("token");
                    window.reload('/login');
                    break;
                }
                case 4004 : {this.$router.push('/error');break}
                case 4003 : case 4012 : case 4013 :{
                    ElMessage.error(response.data.message);
                    break
                }
                case 2001 : {
                    ElMessage.success(response.data.message);
                    break
                }
                default:
                    break;
            }
        }
        return response
    },function (error){
        ElMessage.error("与服务器链接发生了点错误,请稍后再试")
        return Promise.reject(error)
    }
)


const router = createRouter({
    history:createWebHistory('/'),
    routes: [
        {
            path:"/videoshow/:id",
            component:import("./views/VideoShow.vue"),
            props:true
        },
        {
            path:"/video",
            component:import("./views/VideoMain.vue")
        },
        {
            path:'/',
            component:import("./views/PhotoMain.vue")
        },
        {
            path: "/show/:id",
            component: import("./views/PhotoShow.vue"),
            props:true
        },
        {
            path:"/login",
            component:import("./views/LoginView.vue"),
        },
        {
            path:"/register",
            component:import("./views/RegisterView.vue")
        },
        {
            path:"/retrievePassword",
            component:import("./views/RetrievePasswordView.vue")
        },
        {
            path:"/error",
            component:import("./components/ErrorComponents.vue")
        },
        {
            path:"/logout",
            component:import("./views/LogoutView.vue")
        }
    ]
})

router.beforeEach((to,from,next)=>{
    const token = localStorage.getItem("token");
    if(to.path === '/login' || to.path === '/register'|| to.path === '/retrievePassword'|| to.path === '/error'){
        next();
    }else{
        if(token == null || token === ''){
            next('/login');
        } else{
            next();
        }
    }
})



elementApp
    .use(VueUuid)
    .use(IndexDB)
    .use(router)
    .use(ElementPlus)
    .mount('#app');
