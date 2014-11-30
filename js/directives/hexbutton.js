app.directive("hexbutton" , function() {
  return {
    restrict: "E",
    transclude: true,
    replace: true,
    scope: false,
    ctrl: "HexCtrl",
    template: function (element, attr) {
      return '<button ng-transclude ' +
              'class="hexbutton ' + attr.category + '">' +
              '</button>';
    },
    link: function (scope, element, attr) {
      scope.$watch("data.hexHighlight", function() {
        if (attr.category === scope.data.hexHighlight) {
          element.addClass('enabled');
        } else {
          element.removeClass('enabled');
        }
      });

      element.unbind('click').on('click', function () {
        scope.updateColored(attr.category);
        scope.gotoAnchor(attr.category);
        scope.$apply();
      })
    }
  }
});