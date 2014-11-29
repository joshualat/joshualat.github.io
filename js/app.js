var app = angular.module('jlwebsite', []);

app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

app.controller("HexCtrl", function($scope) {
  $scope.data = $scope.data || {}
  $scope.data.hexHighlight = "one";

  var messageHash = {};
  messageHash["one"] = "As a BACK-END DEVELOPER, I can lead projects from start to finish. I can design, build, and maintain complete web and mobile application stacks. In the past, I've built and maintained E-commerce projects with Rails, Sinatra, PostgreSQL, Redis, and MongoDB. I've also used Python and Django in some of my projects as well.<br /><br />During my free time, I contribute to the society by sharing my knowledge in conferences and meetups. Sometimes I try out new web technologies on pet projects (hint: this site uses AngularJS)";
  messageHash["two"] = "As a FRONT-END DEVELOPER, I can build dynamic user interfaces using JavaScript libraries and frameworks such as CoffeeScript, jQuery, Backbone.js, and AngularJS. In the past, I've built and maintained E-commerce projects with Bootstrap, HAML, SASS, CoffeeScript, AngularJS, and Backbone.js.<br /><br />During my free time, I contribute to the society by sharing my knowledge in conferences and meetups. Sometimes I try out new web technologies on pet projects (hint: this site uses AngularJS)";
  messageHash["three"] = "As an SOLUTIONS ARCHITECT, I'm capable of designing and preparing a secure setup on Amazon Web Services. <br /><br />In the past, I've helped my team troubleshoot application and infrastructure problems such as those concerned with security, scaling, automation, and high-availability. I had the opportunity before to set up and maintain different databases such as PostgreSQL, MongoDB, and Redis on several E-commerce projects.";
  messageHash["four"] = "As a SCRUM MASTER, I serve as a servant leader to make the Scrum team more focused and productive. I facilitate meetings, manage the documents and timelines, and help teams detect and remove blockers as early in the development cycle as possible.<br /><br />In the past, I've helped several teams finish E-commerce projects on time by tweaking existing processes and aggressively monitoring the work hours and productivity of each developer.<br /><br />During my free time, I contribute to the society by sharing my knowledge in conferences and meetups.";

  $scope.data.currentMessage = messageHash[$scope.data.hexHighlight];

  $scope.updateColored = function(category) {
    $scope.data.hexHighlight = category;
    $scope.data.currentMessage = messageHash[$scope.data.hexHighlight];
  }

  var shuffleArray = function(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  var allSkills = [
    { name: 'Ruby', category: 'one' },
    { name: 'Rails', category: 'one' },
    { name: 'Mongoid', category: 'one' },
    { name: 'PayPal Integration', category: 'one' },
    { name: 'Ohm', category: 'one' },
    { name: 'E-commerce', category: 'one' },
    { name: 'ActiveRecord', category: 'one' },
    { name: 'TDD', category: 'one' },
    { name: 'Rspec', category: 'one' },
    { name: 'Sinatra', category: 'one' },
    { name: 'Cuba', category: 'one' },
    { name: 'Sidekiq', category: 'one' },
    { name: 'Python', category: 'one' },
    { name: 'Django', category: 'one' },
    { name: 'PHP', category: 'one' },
    { name: 'CakePHP', category: 'one' },
    { name: 'CodeIgniter', category: 'one' },
    { name: 'Perl', category: 'one' },
    { name: 'Java', category: 'one' },
    { name: 'Bash', category: 'one' },
    { name: 'Git', category: 'one' },
    { name: 'Facebook API', category: 'one' },
    { name: 'Twitter API', category: 'one' },
    { name: 'Google API', category: 'one' },
    { name: 'Mercurial', category: 'one' },
    { name: 'Backbone.js', category: 'two' },
    { name: 'Bower', category: 'two' },
    { name: 'AngularJS', category: 'two' },
    { name: 'CoffeeScript', category: 'two' },
    { name: 'JavaScript', category: 'two' },
    { name: 'Underscore.js', category: 'two' },
    { name: 'jQuery', category: 'two' },
    { name: 'Bootstrap', category: 'two' },
    { name: 'CSS', category: 'two' },
    { name: 'SASS', category: 'two' },
    { name: 'Google Analytics', category: 'two' },
    { name: 'Facebook Analytics', category: 'two' },
    { name: 'MongoDB', category: 'three' },
    { name: 'Redis', category: 'three' },
    { name: 'PostgreSQL', category: 'three' },
    { name: 'AWS', category: 'three' },
    { name: 'AWS VPC', category: 'three' },
    { name: 'Linux', category: 'three' },
    { name: 'Unix Shell Scripting', category: 'three' },
    { name: 'High Availability', category: 'three' },
    { name: 'Scaling', category: 'three' },
    { name: 'Infrastructure', category: 'three' },
    { name: 'Security', category: 'three' },
    { name: 'Disaster Recovery', category: 'three' },
    { name: 'DevOps', category: 'three' },
    { name: 'Ubuntu', category: 'three' },
    { name: 'VirtualBox', category: 'three' },
    { name: 'Ansible', category: 'three' },
    { name: 'Public Speaking', category: 'four' },
    { name: 'Scrum', category: 'four' },
    { name: 'Scrum Master', category: 'four' },
    { name: 'Agile Methologies', category: 'four' },
    { name: 'Project Management', category: 'four' },
    { name: 'Training', category: 'four' },
    { name: 'Workshops', category: 'four' },
    { name: 'Mentoring', category: 'four' },
    { name: 'Research', category: 'four' },
    { name: 'Planning', category: 'four' },
    { name: 'iOS Development', category: 'four' },
    { name: 'XCode', category: 'four' },
    { name: 'Cocoa', category: 'four' }
  ];

  $scope.skills = shuffleArray(allSkills.concat(allSkills));
});

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
      var text = hexChild.find('span').html().toLowerCase();

      if (text.indexOf(attr.filter.toLowerCase()) != -1) {
        hexChild.addClass(childCategory);
      } else {
        hexChild.removeClass(childCategory);
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
              'class="' + attr.category + '"' +
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