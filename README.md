# software-hiring-adminjs-chartjs-mongo

Works!

- edit database tables Hiring, Position, Email, Candidate and Interview
- Sends emails for Interview and Offer / Rejected

### Tasks

- send email gmail - done
- navigation for sandbox
- navigation for dashboard
- add google/GitHub auth to the app
- Icon logo and favicon
- deploy to Vercel or GitHub pages

Dashboard charts

- Position
- Email
- Candidate
- Interview

## Street

- # complete data
- # incomplete data
- area distribution
- width distribution
- length distribution
- Heat map with width
- Heat map with width by length or area
-
- Available combos
-
-

MongoDB Atlas Dashboard

- Need to divide Length by Miles
- Need to divide Area by Acres
- Need to bucket Width to display total Length
- Need heat map of total Length by Width
- Geo map options?
-

# Subject and Body are empty in the emails

# 🚀 Use AdminJS to Quickly Build an Administration Web App 🚀

https://github.com/coding-to-music/software-hiring-adminjs-chartjs-mongo

https://software-hiring-adminjs-chartjs-mongo.vercel.app

From / By https://github.com/ddkhoa/SOFTWARE_ENGINEERING-hiring-adminjs

https://javascript.plainenglish.io/use-adminjs-to-quickly-build-an-administration-web-app-1a6421fe7864

## Environment variables:

```java
DB_SERVER=yourdbserver (not used)
DB_PORT=yourdbport (not used)

MONGO_URI="mongodb+srv://<userid>:<password>@cluster0.XXXserverNameXXX.mongodb.net/software-hiring-adminjs-chartjs-mongo?retryWrites=true&w=majority"

SENDER_ADDRESS=youremail
SENDER_PASSWORD=emailpassword
SENDER_NAME=Name appear in email

SENDER_HOST="smtp.gmail.com"
SENDER_PORT=587
```

## GitHub

```java
git init
git add .
git remote remove origin
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:coding-to-music/software-hiring-adminjs-chartjs-mongo.git
git push -u origin main
```

# Use AdminJS to Quickly Build an Administration Web App

### Article from Medium

https://javascript.plainenglish.io/use-adminjs-to-quickly-build-an-administration-web-app-1a6421fe7864

## Upgrade NPM packages

```
ncu
```

Output

```
 @adminjs/express         ^4.0.1  →   ^5.0.1
 @adminjs/mongoose        ^2.0.0  →   ^3.0.1
 adminjs                  ^5.3.3  →   ^6.7.2
 chart.js                 ^3.6.2  →   ^4.1.1
 dotenv                  ^10.0.0  →  ^16.0.3
 express                 ^4.17.1  →  ^4.18.2
 mongoose               ^5.11.11  →   ^6.8.0
 nodemailer               ^6.7.2  →   ^6.8.0
 nodemon                 ^2.0.15  →  ^2.0.20
 react-chartjs-2          ^4.0.0  →   ^5.1.0
 react-funnel-pipeline    ^0.1.1  →   ^0.2.0
 tslib                    ^2.3.1  →   ^2.4.1

Run ncu -u to upgrade package.json
```

## Setting up Nodemailer with Gmail after 2022. May

https://dev.to/viktoriabors/setting-up-nodemailer-with-gmail-after-2022-may-55af

https://github.com/ViktoriaBors/xmasWishes/blob/main/server.js

https://dev.to/documatic/send-email-in-nodejs-with-nodemailer-using-gmail-account-2gd1

## Less secure apps & your Google Account

To help keep your account secure, from May 30, 2022, ​​Google no longer supports the use of third-party apps or devices which ask you to sign in to your Google Account using only your username and password.

https://support.google.com/accounts/answer/6010255

## Outgoing Mail (SMTP) Server

https://support.google.com/mail/answer/7126229

- smtp.gmail.com (use this)
- Requires SSL: Yes
- Requires TLS: Yes (if available)
- Requires Authentication: Yes
- Port for SSL: 465
- Port for TLS/STARTTLS: 587 (use this)

## Why you may need an App Password

Tip: Don’t create an App Password unless the app or device you want to connect to your account doesn’t have “Sign in with Google.”

When you use 2-Step Verification, some less secure apps or devices may be blocked from accessing your Google Account. App Passwords are a way to let the blocked app or device access your Google Account.

## Create & use App Passwords

https://support.google.com/accounts/answer/185833

If you use 2-Step-Verification and get a "password incorrect" error when you sign in, you can try to use an App Password.

- Go to your Google Account. https://myaccount.google.com/
- Select Security.
- Under "Signing in to Google," select App Passwords. You may need to sign in. If you don’t have this option, it might be because:
- 2-Step Verification is not set up for your account.
- 2-Step Verification is only set up for security keys.
- Your account is through work, school, or other organization.
- You turned on Advanced Protection.
- At the bottom, choose Select app and choose the app you using and then Select device and choose the device you’re using and then Generate.
- Follow the instructions to enter the App Password. The App Password is the 16-character code in the yellow bar on your device.
- Tap Done.

Tip: Most of the time, you’ll only have to enter an App Password once per app or device, so don’t worry about memorizing it.

## Calling API's

http://localhost:8080/stats

```
curl -s http://localhost:8080/stats | jq
```

```json
{
  "success": true,
  "data": {
    "candidateByPosition": [
      {
        "_id": "63a0eb62f070e0964c5bbf65",
        "count": 1,
        "positionData": [
          {
            "_id": "63a0eb62f070e0964c5bbf65",
            "name": "Accountant",
            "__v": 0
          }
        ],
        "positionName": "Accountant"
      },
      {
        "_id": "63a0ea6ef070e0964c5bbf5c",
        "count": 1,
        "positionData": [
          {
            "_id": "63a0ea6ef070e0964c5bbf5c",
            "name": "Developer",
            "__v": 0
          }
        ],
        "positionName": "Developer"
      }
    ],
    "candidateByStage": [
      {
        "_id": "OFFER",
        "count": 2
      }
    ],
    "positionCount": 3,
    "candidateCount": 2,
    "hiredCount": 0
  }
}
```

## street stats

http://localhost:8080/stats

```
curl -s http://localhost:8080/streetStats | jq
```

```json

```
