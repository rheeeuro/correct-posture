# C-posture: 2020 Software Engineering project

## Link (click screenshot)

[<img src="https://user-images.githubusercontent.com/47638660/88813508-fb347a80-d1f3-11ea-8880-f9f543fd49a8.png" width="50%">](https://c-posture.herokuapp.com/)

## 1. Title

Just stand in front, I'll measure your posture.  
Users can measure posture in real time through C-posture and be provided with appropriate solutions.

## 2. Pages

- [x] Home
- [x] Judge
- [x] Login
- [x] Exercise List
- [x] User Detail
- [x] Edit Profile
- [x] Change Password
- [x] Exercise
- [x] Recommend Exercise

## 3. Exercises

Physical Strength Exercises

- Squat
- Push up
- Sit up
- Lunge
- Burpee
- Jumpig Jack

Head Exercises

- Head tilt
- Head turn
- Tilt head back

Shoulder Exercises

- Wall angel
- Stand backbend
- Crossover stretch
- Overhead shoulder

Leg Exercises

- Hamstring stretch
- Knee hug
- Side lunge
- Cross legged

## 4. Techology

Posture measurement according to the posture measurement algorithm.  
At the end of the posture measurement, the user saves the record and stores the posture data to recommend exercise/stretching for each user in the profile.  
Posture estimation and pre-registered exercise posture model count the number of exercises (when moving from the last motion to the first motion)

## 5. Frameworks & APIs

Server

- Express: Server Construction
- helmet: Improved security
- dotenv: Environment variable setting (security)

Sign up / Log in

- Cookieparser: Save user information (cookies)
- Express-session: User information (session) storage and management
- passport: user authentication

Model

- MongoDB: Database
- mongoose: convert DB to JavaScript object
- MongoAtlas: Store database in the cloud

Web view

- pug: improved reusability of html code
- Chartjs: Profile chart

Controller

- bodyparser: conveniently extract POST requests
- ml5, tensorflow poseNet: posture estimation
- Google teachable machine: exercise pose model

Development

- morgan: print log messages
- babel: compatibility (formerly converted to JavaScript code)
- webpack: compatibility (formerly JavaScript, converted to css code)
- eslint: syntax error checking
- nodemon: automatic server restart when changing files
