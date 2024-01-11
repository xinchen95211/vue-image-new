import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history:createWebHistory(),
    mode:'hash',
    routes: [
        {
            path:"/videoshow/:id",
            component:import("@/views/VideoShow.vue"),
            props:true
        },
        {
            path:"/video",
            component:import("@/views/VideoMain.vue")
        },
        {
            path:'/',
            component:import("@/views/PhotoMain.vue")
        },
        {
            path: "/show/:id",
            component: import("@/views/PhotoShow.vue"),
            props:true
        },
        {
            path:"/login",
            component:import("@/views/LoginView.vue"),
        },
        {
            path:"/register",
            component:import("@/views/RegisterView.vue")
        },
        {
            path:"/retrievePassword",
            component:import("@/views/RetrievePasswordView.vue")
        },
        {
            path:"/error",
            component:import("@/components/ErrorComponents.vue")
        },
        {
            path:"/logout",
            component:import("@/views/LogoutView.vue")
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

export default router
