import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Pending from './views/nav1/Pending.vue'
import PendingDetail from './views/nav1/PendingDetail.vue'
import Table from './views/nav1/Table.vue'
import TableDetail from './views/nav1/TableDetail.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import UserSet from './views/UserSet.vue'//用户设置
import UserEdite from './views/nav2/UserEdite.vue'//用户设置
import Page4 from './views/nav2/Page4.vue'
import UserList from './views/nav2/UserList.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/register',
        component: Register,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        name:'设置',
        component: Home,
        children: [
            {
                path:'/reset',
                component: UserSet,
                name: '用户设置' ,
                hidden: true,
            }
        ],
        hidden: true
         
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '项目管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            {
                path: '/pending',
                component: Pending,
                name: '待审核列表',
                children:[
                    {path: '/PendingDetail', component: PendingDetail, name: '待审核详情'}
                ]
            },
            {
                path: '/table',
                component: Table,
                name: '项目列表',
                children:[
                    {path: '/tableDetail', component: TableDetail, name: '项目详情'}
                ]
            },
            /*{ path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },*/
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            /*{ path: '/page4', component: Page4, name: '页面4' },*/
            { path: '/UserList', component: UserList, name: '用户列表' },
            { path: '/UserEdite', component: UserEdite, name: '用户详情',hidden: true },
        ]
    },
    /*
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
   {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }*/
];

export default routes;