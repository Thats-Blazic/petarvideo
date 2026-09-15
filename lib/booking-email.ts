import { formatDuration } from '@/lib/duration'
import { formatPrice } from '@/lib/pricing'

export type BookingRequestPayload = {
  name: string
  email: string
  quantity: number
  durationSeconds: number
  budget: string
  deadline: string
  details: string
  estimatedTotal: number
}

export function parseBookingBody(body: unknown): BookingRequestPayload | { error: string } {
  if (!body || typeof body !== 'object') return { error: 'Invalid request body.' }

  const data = body as Record<string, unknown>
  const name = typeof data.name === 'string' ? data.name.trim() : ''
  const email = typeof data.email === 'string' ? data.email.trim() : ''
  const details = typeof data.details === 'string' ? data.details.trim() : ''
  const budget = typeof data.budget === 'string' ? data.budget.trim() : ''
  const deadline = typeof data.deadline === 'string' ? data.deadline.trim() : ''
  const quantity = typeof data.quantity === 'number' ? data.quantity : Number(data.quantity)
  const durationSeconds =
    typeof data.durationSeconds === 'number' ? data.durationSeconds : Number(data.durationSeconds)
  const estimatedTotal =
    typeof data.estimatedTotal === 'number' ? data.estimatedTotal : Number(data.estimatedTotal)

  if (!name || name.length < 2) return { error: 'Please enter your name.' }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Please enter a valid email.' }
  if (!details || details.length < 10) return { error: 'Please add a few more details about your project.' }
  if (!Number.isFinite(quantity) || quantity < 1 || quantity > 20) return { error: 'Invalid number of animations.' }
  if (!Number.isFinite(durationSeconds) || durationSeconds < 1 || durationSeconds > 7200) {
    return { error: 'Invalid animation length.' }
  }
  if (!Number.isFinite(estimatedTotal) || estimatedTotal < 0) return { error: 'Invalid price estimate.' }

  return {
    name,
    email,
    quantity,
    durationSeconds,
    budget,
    deadline,
    details,
    estimatedTotal,
  }
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:12px 0;border-bottom:1px solid #eee;color:#111;font-size:15px;line-height:1.5;">${value}</td>
    </tr>`
}

export function bookingEmailSubject(payload: BookingRequestPayload) {
  const length = formatDuration(payload.durationSeconds)
  return `New ptr.ae booking — ${payload.name} · ${length}`
}

export function buildBookingEmailHtml(payload: BookingRequestPayload) {
  const length = formatDuration(payload.durationSeconds)
  const perPiece = formatPrice(payload.durationSeconds)
  const deadline = payload.deadline || 'Not specified'
  const budget = payload.budget || 'Not specified'
  const qtyLine =
    payload.quantity > 1
      ? `${payload.quantity} animations × ${length} (${perPiece} each)`
      : `${length} (${perPiece})`

  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e8e8ed;">
            <tr>
              <td style="padding:28px 28px 8px;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:0.2em;color:#007AFF;">PTR.AE</p>
                <h1 style="margin:0;font-size:26px;font-weight:600;letter-spacing:-0.03em;color:#111;">New booking request</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${row('Name', escapeHtml(payload.name))}
                  ${row('Email', `<a href="mailto:${escapeHtml(payload.email)}" style="color:#007AFF;text-decoration:none;">${escapeHtml(payload.email)}</a>`)}
                  ${row('Project', escapeHtml(qtyLine))}
                  ${row('Estimated total', `<strong>€${payload.estimatedTotal}</strong> <span style="color:#888;">(€7/sec)</span>`)}
                  ${row('Budget', escapeHtml(budget))}
                  ${row('Deadline', escapeHtml(deadline))}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 28px;">
                <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#666;">Project details</p>
                <div style="background:#f5f5f7;border-radius:12px;padding:16px;font-size:15px;line-height:1.6;color:#111;white-space:pre-wrap;">${escapeHtml(payload.details)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 28px;background:#fafafa;border-top:1px solid #eee;font-size:12px;color:#888;">
                Reply directly to this email to reach ${escapeHtml(payload.name)}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export function buildBookingEmailText(payload: BookingRequestPayload) {
  const length = formatDuration(payload.durationSeconds)
  return [
    'New ptr.ae booking request',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Animations: ${payload.quantity}`,
    `Length each: ${length}`,
    `Estimated total: €${payload.estimatedTotal}`,
    `Budget: ${payload.budget || 'Not specified'}`,
    `Deadline: ${payload.deadline || 'Not specified'}`,
    '',
    'Project details:',
    payload.details,
  ].join('\n')
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
