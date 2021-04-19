import { createRouter, createWebHistory } from "vue-router";
import CoachDetail from '../Pages/coaches/CoachDetail.vue'
import CoachList from '../Pages/coaches/CoachList.vue'
import CoachRegister from '../Pages/coaches/CoachRegister.vue'
import ContactCoach from '../Pages/requests/ContactCoach.vue'
import RequestRecevied from '../Pages/requests/RequestRecevied.vue'
import NotFound from '../Pages/NotFound.vue'

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
    component:RequestRecevied
  },
  {
    path:'/register',
    component:CoachRegister
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

export default router;
