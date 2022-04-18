// import {getRequest} from "./api"
// import router from "@/router";
// import * as url from "url";
//
// export const initMenu = (router,store)=>{
//     if (store.state.routes.length>0){
//         return;
//     }
//
//     getRequest('').then(data=>{
//         if (data){
//             //格式化好之后的router
//             let  fmtRoutes = formatRoutes(data);
//             //添加到路由
//             router.addRoutes(fmtRoutes);
//
//             //将数据存入vuex
//             store.commit('initRoutes',fmtRoutes);
//         }
//     })
// }
//
// export const formatRoutes = (router)=>{
//     let fmtRoutes=[];
//     routes.forEach(router=>{
//         let{
//             path,
//             component,
//             name,
//             icon
//         }=router;
//         if (children&&children instanceof  Array){
//             //递归
//             children = formatRoutes(children);
//         }
//         let  fmtRouter={
//             path:path,
//             name:name,
//             icon:icon,
//             children:children,
//             component(resolve){
//                 require(['../views/'+component+'.'vue],resolve)
//             }
//         }
//         fmtRouter.push(fmtRouter)
//     });
//     return fmtRoutes;
// }