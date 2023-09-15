`PhotoDrop`

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
  
  <img src="https://i.ibb.co/tzq9wqZ/login.jpg" border="0">

- Create an album
  
  <img src="https://i.ibb.co/bRjgxNF/login.jpg" border="0">
  
  All fields are required

- Album page
  
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
- All thumbnails must be watermarked like the full photo if the photo is locked.
