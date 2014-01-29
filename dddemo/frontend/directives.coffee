directives = angular.module('pollApp.directives', [])

directives.directive('choicePercentage', ->
    restrict: 'A'
    link: (scope, element, attrs) ->
        update = ->
            votes = parseInt(attrs.votes)
            total = parseInt(attrs.total)
            if total > 0
                percentage = votes / total * 100
            else
                percentage = 0
            element.css('width', percentage + '%')

        scope.$watch attrs.total, (value) ->
            update()
        scope.$watch attrs.votes, (value) ->
            update()
        
)
