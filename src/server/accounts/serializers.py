# Add serializers in this file.
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

User._meta.get_field('email')._unique = True


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')

class LoginSerializer(serializers.Serializer):
    """
    Author: Albert Ferguson
    Idea: Return the user model by deserializing the account details and\
        attempting to authenticate against Django's auth framework with them.
    Returns: The user model if authenticated. Else, a validation error\
        is raised via the serializer.
    """

    def validate(self, data):
        user = authenticate(**data)

        if user and user.is_active:
            return user
        raise serializers.ValidationError(
            "Incorrect login credentials. Please check your account details and try again.")
