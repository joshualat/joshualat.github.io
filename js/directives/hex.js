app.directive("hex", function () {
  return {
    restrict: "E", 
    transclude: true,
    replace: true,
    scope: false,
    template: '<div class="hex">' + 
              '<div class="top"></div>' +
              '<div class="middle"><div class="hex-content" ng-transclude></div></div>' + 
              '<div class="bottom"></div>' + 
              '</div>',
    link: function (scope, element, attr, ctrl, transclude) {
      element.on('mouseenter', function() {
        element.addClass(attr.category + '-hover');
      });

      element.on('mouseleave', function() {
        element.removeClass(attr.category + '-hover');
      });
    }
  }
});