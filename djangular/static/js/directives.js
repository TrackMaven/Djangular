(function() {
  var directives;

  directives = angular.module('pollApp.directives', []);

  directives.directive('choicePercentage', function() {
    return {
      restrict: 'A',
      scope: {
        votes: '=',
        total: '='
      },
      link: function(scope, element, attrs) {
        var update;
        update = function() {
          var percentage;
          if (scope.total > 0) {
            percentage = scope.votes / scope.total * 100;
          } else {
            percentage = 0;
          }
          return element.css('width', percentage + '%');
        };
        scope.$watch('total', function(value) {
          return update();
        });
        return scope.$watch('votes', function(value) {
          return update();
        });
      }
    };
  });

}).call(this);
