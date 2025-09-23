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
                {"q": "What should you do during an earthquake?", "a": ["Drop, Cover, Hold", "Run outside", "Stand near windows", "Use the elevator"], "correct": 0},
                {"q": "Where is the safest place indoors during an earthquake?", "a": ["Under a sturdy table", "Near glass doors", "In the elevator", "On the balcony"], "correct": 0},
                {"q": "What should you avoid during an earthquake?", "a": ["Standing under doorways", "Standing under ceiling fans", "Standing under a sturdy table", "Staying away from windows"], "correct": 1},
                {"q": "What is an aftershock?", "a": ["A smaller earthquake following the main shock", "A type of storm", "A fire after an earthquake", "A flood after an earthquake"], "correct": 0},
                {"q": "What should you include in an emergency kit?", "a": ["Water, torch, first aid", "Fireworks", "Heavy books", "Paint cans"], "correct": 0},
                {"q": "What should you do if you are outside during an earthquake?", "a": ["Move to an open area", "Run inside a building", "Stand under trees", "Go near power lines"], "correct": 0},
                {"q": "What should you do if you are driving during an earthquake?", "a": ["Stop in a safe place", "Speed up", "Stop under a bridge", "Stop on a flyover"], "correct": 0},
                {"q": "What should you NOT do after an earthquake?", "a": ["Use elevators", "Check for injuries", "Listen to official alerts", "Check for gas leaks"], "correct": 0},
                {"q": "What is the first thing to do after the shaking stops?", "a": ["Check yourself and others for injuries", "Run outside immediately", "Call everyone you know", "Turn on all lights"], "correct": 0},
                {"q": "What should you do if you smell gas after an earthquake?", "a": ["Turn off the gas supply and leave the building", "Light a match", "Ignore it", "Open all electrical appliances"], "correct": 0},
                {"q": "What is the best way to protect your head during an earthquake?", "a": ["Use your arms or a pillow", "Wear a helmet", "Use a book", "Nothing is needed"], "correct": 0},
                {"q": "What should you do if you are in a crowded public place during an earthquake?", "a": ["Stay calm and avoid rushing to exits", "Run to the nearest exit", "Push others", "Shout loudly"], "correct": 0},
                {"q": "What should you do if you are in bed during an earthquake?", "a": ["Stay in bed and protect your head", "Jump out of bed", "Run outside", "Hide under the bed"], "correct": 0},
                {"q": "What should you do if you are at school during an earthquake?", "a": ["Follow the teacher's instructions", "Run outside", "Hide in the bathroom", "Climb on the desk"], "correct": 0},
                {"q": "What should you do if you are in a wheelchair during an earthquake?", "a": ["Lock your wheels and cover your head", "Try to stand up", "Move to another room", "Call for help immediately"], "correct": 0},
                {"q": "What should you do after an earthquake if you are trapped?", "a": ["Tap on a pipe or wall to signal rescuers", "Shout loudly", "Try to dig yourself out", "Light a fire"], "correct": 0},
                {"q": "What should you do with your phone after an earthquake?", "a": ["Use it only for emergencies", "Call everyone you know", "Post on social media", "Play games"], "correct": 0},
                {"q": "What should you do if you see downed power lines after an earthquake?", "a": ["Stay away and report them", "Touch them to check", "Ignore them", "Pour water on them"], "correct": 0},
                {"q": "What is the best way to prepare your home for an earthquake?", "a": ["Secure heavy furniture and objects", "Paint the walls", "Open all windows", "Remove all doors"], "correct": 0},
                {"q": "What should you do if you are on the top floor of a building during an earthquake?", "a": ["Stay put and protect yourself", "Run to the ground floor", "Jump out the window", "Use the elevator"], "correct": 0},
                {"q": "What should you do if you are in a kitchen during an earthquake?", "a": ["Move away from glass and heavy objects", "Turn on the stove", "Open all cabinets", "Run outside"], "correct": 0},
                {"q": "What should you do if you are in a shopping mall during an earthquake?", "a": ["Move away from shelves and glass", "Run to the parking lot", "Hide in a changing room", "Climb on a display"], "correct": 0},
                {"q": "What should you do if you are in a movie theater during an earthquake?", "a": ["Get under the seat and protect your head", "Run to the exit", "Stand up and shout", "Throw things"], "correct": 0},
                {"q": "What should you do if you are in a lift during an earthquake?", "a": ["Press all buttons and get out at the nearest floor", "Stay inside", "Jump", "Call for help immediately"], "correct": 0},
                {"q": "What should you do if you are in a stadium during an earthquake?", "a": ["Stay in your seat and protect your head", "Run to the field", "Climb the fence", "Shout for help"], "correct": 0},
            ]
        },
    )
    fl_quiz = Quiz(
        title="Flood Safety",
        disaster_type="Flood",
        questions={
            "questions": [
                {"q": "Where should you move during a flood warning?", "a": ["Higher ground", "Low ground", "Basement", "Near rivers"], "correct": 0},
                {"q": "Is it safe to walk in moving flood water?", "a": ["No", "Yes", "If you can swim", "If you wear boots"], "correct": 0},
                {"q": "What should you avoid during a flood?", "a": ["Touching electrical wires", "Drinking bottled water", "Listening to alerts", "Wearing a raincoat"], "correct": 0},
                {"q": "What should you do if you are trapped in a car during a flood?", "a": ["Abandon the car and move to higher ground", "Stay inside", "Drive faster", "Honk continuously"], "correct": 0},
                {"q": "What should you do before a flood?", "a": ["Prepare an emergency kit", "Open all windows", "Move valuables to the basement", "Ignore warnings"], "correct": 0},
                {"q": "What should you do after a flood?", "a": ["Avoid flood water", "Drink flood water", "Go fishing", "Swim in the water"], "correct": 0},
                {"q": "What should you do if you see someone swept away by flood water?", "a": ["Call emergency services", "Jump in to save them", "Ignore", "Throw objects at them"], "correct": 0},
                {"q": "What should you do with food that has touched flood water?", "a": ["Throw it away", "Wash and eat", "Dry it", "Give to pets"], "correct": 0},
                {"q": "What should you do if you are told to evacuate?", "a": ["Leave immediately", "Wait for the water to rise", "Pack slowly", "Ignore the order"], "correct": 0},
                {"q": "What should you do if you are in a building during a flood?", "a": ["Move to the highest floor", "Go to the basement", "Open all doors", "Turn on all lights"], "correct": 0},
                {"q": "What should you do if you see flood water on the road?", "a": ["Turn around, don't drown", "Drive through", "Walk through", "Ignore it"], "correct": 0},
                {"q": "What should you do with electrical appliances after a flood?", "a": ["Have them checked before use", "Use immediately", "Throw away", "Give to children"], "correct": 0},
                {"q": "What should you do if you are in a school during a flood?", "a": ["Follow the teacher's instructions", "Run outside", "Hide in the bathroom", "Climb on the desk"], "correct": 0},
                {"q": "What should you do if you are in a hospital during a flood?", "a": ["Follow staff instructions", "Run outside", "Hide in the bathroom", "Climb on the bed"], "correct": 0},
                {"q": "What should you do if you are in a market during a flood?", "a": ["Move to higher ground", "Run to the parking lot", "Hide in a shop", "Climb on a display"], "correct": 0},
                {"q": "What should you do if you are in a stadium during a flood?", "a": ["Move to higher ground", "Run to the field", "Climb the fence", "Shout for help"], "correct": 0},
                {"q": "What should you do if you are in a train during a flood?", "a": ["Stay inside and listen to announcements", "Jump out", "Run to the engine", "Climb on the roof"], "correct": 0},
                {"q": "What should you do if you are in a bus during a flood?", "a": ["Stay inside and listen to the driver", "Jump out", "Run to the back", "Climb on the roof"], "correct": 0},
                {"q": "What should you do if you are in a hotel during a flood?", "a": ["Move to higher floors", "Run outside", "Hide in the bathroom", "Climb on the bed"], "correct": 0},
                {"q": "What should you do if you are in a shopping mall during a flood?", "a": ["Move to higher floors", "Run to the parking lot", "Hide in a shop", "Climb on a display"], "correct": 0},
                {"q": "What should you do if you are in a cinema during a flood?", "a": ["Move to higher floors", "Run to the exit", "Hide in the bathroom", "Climb on the seat"], "correct": 0},
                {"q": "What should you do if you are in a lift during a flood?", "a": ["Avoid using the lift", "Use the lift", "Jump", "Call for help immediately"], "correct": 0},
                {"q": "What should you do if you are in a wheelchair during a flood?", "a": ["Move to higher ground and call for help", "Try to stand up", "Move to another room", "Call for help immediately"], "correct": 0},
                {"q": "What should you do if you are in a car during a flood?", "a": ["Abandon the car and move to higher ground", "Stay inside", "Drive faster", "Honk continuously"], "correct": 0},
                {"q": "What should you do if you are in a school bus during a flood?", "a": ["Listen to the driver and stay calm", "Jump out", "Run to the back", "Climb on the roof"], "correct": 0},
            ]
        },
    )
    cy_quiz = Quiz(
        title="Cyclone Safety",
        disaster_type="Cyclone",
        questions={
            "questions": [
                {"q": "What should you do when a cyclone warning is issued?", "a": ["Stay indoors and secure your home", "Go to the beach", "Fly a kite", "Ignore the warning"], "correct": 0},
                {"q": "What should you avoid during a cyclone?", "a": ["Going outside", "Listening to official alerts", "Staying away from windows", "Securing loose objects"], "correct": 0},
                {"q": "What is the safest place in your house during a cyclone?", "a": ["A small, windowless room", "The balcony", "The roof", "The garage"], "correct": 0},
                {"q": "What should you do with pets during a cyclone?", "a": ["Bring them indoors", "Leave them outside", "Take them to the roof", "Let them roam free"], "correct": 0},
                {"q": "What should you do with important documents before a cyclone?", "a": ["Keep them in a waterproof bag", "Throw them away", "Leave them on the table", "Give them to a neighbor"], "correct": 0},
                {"q": "What should you do if you are in a car during a cyclone?", "a": ["Stop in a safe place and stay inside", "Drive faster", "Park under a tree", "Drive to the beach"], "correct": 0},
                {"q": "What should you do after a cyclone passes?", "a": ["Wait for official all-clear", "Go outside immediately", "Swim in flood water", "Touch downed power lines"], "correct": 0},
                {"q": "What should you do with food after a cyclone?", "a": ["Check for contamination before eating", "Eat anything", "Ignore spoilage", "Share with animals"], "correct": 0},
                {"q": "What should you do if you see downed power lines after a cyclone?", "a": ["Stay away and report them", "Touch them", "Pour water on them", "Ignore them"], "correct": 0},
                {"q": "What should you do if your house is damaged during a cyclone?", "a": ["Move to a safe shelter", "Stay inside", "Climb on the roof", "Go to the basement"], "correct": 0},
                {"q": "What should you do with water after a cyclone?", "a": ["Boil or treat before drinking", "Drink directly", "Give to pets", "Use for cooking only"], "correct": 0},
                {"q": "What should you do if you are at school during a cyclone?", "a": ["Follow the teacher's instructions", "Run outside", "Hide in the bathroom", "Climb on the desk"], "correct": 0},
                {"q": "What should you do if you are in a hospital during a cyclone?", "a": ["Follow staff instructions", "Run outside", "Hide in the bathroom", "Climb on the bed"], "correct": 0},
                {"q": "What should you do if you are in a market during a cyclone?", "a": ["Move to a safe shelter", "Run to the parking lot", "Hide in a shop", "Climb on a display"], "correct": 0},
                {"q": "What should you do if you are in a stadium during a cyclone?", "a": ["Move to a safe shelter", "Run to the field", "Climb the fence", "Shout for help"], "correct": 0},
                {"q": "What should you do if you are in a train during a cyclone?", "a": ["Stay inside and listen to announcements", "Jump out", "Run to the engine", "Climb on the roof"], "correct": 0},
                {"q": "What should you do if you are in a bus during a cyclone?", "a": ["Stay inside and listen to the driver", "Jump out", "Run to the back", "Climb on the roof"], "correct": 0},
                {"q": "What should you do if you are in a hotel during a cyclone?", "a": ["Move to a safe shelter", "Run outside", "Hide in the bathroom", "Climb on the bed"], "correct": 0},
                {"q": "What should you do if you are in a shopping mall during a cyclone?", "a": ["Move to a safe shelter", "Run to the parking lot", "Hide in a shop", "Climb on a display"], "correct": 0},
                {"q": "What should you do if you are in a cinema during a cyclone?", "a": ["Move to a safe shelter", "Run to the exit", "Hide in the bathroom", "Climb on the seat"], "correct": 0},
                {"q": "What should you do if you are in a lift during a cyclone?", "a": ["Avoid using the lift", "Use the lift", "Jump", "Call for help immediately"], "correct": 0},
                {"q": "What should you do if you are in a wheelchair during a cyclone?", "a": ["Move to a safe shelter and call for help", "Try to stand up", "Move to another room", "Call for help immediately"], "correct": 0},
                {"q": "What should you do if you are in a car during a cyclone?", "a": ["Stop in a safe place and stay inside", "Drive faster", "Park under a tree", "Drive to the beach"], "correct": 0},
                {"q": "What should you do if you are in a school bus during a cyclone?", "a": ["Listen to the driver and stay calm", "Jump out", "Run to the back", "Climb on the roof"], "correct": 0},
                {"q": "What should you do if you are in a public place during a cyclone?", "a": ["Move to a safe shelter", "Run outside", "Hide in the bathroom", "Climb on the desk"], "correct": 0},
            ]
        },
    )
    fire_quiz = Quiz(
        title="Fire Safety",
        disaster_type="Fire",
        questions={
            "questions": [
                {"q": "What should you do if you see smoke in a building?", "a": ["Stay low and exit quickly", "Run to the roof", "Open all windows", "Hide in a closet"], "correct": 0},
                {"q": "What should you use to put out a small fire?", "a": ["Fire extinguisher", "Water on electrical fire", "Blanket on oil fire", "Paper"], "correct": 0},
                {"q": "What should you do if your clothes catch fire?", "a": ["Stop, drop, and roll", "Run fast", "Jump in a pool", "Wave your arms"], "correct": 0},
                {"q": "What should you do if you are trapped in a burning building?", "a": ["Signal for help from a window", "Hide under the bed", "Open all doors", "Climb to the roof"], "correct": 0},
                {"q": "What should you avoid using during a fire?", "a": ["Elevators", "Stairs", "Fire escape", "Blanket"], "correct": 0},
                {"q": "What should you do if you hear a fire alarm?", "a": ["Evacuate immediately", "Ignore it", "Finish your work", "Call a friend"], "correct": 0},
                {"q": "What should you do before opening a door during a fire?", "a": ["Check if it is hot", "Open quickly", "Knock", "Shout"], "correct": 0},
                {"q": "What should you do if you are in a kitchen fire?", "a": ["Turn off the heat and cover the pan", "Pour water on oil fire", "Open all windows", "Run outside"], "correct": 0},
                {"q": "What should you do if you see someone on fire?", "a": ["Help them stop, drop, and roll", "Throw water", "Run away", "Call their name"], "correct": 0},
                {"q": "What should you do if you are in a school during a fire?", "a": ["Follow the teacher's instructions", "Run outside", "Hide in the bathroom", "Climb on the desk"], "correct": 0},
                {"q": "What should you do if you are in a hospital during a fire?", "a": ["Follow staff instructions", "Run outside", "Hide in the bathroom", "Climb on the bed"], "correct": 0},
                {"q": "What should you do if you are in a market during a fire?", "a": ["Move to the nearest exit", "Run to the parking lot", "Hide in a shop", "Climb on a display"], "correct": 0},
                {"q": "What should you do if you are in a stadium during a fire?", "a": ["Move to the nearest exit", "Run to the field", "Climb the fence", "Shout for help"], "correct": 0},
                {"q": "What should you do if you are in a train during a fire?", "a": ["Move to the nearest exit", "Jump out", "Run to the engine", "Climb on the roof"], "correct": 0},
                {"q": "What should you do if you are in a bus during a fire?", "a": ["Move to the nearest exit", "Jump out", "Run to the back", "Climb on the roof"], "correct": 0},
                {"q": "What should you do if you are in a hotel during a fire?", "a": ["Move to the nearest exit", "Run outside", "Hide in the bathroom", "Climb on the bed"], "correct": 0},
                {"q": "What should you do if you are in a shopping mall during a fire?", "a": ["Move to the nearest exit", "Run to the parking lot", "Hide in a shop", "Climb on a display"], "correct": 0},
                {"q": "What should you do if you are in a cinema during a fire?", "a": ["Move to the nearest exit", "Run to the exit", "Hide in the bathroom", "Climb on the seat"], "correct": 0},
                {"q": "What should you do if you are in a lift during a fire?", "a": ["Avoid using the lift", "Use the lift", "Jump", "Call for help immediately"], "correct": 0},
                {"q": "What should you do if you are in a wheelchair during a fire?", "a": ["Move to the nearest exit and call for help", "Try to stand up", "Move to another room", "Call for help immediately"], "correct": 0},
                {"q": "What should you do if you are in a car during a fire?", "a": ["Stop and exit the car", "Drive faster", "Park under a tree", "Drive to the beach"], "correct": 0},
                {"q": "What should you do if you are in a school bus during a fire?", "a": ["Listen to the driver and stay calm", "Jump out", "Run to the back", "Climb on the roof"], "correct": 0},
                {"q": "What should you do if you are in a public place during a fire?", "a": ["Move to the nearest exit", "Run outside", "Hide in the bathroom", "Climb on the desk"], "correct": 0},
                {"q": "What should you do if you see someone trapped in a fire?", "a": ["Call emergency services", "Try to rescue them yourself", "Ignore", "Throw water from a distance"], "correct": 0},
            ]
        },
    )
    heat_quiz = Quiz(
        title="Heatwave Safety",
        disaster_type="Heatwave",
        questions={
            "questions": [
                {"q": "What should you do during a heatwave?", "a": ["Stay hydrated and indoors", "Go for a run", "Wear heavy clothes", "Ignore the heat"], "correct": 0},
                {"q": "What should you wear during a heatwave?", "a": ["Light, loose clothing", "Heavy, dark clothing", "Raincoat", "Woolen clothes"], "correct": 0},
                {"q": "What should you avoid during a heatwave?", "a": ["Going out in the afternoon", "Drinking water", "Staying in the shade", "Wearing a hat"], "correct": 0},
                {"q": "What should you do if you feel dizzy during a heatwave?", "a": ["Move to a cool place and drink water", "Ignore it", "Run faster", "Eat spicy food"], "correct": 0},
                {"q": "What is a sign of heatstroke?", "a": ["High body temperature", "Cold hands", "Shivering", "Low pulse"], "correct": 0},
                {"q": "What should you do if someone has heatstroke?", "a": ["Move them to a cool place and seek medical help", "Give them hot tea", "Cover them with blankets", "Ignore them"], "correct": 0},
                {"q": "What should you do with pets during a heatwave?", "a": ["Keep them indoors and hydrated", "Let them roam outside", "Feed them hot food", "Ignore them"], "correct": 0},
                {"q": "What should you do with food during a heatwave?", "a": ["Keep it refrigerated", "Leave it outside", "Eat only hot food", "Ignore spoilage"], "correct": 0},
                {"q": "What should you do if you are at school during a heatwave?", "a": ["Drink water and stay in the shade", "Run outside", "Play in the sun", "Wear heavy clothes"], "correct": 0},
                {"q": "What should you do if you are in a hospital during a heatwave?", "a": ["Follow staff instructions and stay cool", "Run outside", "Hide in the bathroom", "Climb on the bed"], "correct": 0},
                {"q": "What should you do if you are in a market during a heatwave?", "a": ["Stay in the shade and drink water", "Run to the parking lot", "Hide in a shop", "Climb on a display"], "correct": 0},
                {"q": "What should you do if you are in a stadium during a heatwave?", "a": ["Stay in the shade and drink water", "Run to the field", "Climb the fence", "Shout for help"], "correct": 0},
                {"q": "What should you do if you are in a train during a heatwave?", "a": ["Stay hydrated and avoid direct sunlight", "Jump out", "Run to the engine", "Climb on the roof"], "correct": 0},
                {"q": "What should you do if you are in a bus during a heatwave?", "a": ["Stay hydrated and avoid direct sunlight", "Jump out", "Run to the back", "Climb on the roof"], "correct": 0},
                {"q": "What should you do if you are in a hotel during a heatwave?", "a": ["Stay in a cool room and drink water", "Run outside", "Hide in the bathroom", "Climb on the bed"], "correct": 0},
                {"q": "What should you do if you are in a shopping mall during a heatwave?", "a": ["Stay in a cool area and drink water", "Run to the parking lot", "Hide in a shop", "Climb on a display"], "correct": 0},
                {"q": "What should you do if you are in a cinema during a heatwave?", "a": ["Stay in a cool area and drink water", "Run to the exit", "Hide in the bathroom", "Climb on the seat"], "correct": 0},
                {"q": "What should you do if you are in a lift during a heatwave?", "a": ["Avoid using the lift if possible", "Use the lift", "Jump", "Call for help immediately"], "correct": 0},
                {"q": "What should you do if you are in a wheelchair during a heatwave?", "a": ["Stay in a cool area and drink water", "Try to stand up", "Move to another room", "Call for help immediately"], "correct": 0},
                {"q": "What should you do if you are in a car during a heatwave?", "a": ["Use air conditioning and stay hydrated", "Drive faster", "Park under a tree", "Drive to the beach"], "correct": 0},
                {"q": "What should you do if you are in a school bus during a heatwave?", "a": ["Stay hydrated and avoid direct sunlight", "Jump out", "Run to the back", "Climb on the roof"], "correct": 0},
                {"q": "What should you do if you are in a public place during a heatwave?", "a": ["Stay in the shade and drink water", "Run outside", "Hide in the bathroom", "Climb on the desk"], "correct": 0},
                {"q": "What should you do if you see someone faint during a heatwave?", "a": ["Move them to a cool place and give water", "Ignore", "Shout for help", "Throw water on them"], "correct": 0},
            ]
        },
    )
    lightning_quiz = Quiz(
        title="Lightning Safety",
        disaster_type="Lightning",
        questions={
            "questions": [
                {"q": "What should you do during a lightning storm?", "a": ["Stay indoors and away from windows", "Go outside", "Swim in open water", "Climb a tree"], "correct": 0},
                {"q": "What should you avoid during a lightning storm?", "a": ["Using electrical appliances", "Staying indoors", "Wearing rubber shoes", "Drinking water"], "correct": 0},
                {"q": "What should you do if you are outside during a lightning storm?", "a": ["Find shelter immediately", "Lie down on the ground", "Run in open fields", "Climb a tree"], "correct": 0},
                {"q": "What should you do if you are in a car during a lightning storm?", "a": ["Stay inside the car", "Get out and run", "Open all windows", "Touch metal parts"], "correct": 0},
                {"q": "What should you do if you are in a school during a lightning storm?", "a": ["Stay indoors and away from windows", "Run outside", "Hide in the bathroom", "Climb on the desk"], "correct": 0},
                {"q": "What should you do if you are in a hospital during a lightning storm?", "a": ["Stay indoors and away from windows", "Run outside", "Hide in the bathroom", "Climb on the bed"], "correct": 0},
                {"q": "What should you do if you are in a market during a lightning storm?", "a": ["Stay indoors and away from windows", "Run to the parking lot", "Hide in a shop", "Climb on a display"], "correct": 0},
                {"q": "What should you do if you are in a stadium during a lightning storm?", "a": ["Move to a covered area", "Run to the field", "Climb the fence", "Shout for help"], "correct": 0},
                {"q": "What should you do if you are in a train during a lightning storm?", "a": ["Stay inside and avoid touching metal", "Jump out", "Run to the engine", "Climb on the roof"], "correct": 0},
                {"q": "What should you do if you are in a bus during a lightning storm?", "a": ["Stay inside and avoid touching metal", "Jump out", "Run to the back", "Climb on the roof"], "correct": 0},
                {"q": "What should you do if you are in a hotel during a lightning storm?", "a": ["Stay indoors and away from windows", "Run outside", "Hide in the bathroom", "Climb on the bed"], "correct": 0},
                {"q": "What should you do if you are in a shopping mall during a lightning storm?", "a": ["Stay indoors and away from windows", "Run to the parking lot", "Hide in a shop", "Climb on a display"], "correct": 0},
                {"q": "What should you do if you are in a cinema during a lightning storm?", "a": ["Stay indoors and away from windows", "Run to the exit", "Hide in the bathroom", "Climb on the seat"], "correct": 0},
                {"q": "What should you do if you are in a lift during a lightning storm?", "a": ["Avoid using the lift if possible", "Use the lift", "Jump", "Call for help immediately"], "correct": 0},
                {"q": "What should you do if you are in a wheelchair during a lightning storm?", "a": ["Stay indoors and away from windows", "Try to stand up", "Move to another room", "Call for help immediately"], "correct": 0},
                {"q": "What should you do if you are in a car during a lightning storm?", "a": ["Stay inside the car", "Drive faster", "Park under a tree", "Drive to the beach"], "correct": 0},
                {"q": "What should you do if you are in a school bus during a lightning storm?", "a": ["Stay inside and avoid touching metal", "Jump out", "Run to the back", "Climb on the roof"], "correct": 0},
                {"q": "What should you do if you are in a public place during a lightning storm?", "a": ["Stay indoors and away from windows", "Run outside", "Hide in the bathroom", "Climb on the desk"], "correct": 0},
                {"q": "What should you do if you see someone struck by lightning?", "a": ["Call emergency services and provide first aid", "Ignore", "Shout for help", "Throw water on them"], "correct": 0},
                {"q": "What should you do if you are swimming during a lightning storm?", "a": ["Get out of the water immediately", "Keep swimming", "Dive deeper", "Call for help"], "correct": 0},
                {"q": "What should you do if you are on a bicycle during a lightning storm?", "a": ["Get off and find shelter", "Keep riding", "Ride faster", "Climb a tree"], "correct": 0},
                {"q": "What should you do if you are on a rooftop during a lightning storm?", "a": ["Go indoors immediately", "Stay on the roof", "Climb higher", "Shout for help"], "correct": 0},
                {"q": "What should you do if you are in a tent during a lightning storm?", "a": ["Move to a safer shelter if possible", "Stay in the tent", "Open all flaps", "Climb a tree"], "correct": 0},
                {"q": "What should you do if you are in a field during a lightning storm?", "a": ["Crouch low and minimize contact with the ground", "Lie down flat", "Run", "Jump"], "correct": 0},
            ]
        },
    )
    firstaid_quiz = Quiz(
        title="First Aid Basics",
        disaster_type="First Aid",
        questions={
            "questions": [
                {"q": "What is the first step in first aid?", "a": ["Check for danger", "Call a friend", "Run away", "Give water"], "correct": 0},
                {"q": "What should you do if someone is bleeding?", "a": ["Apply pressure to the wound", "Ignore it", "Give them food", "Make them run"], "correct": 0},
                {"q": "What should you do if someone is unconscious?", "a": ["Check for breathing and call for help", "Shake them", "Give them water", "Make them sit up"], "correct": 0},
                {"q": "What should you do if someone is choking?", "a": ["Perform the Heimlich maneuver", "Give them water", "Make them run", "Ignore it"], "correct": 0},
                {"q": "What should you do if someone has a burn?", "a": ["Cool the burn with running water", "Apply ice directly", "Cover with butter", "Ignore it"], "correct": 0},
                {"q": "What should you do if someone has a fracture?", "a": ["Immobilize the limb and seek medical help", "Move the limb", "Give them food", "Make them walk"], "correct": 0},
                {"q": "What should you do if someone is having a seizure?", "a": ["Protect them from injury and do not restrain", "Put something in their mouth", "Hold them down", "Give them water"], "correct": 0},
                {"q": "What should you do if someone is bitten by a snake?", "a": ["Keep them calm and seek medical help", "Make them run", "Give them food", "Ignore it"], "correct": 0},
                {"q": "What should you do if someone is stung by a bee?", "a": ["Remove the stinger and apply ice", "Squeeze the stinger", "Ignore it", "Give them food"], "correct": 0},
                {"q": "What should you do if someone faints?", "a": ["Lay them down and raise their legs", "Make them sit up", "Give them water", "Ignore it"], "correct": 0},
                {"q": "What should you do if someone has a nosebleed?", "a": ["Pinch the nose and lean forward", "Lean back", "Give them water", "Make them run"], "correct": 0},
                {"q": "What should you do if someone is having a heart attack?", "a": ["Call emergency services and keep them calm", "Give them water", "Make them run", "Ignore it"], "correct": 0},
                {"q": "What should you do if someone is in shock?", "a": ["Lay them down and keep them warm", "Make them stand", "Give them food", "Ignore it"], "correct": 0},
                {"q": "What should you do if someone is poisoned?", "a": ["Call emergency services and do not induce vomiting", "Give them water", "Make them run", "Ignore it"], "correct": 0},
                {"q": "What should you do if someone has a head injury?", "a": ["Keep them still and seek medical help", "Make them walk", "Give them food", "Ignore it"], "correct": 0},
                {"q": "What should you do if someone is drowning?", "a": ["Call for help and try to rescue safely", "Jump in immediately", "Ignore it", "Give them food"], "correct": 0},
                {"q": "What should you do if someone is electrocuted?", "a": ["Turn off the power and call for help", "Touch them immediately", "Give them water", "Make them walk"], "correct": 0},
                {"q": "What should you do if someone is vomiting?", "a": ["Keep them hydrated and seek medical help if needed", "Ignore it", "Give them food", "Make them run"], "correct": 0},
                {"q": "What should you do if someone has a sprain?", "a": ["Rest, ice, compress, and elevate the limb", "Make them walk", "Give them food", "Ignore it"], "correct": 0},
                {"q": "What should you do if someone is bitten by a dog?", "a": ["Wash the wound and seek medical help", "Ignore it", "Give them food", "Make them run"], "correct": 0},
                {"q": "What should you do if someone is allergic to bee stings?", "a": ["Seek emergency medical help", "Ignore it", "Give them food", "Make them run"], "correct": 0},
                {"q": "What should you do if someone is having an asthma attack?", "a": ["Help them use their inhaler and keep calm", "Give them water", "Make them run", "Ignore it"], "correct": 0},
                {"q": "What should you do if someone is hypothermic?", "a": ["Warm them gradually and seek medical help", "Give them hot water quickly", "Make them run", "Ignore it"], "correct": 0},
                {"q": "What should you do if someone is hyperventilating?", "a": ["Help them breathe slowly and calmly", "Give them water", "Make them run", "Ignore it"], "correct": 0},
                {"q": "What should you do if someone is burned by chemicals?", "a": ["Rinse with water and seek medical help", "Apply ointment", "Give them food", "Ignore it"], "correct": 0},
            ]
        },
    )
    db.session.add_all([eq_quiz, fl_quiz, cy_quiz, fire_quiz, heat_quiz, lightning_quiz, firstaid_quiz])

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

