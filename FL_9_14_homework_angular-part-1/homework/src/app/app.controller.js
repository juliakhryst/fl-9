// function AppCtrl (wallPosts) {
//     this.posts = wallPosts;
// }

// angular.module('app')
// .controller('AppCtrl', AppCtrl(wallPosts));

angular.module('app')
.controller('AppCtrl', function AppCtrl(wallPosts){
    this.posts = wallPosts;
})


