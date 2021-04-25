import { createRouter, createWebHistory } from "vue-router";
import CoachDetail from '../Pages/coaches/CoachDetail.vue'
import CoachList from '../Pages/coaches/CoachList.vue'
import CoachRegister from '../Pages/coaches/CoachRegister.vue'
import ContactCoach from '../Pages/requests/ContactCoach.vue'
import RequestRecevied from '../Pages/requests/RequestRecevied.vue'
import Auth from '../Pages/Auth/Auth.vue'
import NotFound from '../Pages/NotFound.vue'
import store from '../store/index.js'

const routes = [
  {
    path:'/',
    redirect:'/coaches'
  },
  {
    path: "/coaches",
    component: CoachList,
  },
  {
    path: "/coaches/:id",
    component: CoachDetail,
    props:true,
    children: [
      {
        path: "contact",/*coachs/:id/contact*/
        component:ContactCoach
      } 
    ],
    
  },
  {
    path:'/requests',
    component:RequestRecevied,
    meta:{requiresAuth:true}
  },
  {
    path:'/register',
    component:CoachRegister,
    meta:{requiresAuth:true}
  },
  {
    path:'/auth',
    component:Auth,
    meta:{requiresUnauth:true}
  },
  {
    path:'/:notFound(.*)',
    component:NotFound
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(function(to,_,next){
  if(to.meta.requiresAuth && !store.getters.isLogged){
    next('/auth')
  }if(to.meta.requiresUnauth && store.getters.isLogged){
    next()
  }else{
    next()
  }
});

export default router;
