(function() {
  var services;

  services = angular.module('pollApp.services', []);

  services.factory('Choice', function($http, $log) {
    var Choice;
    Choice = (function() {
      function Choice(data) {
        this.choice_text = data.choice_text;
        this.id = data.id;
        this.votes = data.votes;
      }

      Choice.prototype.update = function() {
        var data,
          _this = this;
        data = {
          'votes': this.votes,
          'choice_text': this.choice_text
        };
        return $http({
          method: 'PUT',
          url: '/polls/choices/' + this.id + '/',
          data: data
        }).success(function(data) {
          return $log.info("Succesfully voted");
        }).error(function(data) {
          return $log.info("Failed to vote.");
        });
      };

      return Choice;

    })();
    return Choice;
  });

  services.factory('Question', function(Choice, $http, $log) {
    var Question;
    Question = (function() {
      function Question(data) {
        if (data !== null) {
          this.init(data);
        }
      }

      Question.prototype.init = function(data) {
        var c, choice, _i, _len, _ref, _results;
        this.question_text = data.question_text;
        this.id = data.id;
        this.choices = [];
        this.totalVotes = 0;
        _ref = data.choices;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          choice = _ref[_i];
          c = new Choice(choice);
          this.totalVotes += c.votes;
          _results.push(this.choices.push(new Choice(choice)));
        }
        return _results;
      };

      Question.prototype.get = function(questionId) {
        var _this = this;
        return $http({
          method: 'GET',
          url: '/polls/questions/' + questionId + '/'
        }).success(function(data) {
          _this.init(data);
          return $log.info("Succesfully fetched question");
        }).error(function(data) {
          return $log.info("Failed to fetch question.");
        });
      };

      return Question;

    })();
    return Question;
  });

  services.factory('Questions', function($q, $log, $http, Question) {
    var questions;
    questions = {
      all: []
    };
    return {
      fromServer: function(data) {
        var question, _i, _len, _results;
        questions['all'].length = 0;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          question = data[_i];
          _results.push(questions['all'].push(new Question(question)));
        }
        return _results;
      },
      fetch: function() {
        var deferred,
          _this = this;
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: '/polls/questions'
        }).success(function(data) {
          _this.fromServer(data);
          $log.info("Succesfully fetched questions.");
          return deferred.resolve(data);
        }).error(function(data) {
          $log.info("Failed to fetch questions.");
          return deferred.reject(data);
        });
        return deferred.promise;
      },
      data: function() {
        return questions;
      }
    };
  });

}).call(this);
