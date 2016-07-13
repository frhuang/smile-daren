export default function(router) {
    router.map({
        '/': {
            name: 'home',
            component: require('./views/Home.vue')
        },
        '/signup': {
            name: 'signup',
            component(resolve){ require(['./views/SignUp.vue'], resolve) }
        },
        '/share': {
            name: 'share',
            component(resolve){ require(['./views/Share.vue'], resolve) }
        },
        '/rank': {
            name: 'rank',
            component(resolve){ require(['./views/Rank.vue'], resolve) }
        }
    });

    //window.routeList = [];
    //router.beforeEach(function(transition) {
    //    window.scrollTo(0, 0);
    //    router.app.effect='next';//前进
    //    routeList.push({
    //        name : transition.to.name,
    //        path : transition.to.path,
    //        query : transition.to.query,
    //        params : transition.to.params,
    //        timer: +new Date
    //    });
    //    transition.next();
    //
    //})

}