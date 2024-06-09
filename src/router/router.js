import {createRouter, createWebHashHistory} from 'vue-router'




import RandomVideo from "@/views/RandomVideo.vue";
import RandomVideoNoSe from "@/views/RandomVideoNoSe.vue";
import NewPhotoMain from "@/views/NewPhotoMainView.vue";
import NewVideoMain from "@/views/NewVideoMain.vue";
import NewPhotoShowView from "@/views/NewPhotoShowView.vue";
import NewVideoShowView from "@/views/NewVideoShowView.vue";
import TabsView from "@/views/TabView.vue";
const router = createRouter({
    history:createWebHashHistory(),
    routes: [
        // {
        //   path:'/video',
        //   component: videoMain,
        // },
        // {
        //     path:"/videoshow/:id",
        //     component:videoShow,
        //     props:true
        // },
        {
            path:"/rdm",
            component:RandomVideo,
        },
        // {
        //     path:"/random",
        //     component:RandomVideoNoSe,
        // },
        {
            path:'/',
            component:TabsView,
        },
        // {
        //     path:'/manager',
        //     component:Manager
        // },
        // {
        //     path: "/show/:id",
        //     component: PhotoShow,
        //     props:true
        // },
        // {
        //     //登陆
        //     path:"/login",
        //     component:loginView,
        // },
        // {
        //     //注册
        //     path:"/register",
        //     component:registerView,
        // },
        // {
        //     //找回密码
        //     path:"/retrievePassword",
        //     component:RetrievePasswordView
        // },
        // {
        //     path:"/logout",
        //     component:logoutView
        // },
        {
            path:"/photo",
            component:NewPhotoMain
        },
        {
            path:"/video",
            component:NewVideoMain
        },
        {
            path:"/photo/:id/:superId",
            component:NewPhotoShowView,
            props:true
        },
        {
            path:"/video/:id/:superId",
            component:NewVideoShowView,
            props:true
        }
    ]
})

 // router.beforeEach((to,from,next)=>{
 //     const token = localStorage.getItem("token");
 //     if(to.path === '/login' || to.path === '/register'|| to.path === '/retrievePassword'|| to.path === '/error' || to.path === '/rdm' || to.path === '/random'){
 //         next();
 //     }else{
 //         if(token == null || token === ''){
 //             next('/login');
 //         } else{
 //             next();
 //         }
 //     }
 // })
export default router
