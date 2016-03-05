export default PostListController;

PostListController.$inject = ["posts"];

function PostListController(posts) {
  const vm = this;
  console.log("Controller Init", posts);

  vm.latest = posts.slice(0, 5);
  vm.theRest = posts.length > 5 ? post.slice(5) : [];
}
