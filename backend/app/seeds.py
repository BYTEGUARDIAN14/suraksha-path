from .models import User, UserRole, Quiz, Drill, Alert, EmergencyContact
from .extensions import db


def run_seeds() -> None:
    if db.session.scalar(db.select(User).limit(1)):
        return

    admin = User(name="Admin", email="admin@sih.test", role=UserRole.ADMIN.value, region="IN")
    admin.set_password("Admin@123")

    s1 = User(name="Student One", email="student1@sih.test", role=UserRole.STUDENT.value, region="MH")
    s1.set_password("Student@123")
    s2 = User(name="Student Two", email="student2@sih.test", role=UserRole.STUDENT.value, region="KA")
    s2.set_password("Student@123")

    db.session.add_all([admin, s1, s2])

    eq_quiz = Quiz(
        title="Earthquake Basics",
        disaster_type="Earthquake",
        questions={
            "questions": [
                {"q": "What to do during an earthquake?", "a": ["Drop, Cover, Hold", "Run outside"], "correct": 0},
                {"q": "Where to stand?", "a": ["Near windows", "Under sturdy table"], "correct": 1},
                {"q": "After shocks?", "a": ["Ignore", "Expect and stay cautious"], "correct": 1},
                {"q": "Use elevators?", "a": ["Yes", "No"], "correct": 1},
                {"q": "Emergency kit includes?", "a": ["Water & torch", "Fireworks"], "correct": 0},
            ]
        },
    )
    fl_quiz = Quiz(
        title="Flood Safety",
        disaster_type="Flood",
        questions={
            "questions": [
                {"q": "Where to move?", "a": ["Low ground", "Higher ground"], "correct": 1},
                {"q": "Walk in moving water?", "a": ["Yes", "No"], "correct": 1},
                {"q": "Electric hazards?", "a": ["Avoid", "Touch wires"], "correct": 0},
                {"q": "Listen to?", "a": ["Official alerts", "Rumors"], "correct": 0},
                {"q": "Drink flood water?", "a": ["No", "Yes"], "correct": 0},
            ]
        },
    )

    db.session.add_all([eq_quiz, fl_quiz])

    eq_drill = Drill(disaster_type="Earthquake", steps={"steps": ["Duck", "Cover", "Hold"]}, steps_hi={"steps": ["झुको", "ढँकें", "पकड़े रखें"]})
    fl_drill = Drill(disaster_type="Flood", steps={"steps": ["Move to higher ground", "Switch off power", "Call helpline"]}, steps_hi={"steps": ["ऊँचे स्थान पर जाएँ", "बिजली बंद करें", "हेल्पलाइन कॉल करें"]})
    db.session.add_all([eq_drill, fl_drill])

    alert = Alert(message="Mock drill scheduled tomorrow", disaster_type="Earthquake", region="MH")
    db.session.add(alert)

    # Emergency contacts
    contacts = [
        EmergencyContact(name="Police Control Room", phone="100", type="police", region=None),
        EmergencyContact(name="Fire Brigade", phone="101", type="fire", region=None),
        EmergencyContact(name="Ambulance", phone="102", type="ambulance", region=None),
        EmergencyContact(name="NDMA Helpline", phone="011-1078", type="ndma", region=None),
        EmergencyContact(name="Campus Security (MH)", phone="022-123456", type="campus", region="MH"),
    ]
    db.session.add_all(contacts)

    db.session.commit()

