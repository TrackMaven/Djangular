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
        if document.cookie and document.cookie isnt ""
            cookies = document.cookie.split(";")
            i = 0
            while i < cookies.length
                cookie = jQuery.trim(cookies[i])
                # Does this cookie string begin with the name we want?
                if cookie.substring(0, name.length + 1) is (name + "=")
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                    break
                i++
        cookieValue
    # Add Header to comply with Django's CSRF implementation
    $httpProvider.defaults.headers.common['X-CSRFToken'] = getCookie("csrftoken")
)
