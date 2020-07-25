import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import('./page/index.vue');
const Home = () => import('./page/home.vue');
const SiteMap = () => import('./page/siteMap.vue');
const BlogDetail = () => import('./page/blogDetail.vue');
const About = () => import('./page/about.vue');
const GuestBook = () => import('./page/guestbook.vue');
const EditBlog = () => import('./page/editBlog.vue');
const EditEveryday = () => import('./page/editEveryday.vue');

Vue.use(VueRouter);
// 解决点击同一个路由控制台报错问题
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
};

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
            redirect: '/home',
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: Home
                },
                {
                    path: 'about',
                    name: 'about',
                    component: About
                },
                {
                    path: 'guestbook',
                    name: 'guestbook',
                    component: GuestBook
                },
                {
                    path: 'blog',
                    name: 'blogDetail',
                    component: BlogDetail
                },
            ]
        },
        {
            path: '/sitemap',
            name: 'siteMap',
            component: SiteMap
        },
        {
            path: '/editBlog',
            name: 'editBlog',
            component: EditBlog
        },
        {
            path: '/editEveryday',
            name: 'editEveryday',
            component: EditEveryday
        }
    ]

})
