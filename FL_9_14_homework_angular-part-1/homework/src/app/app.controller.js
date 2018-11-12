angular.module('app')
.controller('AppCtrl', function AppCtrl(wallPosts, currentUserData){
    this.posts = wallPosts;
    this.currentUser = currentUserData;

    this.likeToggle = function (post) {
        if (post.isLiked) {
          post.isLiked = false;
          post.likes -= 1;
        } else {
          post.isLiked = true;
          post.likes += 1;
        }
      }

      this.editPost = function(post) {
        post.isEdited = true;
        this.currentPost = angular.copy(post);
      }

      this.saveEditedPost = function(post) {
        post.isEdited = false;
        this.currentPost = null;
      }

      this.cancelEditing = function(post) {
        post.isEdited = false;
        post.message = this.currentPost.message;
        post.title = this.currentPost.title;
      }

      this.addPost = function () {
        this.newPost = {
            userId: this.currentUser.id,
            userName: this.currentUser.name,
            photo: this.currentUser.photo,
            title: '',
            message: '',
            likes: 0
        };
      }

      this.savePost = function () {
        this.posts.push(this.newPost);
        this.newPost = null;
      }

    this.cancelNewPost = function () {
      this.newPost = null;
    }

})


