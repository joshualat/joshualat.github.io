var jlslides = angular.module('jlslides', ['ngRoute', 'ngAnimate']);

jlslides.factory("$shared", [
  "$rootScope", "$location", function($rootScope, $location) {
    var build;
    $rootScope.$shared = {};
    build = function(message) {
      return "$shared:" + message;
    };
    return {
      goTo: function(url, apply) {
        if (apply == null) {
          apply = false;
        }
        $location.path(url);
        if (apply) {
          return $rootScope.$apply();
        }
      },
      emit: function(message, object) {
        $rootScope.$emit(build(message), object);
      },
      on: function(scope, message, callbackFxn) {
        var cleanUpFxn;
        cleanUpFxn = $rootScope.$on(build(message), callbackFxn);
        scope.$on("$destroy", function() {
          cleanUpFxn();
        });
      },
      set: function(key, value, apply) {
        if (apply == null) {
          apply = false;
        }
        $rootScope.$shared[key] = value;
        if (apply) {
          $rootScope.$apply();
        }
      },
      get: function(key) {
        return $rootScope.$shared[key];
      },
      watch: function(key, listener) {
        $rootScope.$watch("$shared." + key, function(newVal, oldVal) {
          if (!newVal) {
            return;
          }
          listener(newVal, oldVal);
        });
      }
    };
  }
]);

jlslides.service('JLSlides', function ($shared) {
  this.pages = [];
  this.keys = {};
  this.currentPage = 0;

  $shared.set('pages', this.pages);
  $shared.set('keys', this.keys);
  $shared.set('currentPage', this.currentPage);
  $shared.set('currentPageTitle', "");
  $shared.set('firstSlide', "enabled");
  $shared.set('lastSlide', "enabled");

  this.getCacheID = function (link, page) {
    var cacheID = link;

    if (page != undefined) {
      cacheID = link + "/p/" + page;
    }

    return cacheID;
  }

  this.setPage = function (link, page) {
    var cacheID = this.getCacheID(link, page);
    var pageNumber = this.keys[cacheID];

    this.setPageNumber(pageNumber);
  }

  this.setPageNumber = function (pageNumber) {
    $shared.set('currentPage', pageNumber);
    this.currentPage = pageNumber;

    $shared.set('currentPageTitle', this.pages[this.currentPage - 1].title);
    $shared.set('firstSlide', this.firstSlide());
    $shared.set('lastSlide', this.lastSlide());
  }

  this.setHomePage = function () {
    var homeTitle = $shared.get('title');
    $shared.set('currentPageTitle', homeTitle || "Home");
    $shared.set('currentPage', 0);
  }

  this.home = function (apply) {
    if (apply === undefined) apply = false;

    this.setHomePage();
    $shared.goTo("/", apply);
  }

  this.getPageNumber = function () {
    return $shared.get('currentPage');
  }

  this.updatePage = function (apply) {
    if (apply === undefined) apply = false;

    var currentPage = this.pages[this.getPageNumber() - 1];
    $shared.goTo(currentPage.getCacheID(), apply);
  }

  this.addSlide = function (link, title, page) {
    this.pages.push(new this.Slide(link, title, page));

    var cacheID = this.getCacheID(link, page);
    this.keys[cacheID] = this.pages.length;
  }

  this.back = function (apply) {
    if (apply === undefined) apply = false;

    var currentPageNumber = this.getPageNumber();

    if (currentPageNumber == 1) {
      this.home(apply);
      return;
    }

    if (currentPageNumber == 0) {
      return;
    }

    currentPageNumber -= 1;
    this.setPageNumber(currentPageNumber);
    this.updatePage(apply);
  }

  this.forward = function (apply) {
    if (apply === undefined) apply = false;

    var currentPageNumber = this.getPageNumber();

    if (currentPageNumber == this.pages.length) {
      this.home(apply);
      return;
    }

    currentPageNumber += 1;
    this.setPageNumber(currentPageNumber);
    this.updatePage(apply);
  }

  this.lastSlide = function () {
    if (this.getPageNumber() == this.pages.length) {
      return "disabled";
    } else {
      return "enabled";
    }
  }

  this.firstSlide = function () {
    if (this.getPageNumber() == 1) {
      return "disabled";
    } else {
      return "enabled";
    }
  }

  this.homeTemplate = function () {
    return  '<div class="slide home-slide">' +
              '<div class="home-links">' +
                '<a href="#{{ page.getCacheID() }}" ng-repeat="page in reorder($shared.pages)">' +
                  '<div class="slide-links">' +
                    '{{ page.title }}' + 
                  '</div>' +
                '</a>' +
                '<div class="clear"></div>' +
             '</div>' +
           '</div>';
  }

  this.Slide = (function() {
    function Slide(link, title, page) {
      this.link = link;
      this.title = title;
      this.page = page;

      this.hasSubPages = function () {
        if (this.page === undefined) {
          return false;
        } else {
          return true;
        }
      }

      this.getCacheID = function () {
        var cacheID = this.link;

        if (this.page != undefined) {
          cacheID = this.link + "/p/" + this.page;
        }

        return cacheID;
      }
    }

    return Slide;
  })();

})

