import React from 'react'

interface EmailTemplateProps {
  firstName: string
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ firstName }) => (
  <div>
    <p>Hello {firstName},</p>
    <p>
      Your appointment request has been successfully received. We will get back
      to you shortly.
    </p>
  </div>
)
