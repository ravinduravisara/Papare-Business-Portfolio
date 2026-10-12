import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';
import type { IInquiry } from '../models/Inquiry.js';

let transporter: nodemailer.Transporter | null = null;

if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASSWORD) {
  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  });
}

export async function sendInquiryNotification(inquiry: IInquiry): Promise<boolean> {
  if (!transporter) {
    logger.info(
      `[EmailService] SMTP not fully configured. Inquiry notification logged: ${inquiry.fullName} (${inquiry.email}) for ${inquiry.service}`
    );
    return false;
  }

  try {
    const mailOptions = {
      from: `"ThePapare Events System" <${env.SMTP_USER}>`,
      to: env.ADMIN_NOTIFICATION_EMAIL,
      subject: `[New Inquiry] ${inquiry.fullName} - ${inquiry.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #0B0B0F; border-bottom: 2px solid #E63946; padding-bottom: 10px;">New Project Inquiry Received</h2>
          <p><strong>Full Name:</strong> ${inquiry.fullName}</p>
          <p><strong>Company:</strong> ${inquiry.company}</p>
          <p><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
          <p><strong>Phone:</strong> ${inquiry.phone}</p>
          <p><strong>Service Required:</strong> ${inquiry.service}</p>
          <p><strong>Target Project Date:</strong> ${inquiry.projectDate || 'Not specified'}</p>
          <p><strong>Estimated Budget:</strong> ${inquiry.budget || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f7f7f7; padding: 15px; border-left: 4px solid #E63946; border-radius: 4px;">
            ${inquiry.message.replace(/\n/g, '<br/>')}
          </div>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">ThePapare Events - Experience Beyond Events</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`[EmailService] Notification sent for inquiry ${inquiry._id}`);
    return true;
  } catch (error) {
    logger.error('[EmailService] Failed to send email notification:', error);
    // Don't throw, return false so inquiry is preserved
    return false;
  }
}

