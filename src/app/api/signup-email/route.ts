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
    const { first_name, last_name, email } = await request.json()

    if (!first_name || !last_name || !email) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required' },
        { status: 400 },
      )
    }

    const emailContent = `
      Hey ${first_name} ${last_name}!
      
      Your account has been successfully created.
      Please contact Opera Surgical Administration for account approval.

      Thank you 🙏😁
      (Admin)
    `

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Account Registration Confirmation',
      text: emailContent,
    })

    return NextResponse.json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error in signup-email API:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}

export const methods = ['POST']
