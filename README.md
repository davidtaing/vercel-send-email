# Vercel Send Email

Send emails using the SendGrid API on a Vercel Serverless Function.


## Background

At Code.Sydney, I mentor beginner programmers and help them build the skills that they need to get a job in Software.

One of our mentees was trying to implement a `Contact Me` form where an email would be sent to himself when the form is submitted. 

Implementing a backend would be fairly difficult for someone who has just started learning HTML, CSS and JS. So I built this project to allow beginners to programmatically send emails without having to build a backend.


# Using the Serverless Function

TODO

# Setup

## Setting Up the Repository

To get started click on the green `Use this template` button to create a new repository under your account.


## Environment Variables

Before we get into the setup instructions, here is a quick overview of the Enviornment Variables for this project. Environment Variable are used to pass in sensitive configuration settings to an application.

- `SECRET_KEY` - this will be used to authorize requests. A strong key can be generated using `openssl rand -base64 32`
- `SENDGRID_API_KEY` - used to authorize requests to the SendGrid API
- `SEND_TO_EMAIL` - this is where you want to send your emails.
- `SEND_FROM_EMAIL` - sender identity


**Local Environment Variables**

I've left an [`.env.example`](https://github.com/davidtaing/vercel-send-email/blob/main/.env.example) file in the root directory in case you need to run this project locally. Copy and paste the file with the name `.env`.

**Note: Any changes to the `.env.example` file will be checked into Git. Be careful that you don't check-in any secrets such as API keys.**

We'll use the `.env` file to temporarily hold onto our secrets from the following steps.


# Setup - Video Guide

TODO: to be recorded at a later date.


# Setup - Text Guide

This template requires accounts with Vercel and SendGrid.


## Create a Vercel Account
https://vercel.com/signup

This one is rather straightforward. Since we'll need to connect our GitHub project to Vercel, I'll recommend creating an account using your GitHub login.


## Setup a SendGrid Account - Free Tier Allows 100 Emails Per Day

`Create an Account` -> `Create a Sender Identity` -> `Create an API Key`

### Create an Account
https://signup.sendgrid.com/


### Create a Sender Identity
https://app.sendgrid.com/settings/sender_auth/senders/new

Your sender identity is the “from” email address your recipients see in their inbox. 

Note: SendGrid will throw an error if you use an email that is not setup as a sender identity.


### Create an API Key
https://app.sendgrid.com/settings/api_keys

This key will be used to authorize requests to the SendGrid API.

I'll recommend setting the key access to only Email Send.

[Email send access settings](https://user-images.githubusercontent.com/8443215/221404298-c2720e7b-056d-40e5-b484-7ae2645f2297.png)


## Deploying the Project to Vercel

`Login to Vercel` -> `New Project Button` -> `Import Gihub Repository` -> `Deploy`

- Login to Vercel and navigate to your Vercel Dashboard.
- [New Project Button](https://user-images.githubusercontent.com/8443215/221405846-d06c97c1-079d-4b3a-b15f-0ea6ac7b64c6.png)
- [Import Gihub Repository](https://user-images.githubusercontent.com/8443215/221405909-301d9a65-2de6-4914-840f-dafc08b2a9af.png) 
- [Deploy](https://user-images.githubusercontent.com/8443215/221405924-18d50492-455a-4cbc-887d-7cd8b9d2f5ea.png)


## Setting up the Environment Variables on Your Vercel Deployment
Relevant Docs: https://vercel.com/docs/concepts/projects/environment-variables#

Okay, now want to add our environment variables to our Vercel project. 

Navigate to the Environment Variables menu and copy and paste in your Enviroment Variables from the `.env` file. Alternatively, you could enter them one by one.

`Select Project` -> `Settings` -> `Environment Variables`

- [Selecting Project from Dashboard](https://user-images.githubusercontent.com/8443215/221405967-3f3fe9a9-917d-4580-93db-c4d18711976f.png)
- [Settings](https://user-images.githubusercontent.com/8443215/221405974-7f615bde-e5a6-45ef-8ac8-e5430b741f37.png)
- [Environment Variables](https://user-images.githubusercontent.com/8443215/221405991-f983ce13-99b3-48dd-a78f-2d49f4a765ef.png)
- [Filled-In Environment Variables Menu](https://user-images.githubusercontent.com/8443215/221406063-669b6b4d-a4a6-4e7a-9c05-e8ebee878ca9.png)

## Redeploying Your Vercel Deployment

Okay, nearly there! The environment variables haven't been loaded into our deployment yet. Let's redeploy the Vercel project to update the changes.

`Select Project` -> `Deployments` -> `Deployment Dropdown Menu` -> `Redeploy`

![image](https://user-images.githubusercontent.com/8443215/221406085-1f8e5641-4861-402d-9aec-6db10e66954e.png)

# 🎉🎉🎉 Now we're done! We can now use the Serverless function to send emails.

