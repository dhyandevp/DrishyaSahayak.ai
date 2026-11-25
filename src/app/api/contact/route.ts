import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  firstName: z.string().trim().min(2, 'First name must be at least 2 characters').max(80),
  lastName: z.string().trim().min(1, 'Last name is required').max(80),
  email: z.string().trim().email('Please provide a valid email address').max(160),
  subject: z.enum(['General', 'Support', 'Partnership']),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(3000),
  website: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      );
    }

    const { website, firstName, lastName, email, subject, message } = parsed.data;

    // Honeypot spam protection: silently pretend success without forwarding spam
    if (website && website.trim().length > 0) {
      return NextResponse.json({ ok: true, mode: 'filtered' }, { status: 200 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM_EMAIL || 'Drishya Sahayak <onboarding@resend.dev>';
    const contactTo = process.env.CONTACT_TO_EMAIL || 'dhyandevp@proton.me';
    const formspreeUrl = process.env.FORMSPREE_CONTACT_ENDPOINT;

    if (resendApiKey) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: resendFrom,
          to: [contactTo],
          reply_to: email,
          subject: `[Drishya Sahayak Contact · ${subject}] ${firstName} ${lastName}`,
          text: `From: ${firstName} ${lastName} <${email}>\nSubject: ${subject}\n\n${message}`,
        }),
      });

      if (!resendRes.ok) {
        return NextResponse.json(
          { ok: false, error: 'Failed to send email via Resend. Please write directly to dhyandevp@proton.me.' },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true, mode: 'resend' }, { status: 200 });
    }

    if (formspreeUrl) {
      const fsRes = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          subject,
          message,
        }),
      });

      if (!fsRes.ok) {
        return NextResponse.json(
          { ok: false, error: 'Failed to forward form via Formspree.' },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true, mode: 'formspree' }, { status: 200 });
    }

    // Local/preview fallback when neither RESEND_API_KEY nor FORMSPREE_CONTACT_ENDPOINT is set
    console.info('[Drishya Sahayak Contact Submission]', {
      firstName,
      lastName,
      email,
      subject,
      messageLength: message.length,
    });

    return NextResponse.json({ ok: true, mode: 'local-preview' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request payload.' },
      { status: 400 }
    );
  }
}
