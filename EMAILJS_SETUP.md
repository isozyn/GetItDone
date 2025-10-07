# EmailJS Setup Guide

This guide will help you set up EmailJS to handle contact form submissions for the GetItDone project.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (you'll need this later)

## Step 3: Create an Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{from_phone}}

Subject: {{subject}}

Message:
{{message}}

---
This message was sent from the GetItDone contact form.
```

4. Save the template and note down your **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" → "General" in your EmailJS dashboard
2. Find your **Public Key** (User ID)

## Step 5: Update Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Navigate to the contact page
3. Fill out and submit the form
4. Check your email to see if you received the message

## Security Notes

- The `.env` file is already added to `.gitignore` to keep your credentials safe
- For production deployment, set these environment variables in your hosting platform
- EmailJS free tier allows 200 emails per month

## Troubleshooting

- **Form not sending**: Check browser console for errors
- **Template not working**: Ensure template variable names match exactly
- **Service errors**: Verify your email service is properly connected in EmailJS dashboard

## Template Variables Available

The contact form sends these variables to your EmailJS template:
- `from_name` - User's name
- `from_email` - User's email
- `from_phone` - User's phone number
- `subject` - Message subject
- `message` - Message content
- `to_name` - Set to "GetItDone Team"