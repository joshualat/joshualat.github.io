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
      } else if (2100 <= offset) {
        scope.data.hexHighlight = "four";
      }

      scope.$apply();
    });
  };
});