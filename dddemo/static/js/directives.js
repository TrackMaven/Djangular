(function() {
  var directives;

  directives = angular.module('pollApp.directives', []);

  directives.directive('choicePercentage', function($log) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var update;
        update = function() {
          var percentage, total, votes;
          votes = parseInt(attrs.votes);
          total = parseInt(attrs.total);
          $log.info(attrs);
          if (total > 0) {
            percentage = votes / total * 100;
          } else {
            percentage = 0;
          }
          return element.css('width', percentage + '%');
        };
        scope.$watch(attrs.total, function(value) {
          return update();
        });
        return scope.$watch(attrs.votes, function(value) {
          return update();
        });
      }
    };
  });

}).call(this);
