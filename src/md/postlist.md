### Latest Posts

<ul class="postlist-latest-wrapper">
  <li class="postlist-item" ng-repeat="post in vm.latest"><a ng-href="{{::post.path}}">{{::post.title}} [{{::post.date | date}}]</li>
</ul>

### Older Posts

<ul class="postlist-theRest-wrapper">
  <li class="postlist-item" ng-repeat="post in vm.theRest"><a ng-href="{{::post.path}}">{{::post.title}}, [{{::post.date | date}}]</li>
</ul>
