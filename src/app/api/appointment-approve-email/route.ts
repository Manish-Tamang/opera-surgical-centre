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
      Dear ${patient_name},

      We are pleased to inform you that your appointment on ${appointment_date} has been approved.

      Thank you,
      (Admin)
    `

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: patient_email,
      subject: 'Appointment Approved',
      text: emailContent,
    })

    return NextResponse.json({ message: 'Approval email sent successfully' })
  } catch (error) {
    console.error('Error in appointment-approve-email API:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
