# A Beginner’s Guide to Sending Emails with Nodemailer in NodeJS

Welcome to a beginner's guide to Sending Emails using Nodemailer in NodeJS with Google API and Google OAuth 2.0!

This project serves as a comprehensive guide, offering testing and implementation insights for sending emails using Nodemailer in NodeJS with Google API and Google OAuth 2.0.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variable](#Environment-Variable)
- [Quick Start](#Quick-Start)
- [Development Documentation](#development-documentation)
- [To Do](#to-do)

## Introduction

This project leverages Nodemailer with Google API and OAuth 2.0 to create a secure email-sending service. Using OAuth 2.0 for authentication ensures both efficiency and data protection for automated emails or newsletters.

This project's functionalities include:

- Sending emails using Google Apps.
- Sending emails using Ethereal Testing Server.
- Sending an embed image and a text file email with Google Apps.
- Sending (an embed image and a text file) email with Google API and Google OAuth 2.0.

## Getting Started

I recommend running this project on **NodeJS v20+** or **NodeJS v22+**. This project was originally run on **NodeJS v21.7.1** and **npm@10.5.0**.

### Installation

To get started, you need to download this project from the GitHub repository and navigate to the project's folder.

```sh
cd nodejs-nodemailer-gmail-api/
```

You need to dowload the project's dependencies.

```sh
npm install
```

Additionally, you should download an extra package for running the project, it's called [**nodemon**](https://www.npmjs.com/package/nodemon).

```sh
npm i nodemon --save-dev
```

### Environment Variable

This step is **important**! Create an `.env` file to store the application's credentials. These are the credentials you will need.

```sh
BE_PORT="" # IMPORTANT: This is the back end port, you need to have this variable for the project to work!
GMAILHOST=smtp.gmail.com
GMAILUSER=""
APPPASSWORD=""
ETHEREALHOST=smtp.ethereal.email
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_PLAYGROUND_REDIRECT_URI=""
GOOGLE_PLAYGROUND_REFRESH_TOKEN=""
```

## Quick Start

Run the project using the following command(s).

```sh
npm start
```

Or, if you have already downloaded nodemon using `npm i nodemon --save-dev`, you can also run the project using the following commands(s).

```sh
npm run api
```

These are the URLs that will be accessed. P.S: I will add the Postman docs as soon as possible.

```sh
.../api/v1/emails/send-email
.../api/v1/emails/send-email-ethereal
.../api/v1/emails/send-email-embed-attach
.../api/v1/emails/send-email-google-api
```

---

## Development Documentation

_Order from newest to oldest_

### 13/10/2024

- Note: this note involve using Google API and Google OAuth 2.0 involving `invalid_grant`, this error is because the access/refresh token is incorrect or invalid, this often happens because some Google API's refresh token in "Testing" mode only last for 7 days. To fix this, you just need to supply the project with a newly created Refresh Token.

### 14/07/2024

- Note: Email Server Client which supports HTML format will render the HTML format, Email Server Client which supports text will render text. More information here: https://chatgpt.com/share/877de70d-73b7-44d3-b791-cb26601db92c

### 03/06/2024

- Feature: send emails using google api

### 21/05/2024

- Feature: send emails using ethereal server

### 14/05/2024

- Utils: add request logger and request limiter

### 04/05/2024

- Initialize: the project
