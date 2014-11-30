app.controller("HexCtrl", function($scope, anchorSmoothScroll, messages, skills, utils) {
  $scope.gotoAnchor = function(category) {
    var menuAnchor = 'menu-' + category
    anchorSmoothScroll.scrollTo(menuAnchor, 30);
  };

  $scope.data = $scope.data || {}
  $scope.data.hexHighlight = "one";

  $scope.data.messageArray = messages.messageArray;

  $scope.updateColored = function(category) {
    $scope.data.hexHighlight = category;
  }

  $scope.skills = utils.shuffleArray(skills.allSkills(3));
});