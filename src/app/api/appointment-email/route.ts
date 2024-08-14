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
    const { patient_name, patient_email, appointment_date } =
      await request.json()

    if (!patient_name || !patient_email || !appointment_date) {
      return NextResponse.json(
        { error: 'Patient name, email, and appointment date are required' },
        { status: 400 },
      )
    }

    const emailContent = `
      Hey ${patient_name}!
      
      Your appointment has been booked successfully for ${appointment_date}.
      We will get back to you soon after your appointment approval.

      Thank you 🙏😁
      (Admin)
    `

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: patient_email,
      subject: 'Appointment Confirmation',
      text: emailContent,
    })

    return NextResponse.json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error in send-email API:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
