from Repository import emergency_contact_repo
from twilio.rest import Client

from dotenv import load_dotenv

load_dotenv()

ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
VERIFY_SID = os.getenv("TWILIO_VERIFY_SID")

client = Client(ACCOUNT_SID, AUTH_TOKEN)

def create_contact(db, data):
    return emergency_contact_repo.add_contact(db, data)

def all_contacts(db):
    return emergency_contact_repo.get_contacts(db)

def send_alert(db, id):
    contact = emergency_contact_repo.get_contact_by_id(db, id)

    if not contact:
        return None

    message = client.messages.create(
        body="🚨 Emergency Alert! Please contact immediately.",
        from_=TWILIO_NUMBER,
        to=contact.phone
    )

    return {
        "message_sid": message.sid,
        "phone": contact.phone
    }