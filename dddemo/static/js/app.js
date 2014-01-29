(function() {
  var app;

  app = angular.module('pollApp', ['ui.router', 'pollApp.controllers', 'pollApp.services', 'pollApp.directives']);

  app.config(function($interpolateProvider, $stateProvider, $urlRouterProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
    $urlRouterProvider.otherwise('/');
    return $stateProvider.state('questionList', {
      url: '/',
      templateUrl: 'questionList',
      controller: 'questionListController',
      resolve: {
        questions: function(Questions) {
          Questions.fetch();
          return Questions.data();
        }
      }
    }).state('questionDetail', {
      url: '/{questionId:[0-9]+}/',
      templateUrl: 'questionDetail',
      controller: 'questionDetailController',
      resolve: {
        question: function($stateParams, $log, Question) {
          var question;
          question = new Question(null);
          question.get($stateParams.questionId);
          return question;
        }
      }
    });
  });

  app.config(function($httpProvider) {
    var getCookie;
    getCookie = function(name) {
      var cookie, cookieValue, cookies, i;
      if (document.cookie && document.cookie !== "") {
        cookies = document.cookie.split(";");
        i = 0;
        while (i < cookies.length) {
          cookie = jQuery.trim(cookies[i]);
          if (cookie.substring(0, name.length + 1) === (name + "=")) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
          i++;
        }
      }
      return cookieValue;
    };
    return $httpProvider.defaults.headers.common['X-CSRFToken'] = getCookie("csrftoken");
  });

}).call(this);
