import type { VercelRequest, VercelResponse } from "@vercel/node";
import sgMail, { MailDataRequired } from "@sendgrid/mail";
import * as zod from "zod";

export function isMethodSupported(method?: string) {
  return method === "POST";
}

export function validateSecretKey(secretKey?: string) {
  if (!process.env.SECRET_KEY)
    throw new Error(
      "SECRET_KEY is not set up. Please set up the environment variable via Vercel project dashboard."
    );

  if (!secretKey) return false;

  return secretKey === process.env.SECRET_KEY;
}

export const bodySchema = zod
  .object({
    subject: zod.string(),
    replyTo: zod.string().email(),
    text: zod.string().optional(),
    html: zod.string().optional(),
  })
  .refine(({ text, html }) => text || html, {
    message: "No text or html provided.",
    path: ["text", "html"],
  });

export type Body = zod.infer<typeof bodySchema>;

/**
 * Performs input validation using a zod schema
 */
export function validateInput(body: any) {
  return bodySchema.safeParse(body);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (isMethodSupported(req.method))
    return res.status(405).json({ message: "Method Not Allowed" });

  const { replyTo, subject, text, html } = req.body as Body;

  const inputValidation = validateInput(req.body);

  if (!inputValidation.success) {
    return res.status(400).json(inputValidation["error"]);
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
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

    const [response] = await sgMail.send(msg);
    return res.status(response.statusCode).json(response.body);
  } catch (err: unknown) {
    return res.status(500).json(err);
  }
}
