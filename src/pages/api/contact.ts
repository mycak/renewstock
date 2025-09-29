import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Validation schema for the contact form
const contactFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.',
    });
  }

  try {
    // Validate environment variables
    const { SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;

    if (!SMTP_USER || !SMTP_PASS || !MAIL_TO) {
      console.error('Missing required environment variables');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error',
      });
    }

    // Validate request body
    const validationResult = contactFormSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        error:
          'Invalid form data: ' +
          validationResult.error.issues.map((err) => err.message).join(', '),
      });
    }

    const { email, phone, message }: ContactFormData = validationResult.data;

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Verify SMTP connection
    await transporter.verify();

    // Email content
    const mailOptions = {
      from: SMTP_USER,
      to: MAIL_TO,
      replyTo: email,
      subject: `Nowa wiadomość od ${email} - Formularz kontaktowy RenewStock`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
            Nowa wiadomość z formularza kontaktowego
          </h2>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Dane kontaktowe:</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefon:</strong> ${phone}</p>
          </div>

          <div style="background-color: #fff; border: 1px solid #e1e5e9; padding: 20px; border-radius: 8px;">
            <h3 style="color: #555; margin-top: 0;">Wiadomość:</h3>
            <p style="line-height: 1.6; color: #333;">${message.replace(
              /\n/g,
              '<br>'
            )}</p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background-color: #e7f3ff; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Uwaga:</strong> Aby odpowiedzieć na tę wiadomość, użyj przycisku "Odpowiedz" w swoim kliencie email lub napisz bezpośrednio na adres: ${email}
            </p>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e1e5e9;">

          <div style="text-align: center; color: #999; font-size: 12px;">
            <p>Ta wiadomość została wysłana z formularza kontaktowego na stronie RenewStock</p>
            <p>Data wysłania: ${new Date().toLocaleString('pl-PL')}</p>
          </div>
        </div>
      `,
      text: `
Nowa wiadomość z formularza kontaktowego RenewStock

Dane kontaktowe:
Email: ${email}
Telefon: ${phone}

Wiadomość:
${message}

Data wysłania: ${new Date().toLocaleString('pl-PL')}
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);

    // Return appropriate error message
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      if ('code' in error) {
        const nodeMailerError = error as Error & { code?: string };
        if (nodeMailerError.code === 'EAUTH') {
          errorMessage = 'Email authentication failed';
        } else if (nodeMailerError.code === 'ECONNECTION') {
          errorMessage = 'Email server connection failed';
        }
      } else {
        errorMessage = error.message;
      }
    }

    return res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
}
