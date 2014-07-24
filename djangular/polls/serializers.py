from rest_framework import serializers

from .models import Question, Choice

class ChoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Choice
        fields = ('choice_text', 'id', 'votes')

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True)

    class Meta:
        model = Question
        fields = ('question_text', 'choices', 'id')

