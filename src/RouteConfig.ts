import Login from "./common/Login"
import HRSignUp from "./common/SignUp"
import SignUp from "./common/SignUp"
import CreateEmployee from "./pages/CreateEmployee"
import CreationPage from "./pages/CreationPage"
import EditEmployee from "./pages/EditEmployee"
import ViewPage from "./pages/ViewPage"

export const RouteConfig = [
    {path:'/register',component:HRSignUp,protected:false,role:"HR"},
    {path:'/login',component:Login,protected:false,role:"HR"},
    {path:'/hrinfo',component:CreationPage,protected:true,role:"HR"},
    {path:'/create',component:CreateEmployee,protected:true,role:"HR"},
    {path:'/edit/:id',component:EditEmployee,protected:true,role:"HR"},
    {path:'/emsinfo',component:ViewPage,protected:true,role:"EMP"},
]