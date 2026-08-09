import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

/**
 * Contact-form lead pipeline.
 *
 * 1. Validates the payload (name, phone, email, message required; company /
 *    location optional).
 * 2. ALWAYS logs the lead with a `LEAD:` prefix so no lead is ever lost
 *    (visible in `wrangler tail` / Cloudflare logs).
 * 3. Forwards in the background (waitUntil) to the Tyashin Contact Form &
 *    Lead Capture plugin endpoint with the server-side API key.
 * 4. Always responds fast — forwarding never blocks the response.
 */

type LeadPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  location?: unknown;
  message?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const name = str(body.name, 100);
  const company = str(body.company, 200);
  const email = str(body.email, 200);
  const phone = str(body.phone, 40);
  const location = str(body.location, 200);
  const message = str(body.message, 5000);

  if (!name) {
    return NextResponse.json({ ok: false, error: 'Name is required' }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'A valid email is required' }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json({ ok: false, error: 'Phone is required' }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ ok: false, error: 'Requirement is required' }, { status: 400 });
  }

  const lead = {
    name,
    company: company || undefined,
    email,
    phone,
    location: location || undefined,
    message,
    submittedAt: new Date().toISOString(),
  };

  // Insurance: the lead is ALWAYS visible in worker logs, even if platform
  // forwarding is unavailable or fails.
  console.log('LEAD:', JSON.stringify(lead));

  try {
    const { env, ctx } = getCloudflareContext();
    const apiKey =
      ((env as Record<string, unknown>).TYASHIN_API_KEY as string) ?? process.env.TYASHIN_API_KEY;
    const apiUrl =
      ((env as Record<string, unknown>).TYASHIN_API_URL as string) ??
      process.env.TYASHIN_API_URL ??
      'https://website-api.tyashin.com';

    if (typeof apiKey === 'string' && apiKey.length > 0) {
      const forward = fetch(`${apiUrl}/api/v1/contact/public/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject: `Scaffolding enquiry${company ? ` — ${company}` : ''}${location ? ` (${location})` : ''}`,
          message,
          source: 'bharat-scaffolding-website-contact',
          pageUrl: request.headers.get('referer') || undefined,
          metadata: { company, location },
        }),
      })
        .then((res) => {
          if (!res.ok) {
            console.log(
              `LEAD: platform forward failed with status ${res.status} — lead preserved in log above`
            );
          }
        })
        .catch((err) => {
          console.log(
            `LEAD: platform forward errored (${String(err)}) — lead preserved in log above`
          );
        });
      ctx.waitUntil(forward);
    } else {
      console.log('LEAD: no TYASHIN_API_KEY binding — log-only fallback used');
    }
  } catch {
    console.log('LEAD: no Cloudflare context — log-only fallback used');
  }

  return NextResponse.json({ ok: true });
}
