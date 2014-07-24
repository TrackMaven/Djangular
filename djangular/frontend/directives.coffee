directives = angular.module('pollApp.directives', [])

directives.directive('choicePercentage', ->
    restrict: 'A'
    scope:
        votes: '='
        total: '='
    link: (scope, element, attrs) ->
        update = ->
            if scope.total > 0
                percentage = scope.votes / scope.total * 100
            else
                percentage = 0
            element.css('width', percentage + '%')

        scope.$watch 'total', (value) ->
            update()
        scope.$watch 'votes', (value) ->
            update()
        
)
