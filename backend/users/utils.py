from django.core.mail import send_mail
from django.template.loader import get_template


def send_email_confirmation_token(email, token_id):
    data = {
        'token_id': str(token_id),
    }
    message = get_template('confirmation_email.txt').render(data)
    send_mail(subject='Confirma el mail',
              message=message,
              from_email='reservapp.dev@gmail.com',
              recipient_list=[email],
              fail_silently=True)