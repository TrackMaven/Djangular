(function() {
  var controllers;

  controllers = angular.module('pollApp.controllers', []);

  controllers.controller('questionListController', function($scope, $state, $log, questions) {
    return $scope.questions = questions.all;
  });

  controllers.controller('questionDetailController', function($scope, $state, $log, question) {
    $scope.question = question;
    $scope.voted = false;
    $scope.voteChoice = 0;
    return $scope.vote = function() {
      var choice, _i, _len, _ref;
      _ref = $scope.question.choices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        choice = _ref[_i];
        if (choice.id === parseInt($scope.voteChoice)) {
          choice.votes += 1;
          $scope.question.totalVotes += 1;
          choice.update();
          break;
        }
      }
      return $scope.voted = true;
    };
  });

}).call(this);
