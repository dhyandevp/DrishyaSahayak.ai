import { NextResponse } from 'next/server';
import { z } from 'zod';

const waitlistSchema = z.object({
  name: z.string().trim().min(2, 'Please provide your name').max(120),
  email: z.string().trim().email('Please provide a valid email address').max(160),
  message: z.string().trim().max(1500).optional().default(''),
  website: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid waitlist details' },
        { status: 400 }
      );
    }

    const { website, name, email, message } = parsed.data;

    // Honeypot check
    if (website && website.trim().length > 0) {
      return NextResponse.json({ ok: true, mode: 'filtered' }, { status: 200 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM_EMAIL || 'Drishya Sahayak <onboarding@resend.dev>';
    const contactTo = process.env.CONTACT_TO_EMAIL || 'dhyandevp@proton.me';
    const formspreeUrl = process.env.FORMSPREE_WAITLIST_ENDPOINT || process.env.FORMSPREE_CONTACT_ENDPOINT;

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
          subject: `[Drishya Glasses Waitlist] ${name}`,
          text: `Waitlist signup for Wearable Smart-Glasses Edition:\n\nName: ${name}\nEmail: ${email}\nNotes: ${
            message || '(none)'
          }`,
        }),
      });

      if (!resendRes.ok) {
        return NextResponse.json(
          { ok: false, error: 'Failed to submit waitlist entry via Resend.' },
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
          form: 'glasses-waitlist',
          name,
          email,
          message,
        }),
      });

      if (!fsRes.ok) {
        return NextResponse.json(
          { ok: false, error: 'Failed to record waitlist via Formspree.' },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true, mode: 'formspree' }, { status: 200 });
    }

    console.info('[Drishya Sahayak Waitlist Submission]', {
      name,
      email,
      hasMessage: Boolean(message),
    });

    return NextResponse.json({ ok: true, mode: 'local-preview' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request payload.' },
      { status: 400 }
    );
  }
}
