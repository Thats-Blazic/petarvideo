import { NextResponse } from 'next/server'
import { Resend } from 'resend'

import {
  bookingEmailSubject,
  buildBookingEmailHtml,
  buildBookingEmailText,
  parseBookingBody,
} from '@/lib/booking-email'
import { BOOKING_NOTIFY_EMAIL } from '@/lib/brand'

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email is not configured yet. Add RESEND_API_KEY to your environment.' },
      { status: 503 },
    )
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const parsed = parseBookingBody(json)
  if ('error' in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  const from = process.env.RESEND_FROM ?? 'ptr.ae Bookings <onboarding@resend.dev>'
  const to = process.env.BOOKING_TO_EMAIL ?? BOOKING_NOTIFY_EMAIL

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: parsed.email,
    subject: bookingEmailSubject(parsed),
    html: buildBookingEmailHtml(parsed),
    text: buildBookingEmailText(parsed),
  })

  if (error) {
    console.error('[booking]', error)
    return NextResponse.json({ error: 'Could not send email. Try again or email directly.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
