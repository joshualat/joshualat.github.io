app.directive("hexgrid", function() {
  function renderTiles(scope, el, attr) {
    if (attr.filter.length != 0) return;

    var hexChildren = el.children('hex');
    var highlightedCategories = attr.colored.split(" ");
    var skipEvery = parseInt(attr.skip);
    var even = true;
    var incompleteRowCount = hexChildren.length % skipEvery;

    for (var i = 0; i < hexChildren.length; i += 1) {
      var hexChild = angular.element(hexChildren[i]);
      var childCategory = hexChild.attr('category');

      hexChild.unbind('click').on('click', function () {
        targetChild = angular.element(this);
        attr.$set('colored', targetChild.attr('category'));

        scope.updateColored(targetChild.attr('category'));
        scope.gotoAnchor(targetChild.attr('category'));
        scope.$apply();
      });

      if (highlightedCategories.indexOf(childCategory) != -1) {
        hexChild.addClass(childCategory);
      } else {
        hexChild.removeClass(childCategory);
      }

      if (i % skipEvery == 0) {
        if (even == true) {
          hexChild.addClass('hex-even-start');
        } else {
          hexChild.addClass('hex-odd-start');
        }

      even = !even;
      }
    }

    for (var i = hexChildren.length - incompleteRowCount; i < hexChildren.length; i ++) {
      var hexChild = angular.element(hexChildren[i]);
      if (hexChild.hasClass('clear')) {
        hexChild.removeClass('hide');
      } else {
        hexChild.addClass('hide');  
      }
    }
  }

  function filterTiles (scope, el, attr) {
    if (attr.filter.length == 0) {
      renderTiles(scope, el, attr);

      return;
    }

    var hexChildren = el.children('hex');

    for (var i = 0; i < hexChildren.length; i += 1) {
      var hexChild = angular.element(hexChildren[i]);
      var childCategory = hexChild.attr('category');

      hexChild.unbind('click');
      if (!hexChild.hasClass('clear')) {
        var text = hexChild.find('span').html().toLowerCase();

        if (text.indexOf(attr.filter.toLowerCase()) != -1) {
          hexChild.addClass(childCategory);
        } else {
          hexChild.removeClass(childCategory);
        }

        hexChild.on('click', function () {
          targetChild = angular.element(this);
          scope.gotoAnchor(targetChild.attr('category'));
        });
      }
    }
  }

  return {
    restrict: "E", 
    transclude: true,
    replace: true,
    scope: false,
    controller: "HexCtrl",
    template: '<div class="hexgrid" ng-transclude></div>',
    link: function (scope, el, attr, ctrl, transclude) {
      attr.$observe('colored', function (newVal, oldVal) { renderTiles(scope, el, attr); });
      attr.$observe('filter', function (newVal, oldVal) { filterTiles(scope, el, attr); });    

      var watch = scope.$watch(function() {
        return el.children().length;
      }, function() {
        scope.$evalAsync(function() {
          renderTiles(scope, el, attr);
        });
      });
    }
  }
});