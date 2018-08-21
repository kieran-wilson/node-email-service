# Overview
This project was sent to me as a tech challenge, I also used it as an opportunity to practice more
with react context providers and consumers.

The site is actually currently deployed at: [https://dauvp99euz6a5.cloudfront.net](https://dauvp99euz6a5.cloudfront.net/send-email)

The key I have used for now is 123456

### Deployment
API: 
- Inside server is the secrets folder, and that needs a file called secrets.json, a sample is provided but
it will store your secrets used for deployment, so first configure that file as necessary
```
cd server
yarn install
serverless deploy
```
The api is done first because you will need to update the .env in
the public folder with the url after it has been deployed

Public Site
- Update .env first
```
cd public
yarn install
serverless deploy
serverless syncToS3
```
To get the url of the deployed public site run: `sls domainInfo`

### Hiccups
Mailgun doesn't support rest, atleast in any documentation I could find, it only seems to support formdata,
which node doesnt have a native way of doing, and I am unfamiliar with handcrafting formdata requests so got
slightly delayed by that, especially then not realising that when you use formdata you have to set a custom
header which took me a while to discover. To resolve the above if I was to do it again, I would probably
use [request](https://www.npmjs.com/package/request) instead of axios, because I believe request supports
form data out of the box.

### Improvements / TODOs
- Prop type validations on all of the components would be the first thing I would do.
- I handcrafted the addemail component which was fun, but I need to have it autoadd the email upon
submit, because it is confusing if there is an email there but not yet added
- Some tests on the scenes would be second
- Create atleast an automated deployment method which would be pretty straightforward because it only
requires a couple of commands
- Transpiling of the /server code so that I could use arrow functions and use the same code completely
interchangeably
- Tests of the server code
- Finally I would just go through and clean the code up a bit, I did start feeling quite rushed
especially after going down the form data rabbit hole

#### Project Description


Create a service (backend + frontend) that accepts the necessary information and sends emails.

The application should provide an abstraction between two different email service providers.

If one of the services goes down, your service can quickly failover to a different provider without affecting your customers.

Email Providers:

Mailgun

SendGrid

Your solution should cater for multiple email recipients, CCs and BCCs but there is no need to support HTML email body types (plain text is OK)

BACKEND

The backend should be implemented as one or more RESTful API calls (see technology constraints below).

- No authentication is required for the scope of this exercise

- No 3rd party client library should be used to integrate with Mailgun or Sendgrid. A simple HTTP client of choice can be used to handcraft HTTP requests to the email gateway services.

FRONTEND
 
The frontend should ideally be a Single page Web App (see technology constraints below).

- The Sendgrid / Mailgun API credentials should not be leaked to the frontend

- There is no need to minify/uglify the JS code.

- Most modern browsers (Chrome latest / FF latest / IE10+) should be supported

- User friendly feedback in case of errors and/or success must be provided

- Please make sure the UI looks pleasant enough to be usable, without spending too much time (off the shelf CSS solutions like bootstrap / foundation etc. can work in your favour)

SCOPE
 

This challenge has a frontend, backend or full stack path. If you choose a frontend or backend path you will be required to provide a more complete solution. If you choose a full-stack path, non crucial features can be left unimplemented and listed in the TODO section of the readme file. In any case be ready to discuss the production readiness of you solution in your job interview (what’s missing / why etc)

We respect your time and don't want you spending more than a few hours on this challenge.

 

TECHNOLOGY CONSTRAINTS
 

Frontend and/or backend technologies should be as agreed upon with the recruiter.