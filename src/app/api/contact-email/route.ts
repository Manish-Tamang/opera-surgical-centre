import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

export async function POST(request: Request) {
  try {
    const { email, firstName } = await request.json()

    if (!email || !firstName) {
      return NextResponse.json(
        { error: 'Email and first name are required' },
        { status: 400 },
      )
    }

    const emailContent = `
      Dear ${firstName},

      Thank you for reaching out to us!

      We have received your message and will get back to you as soon as possible.
      Your feedback is important to us, and we appreciate you taking the time to contact us.

      Best regards,
      The Opera Surgical Centre Team
    `

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Thank You for Contacting Us',
      text: emailContent,
    })

    return NextResponse.json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error in contact-email API:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
