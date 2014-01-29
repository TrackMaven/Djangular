controllers = angular.module('pollApp.controllers', [])

controllers.controller('questionListController', ($scope, $state, $log, questions) ->
  $scope.questions = questions.all
)

controllers.controller('questionDetailController', ($scope, $state, $log, question) ->
  $scope.question = question
  $scope.voted = false
  $scope.voteChoice = 0

  $scope.vote = ->
    for choice in $scope.question.choices
        if choice.id == parseInt($scope.voteChoice)
            choice.votes+=1
            $scope.question.totalVotes+=1
            choice.update()
            break
    $scope.voted = true
)


