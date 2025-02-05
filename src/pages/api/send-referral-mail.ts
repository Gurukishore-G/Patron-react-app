import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { SMTPClient } from 'emailjs';

interface EmailAttachment {
  filename: string;
  content: Buffer;
}

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, we'll use formidable
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let mailOptions = {
    from: '',
    to: '',
    subject: '',
    text: '',
    attachments: [] as EmailAttachment[]
  };

  try {
    // Parse form data
    const form = new formidable.IncomingForm();
    const { fields, files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    // Setup email data
    mailOptions = {
      from: process.env.EMAIL_USER ?? '',
      to: Array.isArray(fields.to) ? fields.to[0] : fields.to ?? '',
      subject: Array.isArray(fields.subject) ? fields.subject[0] : fields.subject ?? '',
      text: Array.isArray(fields.body) ? fields.body[0] : fields.body ?? '',
      attachments: []
    };

    // Add resume if provided
    if (files.resume) {
      const resumeFile = Array.isArray(files.resume) ? files.resume[0] : files.resume;
      mailOptions.attachments.push({
        filename: resumeFile.originalFilename ?? 'resume',
        content: fs.readFileSync(resumeFile.filepath) // Read file content
      });
    }

    // Create SMTP client
    const client = new SMTPClient({
      host: 'smtp.gmail.com',
      port: 587,
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
    });

    // Connect and send email
    await new Promise((resolve, reject) => {
      client.send(
        {
          from: mailOptions.from,
          to: mailOptions.to,
          subject: mailOptions.subject,
          text: mailOptions.text,
          attachment: mailOptions.attachments.map(att => ({
            data: att.content.toString('base64'),
            name: att.filename,
          })),
        },
        (err, message) => {
          if (err) reject(err);
          else resolve(message);
        }
      );
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Detailed email sending error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      to: mailOptions.to,
      subject: mailOptions.subject,
      body: mailOptions.text,
    });
    res.status(500).json({ 
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}