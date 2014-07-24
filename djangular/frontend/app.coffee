app = angular.module('pollApp', ['ui.router','pollApp.controllers', 
        'pollApp.services', 'pollApp.directives'])

app.config(($interpolateProvider, $stateProvider, $urlRouterProvider) ->
    #Play nice with django's template
    $interpolateProvider.startSymbol('[[')
    $interpolateProvider.endSymbol(']]')
    #Default to question list
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('questionList'
            url: '/'
            templateUrl: 'questionList'
            controller: 'questionListController'
            resolve:
                questions : (Questions)->
                    Questions.fetch()
                    return Questions.data()
        )
        .state('questionDetail'
            url: '/{questionId:[0-9]+}/'
            templateUrl: 'questionDetail'
            controller: 'questionDetailController'
            resolve:
                question : ($stateParams, $log, Question)->
                    question = new Question(null)
                    question.get($stateParams.questionId)
                    return question
        )
)


app.config(($httpProvider) ->
    getCookie = (name) ->
        for cookie in document.cookie.split ';' when cookie and name is (cookie.trim().split '=')[0]
            return decodeURIComponent cookie.trim()[(1 + name.length)...]
        null
    # Add Header to comply with Django's CSRF implementation
    $httpProvider.defaults.headers.common['X-CSRFToken'] = getCookie("csrftoken")
)
