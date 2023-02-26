import type { VercelRequest, VercelResponse } from "@vercel/node";
import sgMail, { MailDataRequired } from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

type Body = {
  replyTo: string;
  subject: string;
  /**
   * Plain text content for the email body.
   * Gets overridden by `html` if both are provided.
   */
  text?: string;
  /**
   * HTML content for the email body. Overrides `text` if both are provided.
   */
  html?: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const { replyTo, subject, text, html } = req.body as Body;

  if (!text && !html) {
    return res.status(400).json("No text or html provided.");
  }

  const msg: MailDataRequired = {
    replyTo,
    subject,
    text: text as string,
    html,
    to: process.env.SEND_TO_EMAIL as string,
    from: process.env.SEND_FROM_EMAIL as string,
  };

  try {
    const [response] = await sgMail.send(msg);
    return res.status(response.statusCode).json(response.body);
  } catch (err: unknown) {
    return res.status(500).json(err);
  }
}
