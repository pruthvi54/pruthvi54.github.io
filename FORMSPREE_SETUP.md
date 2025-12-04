# Formspree Setup Instructions for CV Request Feature

This document explains how to set up Formspree to enable the "Request CV" feature on your website.

## What is Formspree?

Formspree is a form backend service that handles form submissions without requiring you to write server-side code. When someone submits the CV request form, Formspree will:
- Receive the form data
- Send you an email notification with the requester's details
- Redirect the user to a success page

## Setup Steps

### 1. Create a Formspree Account

1. Go to [https://formspree.io/](https://formspree.io/)
2. Click "Get Started" or "Sign Up"
3. Create a free account (no credit card required for basic usage)
4. Verify your email address

### 2. Create a New Form

1. Once logged in, click "+ New Form" or "Create Form"
2. Give your form a name, e.g., "CV Request Form"
3. Formspree will generate a unique Form ID (looks like: `mabcd1234`)
4. **Copy this Form ID** - you'll need it in the next step

### 3. Configure Your Website

1. Open the file: `src/pages/RequestCVPage.tsx`
2. Find line 23 (or search for `YOUR_FORMSPREE_ID`)
3. Replace:
   ```tsx
   action="https://formspree.io/f/YOUR_FORMSPREE_ID"
   ```
   with:
   ```tsx
   action="https://formspree.io/f/mabcd1234"
   ```
   (Replace `mabcd1234` with your actual Form ID)

### 4. Update Success Redirect URL (Optional but Recommended)

1. In the same file (`RequestCVPage.tsx`), find line 38
2. Update the redirect URL to match your actual GitHub Pages domain:
   ```tsx
   value="https://YOUR_USERNAME.github.io/request-success"
   ```
   For example:
   ```tsx
   value="https://pruthvi54.github.io/request-success"
   ```

### 5. Configure Formspree Settings (Optional)

In your Formspree dashboard, you can:

#### Email Notifications
- **Default**: Formspree sends submissions to the email associated with your account
- **Custom Email**: You can set up forwarding to a different email
- Go to Form Settings → Email Notifications

#### Spam Protection
- **reCAPTCHA**: Add Google reCAPTCHA for extra protection
- Go to Form Settings → Spam Protection
- Free tier includes basic spam filtering

#### Custom Redirect
- You can also set the redirect URL in Formspree dashboard instead of the code
- Go to Form Settings → Redirects

#### Email Templates
- Customize the email you receive when someone submits
- Go to Form Settings → Email Templates

### 6. Test Your Form

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add Request CV feature with Formspree integration"
   git push origin main
   ```

2. Wait for GitHub Pages to deploy (2-5 minutes)

3. Visit your website and test:
   - Go to the "Me" page
   - Click "Request CV" button
   - Fill out the form with test data
   - Submit the form
   - You should be redirected to the success page
   - Check your email for the submission

### 7. Monitor Submissions

You can view all form submissions in your Formspree dashboard:
- Go to your form in the dashboard
- Click "Submissions" tab
- See all requests with timestamps and data

## Free Tier Limits

Formspree's free tier includes:
- **50 submissions per month** (more than enough for a personal website)
- Unlimited forms
- Basic spam filtering
- Email notifications
- File uploads (up to 10MB)

If you need more submissions, paid plans start at $10/month for 1,000 submissions.

## Security & Privacy

### What's Protected:
- ✅ Your email is **NOT exposed** in the HTML source code
- ✅ Form submissions are encrypted (HTTPS)
- ✅ Honeypot field included for spam prevention
- ✅ No personal data stored in your GitHub repository

### Best Practices:
- Check spam folder for legitimate submissions
- Respond to CV requests within 24-48 hours
- Keep your Formspree account secure with a strong password
- Enable 2FA on your Formspree account (recommended)

## Troubleshooting

### Form Not Submitting
- Check that you replaced `YOUR_FORMSPREE_ID` with your actual Form ID
- Ensure your Formspree account is verified
- Check browser console for errors (F12 → Console)

### Not Receiving Emails
- Check your spam/junk folder
- Verify your email in Formspree settings
- Check Formspree dashboard → Submissions to confirm receipt

### Redirect Not Working
- Ensure the `_redirect` URL is correct and matches your domain
- Wait a few minutes for GitHub Pages to deploy changes
- Clear browser cache

## Alternative: Test Without Formspree

If you want to test the form UI without setting up Formspree:

1. In `RequestCVPage.tsx`, change the form action to:
   ```tsx
   action="#"
   onSubmit={(e) => {
     e.preventDefault();
     window.location.href = '/request-success';
   }}
   ```

2. This will redirect to success page without actually sending data (for testing UI only)

## Support

- **Formspree Documentation**: [https://help.formspree.io/](https://help.formspree.io/)
- **Formspree Support**: support@formspree.io
- **Form Alternatives**: 
  - Netlify Forms (if hosting on Netlify)
  - Google Forms (free, but different UX)
  - EmailJS (alternative service)

---

## Summary Checklist

- [ ] Create Formspree account
- [ ] Create new form and copy Form ID
- [ ] Replace `YOUR_FORMSPREE_ID` in `RequestCVPage.tsx`
- [ ] Update redirect URL to match your domain
- [ ] Commit and push changes
- [ ] Test form submission
- [ ] Check email for notification
- [ ] Verify success page redirect works

---

**Need Help?** If you encounter any issues, feel free to check the Formspree documentation or reach out to their support team.


