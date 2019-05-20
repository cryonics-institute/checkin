# Cryonics Check-In
A Multiplatform Mobile App That Reminds Cryonics Patients to Check-In with Their Family and Friends

## Getting Started
We are currently working on our project's road map.  Help us get our goals right from the start by reviewing and revising our [canvas](./CANVAS.md).

The app will be built using React Native, a multiplatform mobile development library that allows Android and iOS apps to be developed using the same code base.  Developers and programmers interested in contributing code should be able to work with React Native.  Designers should be able to work in scalable vector graphics (SVG) format.

## About the Project
The project intends to build a check-in app for individuals who are near the end of life, have made arrangements with a cryonics organization, and have a stand-by team in effect and waiting to transport them to their chosen facility.  The stand-by team could consist of family, friends, a professional organization such as [Suspended Animation](http://www.suspendedanimationlabs.com), or some combination thereof.  The app should function as follows:
1. When installed, it will ask the user to select one or more people from her contacts, for the interval between check-in prompts during the day, and again for at night.  The interval options should vary from not at all to every 12 hours.

2. The app will signal the user at the chosen interval by beeping loudly and vibrating.
The user should not need to unlock the phone to answer the prompt!

3. Large text and buttons will allow the user to easily silence the phone by pressing "yes" or "no". If they click "yes", the alarm resets.  If they click "no" or cannot get to the phone in a specified amount of time, a message is sent to the stand-by team asking them to get in touch.

This compliments existing emergency-button systems found in many peoples' homes that signal emergency services when pressed.  In cases where someone is too weak to get to the button, this free system provides an early warning, alerting the stand-by team to check on them, potentially avoiding a life threatening scenario.

## Flow
The app screens should flow as follows:

1. Launch app from icon/launcher -> WelcomeActivity on first run, otherwise SetupActivity

2. WelcomeActivity: Welcome message, "Let's get started..." button -> PickContactActivity

3. SetupActivity: Buttons "Pick friends and family", "Set up alarm".

4. PickContactActivity: Displays a list of contacts "Richard Mobile", "Richard Home" and so on.

5. ContactPickedActivity: Let's user pick another contact (redirect to PickContactActivity), or say "That's enough for now" -> SetupAlarmActivity.

6. SetupAlarmActivity: 2 screens, During the day from: "9am" to "6pm", set alarm off every: "1, 2, 3 hours, no alarm during day". Night (same). "Next" button

7. SetupCompleteActivity: "Thank you message", "Done button"

8. AlarmActivity: "Are you OK", "YES", "NO".
