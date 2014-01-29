from rest_framework import generics, permissions
from .models import Question, Choice
from .serializers import QuestionSerializer, ChoiceSerializer
from django.shortcuts import render


class QuestionList(generics.ListCreateAPIView):
    model = Question
    serializer_class = QuestionSerializer
    permission_classes = [
        permissions.AllowAny
    ]

class QuestionDetail(generics.RetrieveAPIView):
	model = Question
	serializer_class = QuestionSerializer
	lookup_url_kwarg = 'question_pk'
	permission_classes = [
		permissions.AllowAny
	]

class ChoiceUpdate(generics.UpdateAPIView):
	model = Choice
	serializer_class = ChoiceSerializer
	lookup_url_kwarg = 'choice_pk'
	permission_classes = [
		permissions.AllowAny
	]

class ChoiceList(generics.ListCreateAPIView):
    model = Choice
    serializer_class = ChoiceSerializer
    permission_classes = [
        permissions.AllowAny
    ]

def index(request):
    return render(request, 'polls/index.html')
