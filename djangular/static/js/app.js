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
      var cookie, _i, _len, _ref;
      _ref = document.cookie.split(';');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cookie = _ref[_i];
        if (cookie && name === (cookie.trim().split('='))[0]) {
          return decodeURIComponent(cookie.trim().slice(1 + name.length));
        }
      }
      return null;
    };
    return $httpProvider.defaults.headers.common['X-CSRFToken'] = getCookie("csrftoken");
  });

}).call(this);
