app.directive("hexscroll", function ($window) {
  return function(scope, element, attrs) {
    angular.element($window).bind("scroll", function() {
      var offset = this.pageYOffset;

      if (offset < 0) {
        scope.data.hexHighlight = "";
      } else if (0 <= offset && offset < 500) {
        scope.data.hexHighlight = "one";
      } else if (500 <= offset && offset < 1300) {
        scope.data.hexHighlight = "two";
      } else if (1300 <= offset && offset < 2100) {
        scope.data.hexHighlight = "three";
      } else if (2100 <= offset && offset < 2900) {
        scope.data.hexHighlight = "four";
      } else {
        scope.data.hexHighlight = "";
      }

      scope.$apply();
    });
  };
});