jlslides.run(function($templateCache, JLSlides, $rootScope, $location) {
  var slides = document.getElementsByTagName("slide");

  while(slides.length > 0) {
    var slide = angular.element(slides[0]);
    var title = slide.attr('title');
    var link = slide.attr('link');
    var page = slide.attr('page');
    var cacheID = link;

    if (page != undefined) {
      cacheID = link + "/p/" + page;
    }

    JLSlides.addSlide(link, title, page);

    $templateCache.put(cacheID, '<div class="slide"><div class="content">' + slide.html() + '</div></div>');
    slide.remove();
  }

  $templateCache.put('jlslides.home', JLSlides.homeTemplate());

  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    if (next === undefined) {
      $location.path("/");
    } else {
      var cacheID = next.params.link;

      if (next.params.page !== undefined) {
        cacheID += "/p/" + next.params.page;
      }

      if (cacheID && !(cacheID in JLSlides.keys)) {
        $location.path("/");
      }
    }
  });
});

jlslides.config(function ($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "jlslides.home",
    controller: "HomeCtrl"
  })
  .when("/:link", {
    templateUrl: function(url){
      var link = url.link;
      
      return link;  
    },
    controller: "PageCtrl"
  })
  .when("/:link/p/:page", {
    templateUrl: function(url){
      return url.link + '/p/' + url.page;
    },
    controller: "PageCtrl"
  }).otherwise({
    redirectTo: '/'
  });
});

jlslides.controller("ButtonsCtrl", function ($scope, $shared, JLSlides) {
  this.back = function () {
    JLSlides.back();
  }

  this.forward = function () {
    JLSlides.forward();
  }
});

jlslides.controller("DirectionCtrl", function ($scope, JLSlides) {
  this.forward = function () {
    JLSlides.forward(true);
  }

  this.back = function () {
    JLSlides.back(true);
  }
});

jlslides.directive("slidenav", function () {
  return {
    restrict: "E",
    transclude: true,
    replace: true,
    controller: function($scope, $shared) {
      $scope.reorder = function(pages) {
        var orderedPages = [];

        var half = Math.ceil(pages.length / 2);

        for (var i = 0; i <= half - 1; i++) {
          orderedPages.push(pages[i]);

          if (i + half < pages.length) {
            orderedPages.push(pages[i + half]);
          }
        }

        return orderedPages;
      }

      this.updateHomePageTitle = function(title) {
        $shared.set('title', title)
      }
    },
    template: '<div class="slide-nav"><img id="jllogo" src="../shared/images/JL.png" width="40px" height="40px"/><slidetitle></slidetitle><slideforward></slideforward><slidenumber></slidenumber><slideback></slideback><div class="clear"></div></div>',
    link: function (scope, element, attr, ctrl, transclude) {
      ctrl.updateHomePageTitle(attr.title);
    }
  };
})

jlslides.directive("slidenumber", function () {
  return {
    restrict: "E",
    transclude: true,
    replace: true,
    template: '<div class="slide-number">{{ $shared.currentPage }}</div>'
  };
})

jlslides.directive("slidetitle", function () {
  return {
    restrict: "E",
    transclude: true,
    replace: true,
    template: '<a class="slide-title" href="#/">{{ $shared.currentPageTitle }}</a>'
  };
})

jlslides.directive("slideback", function () {
  return {
    restrict: "E", 
    transclude: true,
    replace: true,
    template: '<div class="arrow-left {{ $shared.firstSlide }}"></div>',
    controller: "DirectionCtrl",
    link: function (scope, element, attr, ctrl, transclude) {
      element.unbind('click').on('click', function() {
        ctrl.back();
      });
    }
  }
});

jlslides.directive("slideforward", function () {
  return {
    restrict: "E", 
    transclude: true,
    replace: true,
    template: '<div class="arrow-right {{ $shared.lastSlide }}"></div>',
    controller: "DirectionCtrl",
    link: function (scope, element, attr, ctrl, transclude) {
      element.unbind('click').on('click', function() {
        ctrl.forward();
      });
    }
  };
});

jlslides.directive("slidekeys", function () {
  var LEFT_KEY = 37;
  var RIGHT_KEY = 39;

  return {
    restrict: "A", 
    scope: {},
    controller: "DirectionCtrl",
    link: function (scope, element, attr, ctrl, transclude) {
      element.unbind('keydown').bind('keydown', function (event) {
        if (event.keyCode === LEFT_KEY) {
          ctrl.back();
        } else if (event.keyCode === RIGHT_KEY) {
          ctrl.forward();
        }
      });
    }
  };
});

jlslides.directive("slideprogress", function () {
  return {
    restrict: "E", 
    transclude: true,
    replace: true,
    template: '<div class="slide-progress"><span style="width: {{ $shared.currentPage * 100 / $shared.pages.length }}%"></span></div>'
  };
})

jlslides.controller("HomeCtrl", function ($scope, $routeParams, $shared, JLSlides) {
  JLSlides.setHomePage();
});

jlslides.controller("PageCtrl", function ($scope, $routeParams, $shared, JLSlides) {
  var link = $routeParams.link;
  var page = $routeParams.page;

  JLSlides.setPage(link, page);

  $scope.$on('$viewContentLoaded', function() {
    Prism.highlightAll();
  });
});

jlslides.directive('prism',['$interpolate', function ($interpolate) {
  "use strict";
  return {
    restrict: 'E',
    template: '<pre><code ng-transclude></code></pre>',
    replace:true,
    transclude:true
  };
}]);