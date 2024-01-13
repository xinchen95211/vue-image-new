import {createApp} from 'vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/display.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min'
import ElementPlus, {ElMessage} from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import 'vue3-video-play/dist/style.css'
import VueUuid from 'vue-uuid'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import IndexDB from "@/utils/indexDB";
import '@/style/LoginCSS.css'
import axios from "axios";
import router from './router/router.js'
import localforage from 'localforage';

localforage.config({
    name:'virgo',
    version: 1 ,
    storeName:'superVirgo'
});






let elementApp = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    elementApp.component(key, component)
}
elementApp.config.globalProperties.$localforage = localforage;

//域名
elementApp.config.globalProperties.$domainUrl = "https://vernelproxy.dynv6.net/proxy/frp-hat.top:49728";
// elementApp.config.globalProperties.$domainUrl = "http://localhost:9999"

elementApp.config.globalProperties.$isIndexDbSupport = typeof window.indexedDB !== 'undefined';
elementApp.config.globalProperties.$isLocalStoragebSupport = typeof window.localStorage !== 'undefined';

elementApp.config.globalProperties.$setValue = (key,value) => {setValue(key,value)}
elementApp.config.globalProperties.$getValue = (key) => {return getValue(key)}
function setValue(key,value) {
    localforage.setItem(key, value);
}
function getValue(key) {
  return localforage.getItem(key)
}



// 请求拦截器
axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem("token")
    config.headers['uuid'] = localStorage.getItem("uuid")
    return config
}, function (error) {
    router.push('/error');
    return Promise.reject(error)
})

axios.interceptors.response.use(function(response){
        if (response.data){
            switch (response.data.code){
                case 6000 : {this.$localStrong.setItem("token",response.data.data);break}
                case 4001 : {
                    ElMessage.error(response.data.message);
                    this.$localStrong.removeItem("token");
                    setTimeout(() => {
                            location.replace("/#/login");
                            }, 20000)
                    break;
                }
                case 4004 : {this.$router.push('/error');break}
                case 4003 : case 4012 : case 4013 : case 4006:{
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




elementApp
    .use(VueUuid)
    .use(IndexDB)
    .use(router)
    .use(ElementPlus)
    .mount('#app');
