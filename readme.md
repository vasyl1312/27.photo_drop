<!-- `PhotoDrop`

<h1>Requirements for task:</h1>

So, we are looking for photoDrop app from you.

The main idea of this project is the interaction of photographers and clients who want to get their photos.

The application will consist of two applications. The first is part of the photographers. Photographers take pictures of people and then upload the photos to our service. AI matches photos of users by their faces will simulate this by assigning users to photos with their hands do (it yourself without AI just with the list of users). The second is the client side, where clients register and receive albums with their photos and can pay to get them without a watermark.

These will be two different applications.

# Photographers part

- Registration. For registration - login and password, two optional fields - fullname and email. Do it at retool.com. Make a registration form and a table for already registered users.Retool is a mandatory requirement for registration of photographers. users (photographers) do not register themselves, they are registered only in the retool by admins
- Login page

Give access-token(1 day lifetime)

Login must be unique, no matter what you enter in this field.login must contain only letters and "\_"

<img src="https://i.ibb.co/Q8K0zCX/login.jpg"  border="0">

- Album Page

<img src="https://i.ibb.co/3B2rTxF/login.jpg" border="0">

Ability to upload multiple photos at once.

Add client to photos, with the ability to add multiple clients

Upload photos to s3 bucket aws

Should be no photos at album page

# Client Application

[Photo Drop](<https://www.figma.com/file/BEheqNi5XyVogJ3hBreV2f/Lambda---PhotoPass-Designs---WORKING-COPY-(Copy)-(Copy)?type=design&node-id=711-104&t=M8WUf9H7TCwq5qt3-0>) - design

- Registration / Login Registration and login occur on the same page, send to telegram (This is an imitation of an SMS message to a user in production, you don’t need to receive a chat ID with a user, just create a private chat with a bot). Validity period of otp for 3 minutes, the ability to make only 1 resend otp.
- Selfies: the ability to take a photo or add from the gallery, do not delete old from data base. The ability to crop photos and zoom. Save selfies in s3 bucket. Show selfies only if the user does not have a selfie on the account, that is, only after registration.
- Dashboard page, no photos yet, show art print and an inscription about uploading a photo soon.
- Settings, the ability to add a name only.
- After the user's photos appear on the dashboard page, his albums and photos should be displayed.
- All thumbnails must be watermarked like the full photo if the photo is locked. -->

# Photo Drop (First part) [Read requirements](https://www.notion.so/27-Photo-Drop-F-B-f94b4897a6f1442193344dc6118e6841)

Backend Part(Mine) [Link](https://photo-drop.onrender.com/api_docs/)

Fullstack completed project [Link](https://photographer-two.vercel.app/)

> Commercial project

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
8.17.0
v17.4.0
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](https://www.notion.so/27-Photo-Drop-F-B-f94b4897a6f1442193344dc6118e6841)

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/ORG/PROJECT.git
$ cd PROJECT
```

For Windows users in packege.json:

```sh
  "scripts": {
      "start": "set NODE_PATH=./dist && node ./dist/index.js",
      "dev": "nodemon",
      "build": "del /S /Q dist && tsc -p tsconfig.json",
      "prod": "npm run build && npm run start",
      "dk-generate": "drizzle-kit generate:pg",
      "dk-deploy": "ts-node --require tsconfig-paths/register .drizzle/migrator.ts",
      "dk-dev": "ts-node --require tsconfig-paths/register src/db/clinicQueryPush.ts"
    },
```

To install run:

```sh
$ npm install
```

## Usage

### Serving the app and building a distribution version

```sh
$ npm run build
```

This task will create a distribution version of the project
inside your local `dist/` folder

    After this, project opens at http://localhost:5000 If not, just open a new tab in your browser and paste there

http://localhost:5000
