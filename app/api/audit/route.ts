import { NextRequest, NextResponse } from 'next/server';

const blocked = (host: string) =>
  host === 'localhost' ||
  host.endsWith('.local') ||
  host === '0.0.0.0' ||
  host === '::1' ||
  /^127\./.test(host) ||
  /^10\./.test(host) ||
  /^192\.168\./.test(host) ||
  /^169\.254\./.test(host) ||
  /^172\.(1[6-9]|2\d|3[01])\./.test(host);
const text = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
const count = (s: string, re: RegExp) => (s.match(re) || []).length;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { url?: string },
      raw = String(body.url || '').trim();
    const start = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    if (
      !['http:', 'https:'].includes(start.protocol) ||
      blocked(start.hostname.toLowerCase())
    )
      return NextResponse.json(
        { error: 'Enter a public business website.' },
        { status: 400 },
      );
    let url = start,
      res: Response | null = null;
    for (let i = 0; i < 4; i++) {
      res = await fetch(url, {
        redirect: 'manual',
        headers: {
          'User-Agent': 'MidCoast-Web-Co-Auditor/1.0',
          Accept: 'text/html',
        },
      });
      if (res.status < 300 || res.status >= 400) break;
      const location = res.headers.get('location');
      if (!location) break;
      url = new URL(location, url);
      if (blocked(url.hostname.toLowerCase()))
        throw new Error('Unsafe redirect');
    }
    if (!res || !res.ok)
      throw new Error(`Website returned ${res?.status || 'no response'}`);
    const type = res.headers.get('content-type') || '';
    if (!type.includes('text/html'))
      throw new Error('URL is not an HTML website');
    const html = (await res.text()).slice(0, 1_500_000),
      plain = text(html),
      lower = plain.toLowerCase();
    const hrefs = [...html.matchAll(/href=["']([^"'#]+)["']/gi)].map(
      (m) => m[1],
    );
    const internal = hrefs.filter(
      (h) => h.startsWith('/') || h.includes(url.hostname),
    );
    const signals = {
      pages: new Set(internal.map((h) => h.split(/[?#]/)[0])).size,
      forms: count(html, /<form\b/gi),
      phone: count(html, /(href=["']tel:|\b0[23478]\d{8}\b)/gi),
      serviceTerms: count(
        lower,
        /service|plumb|drain|gas|hot water|emergency|commercial/gi,
      ),
      locationTerms: count(
        lower,
        /locations?|service areas?|forster|tuncurry|taree|nabiac/gi,
      ),
      proofTerms: count(
        lower,
        /reviews?|testimonials?|licensed|licence|years experience|projects?|case stud/gi,
      ),
      headings: count(html, /<h[12]\b/gi),
      images: count(html, /<img\b/gi),
      schema: /application\/ld\+json/i.test(html),
      title: /<title[\s>]/i.test(html),
      description: /<meta[^>]+name=["']description["']/i.test(html),
      quoteFlow:
        /<form\b/i.test(html) ||
        /request (a )?(quote|callback)|book (a )?service|enquire/i.test(lower),
    };
    const comprehensive =
      signals.pages >= 6 && signals.serviceTerms >= 8 && signals.quoteFlow;
    const scores = [
      Math.min(82, 42 + signals.images * 2),
      Math.min(86, 38 + signals.proofTerms * 6),
      Math.min(
        88,
        40 + (signals.quoteFlow ? 25 : 0) + Math.min(signals.phone, 3) * 5,
      ),
      Math.min(
        90,
        35 +
          Math.min(signals.pages, 12) * 3 +
          (signals.title ? 8 : 0) +
          (signals.description ? 6 : 0),
      ),
      Math.min(
        88,
        35 + Math.min(signals.locationTerms, 10) * 4 + (signals.schema ? 8 : 0),
      ),
      Math.min(
        86,
        38 +
          Math.min(signals.headings, 12) * 2 +
          Math.min(signals.serviceTerms, 12) * 2,
      ),
      Math.min(
        86,
        45 + (res.url.startsWith('https:') ? 12 : 0) + (signals.schema ? 8 : 0),
      ),
    ];
    const issues: string[] = [];
    if (!signals.quoteFlow)
      issues.push('No clear quote or callback pathway detected');
    if (signals.proofTerms < 2)
      issues.push('Customer proof and trust signals appear limited');
    if (signals.pages < 5)
      issues.push('Thin page structure may limit service search visibility');
    if (!signals.description) issues.push('Meta description was not detected');
    if (issues.length < 3)
      issues.push(
        'Manually review mobile presentation, page speed and form delivery before outreach',
      );
    const opportunities = [
      signals.proofTerms < 4
        ? 'Strengthen visible reviews, licences and project proof'
        : 'Turn existing proof into stronger conversion sections',
      signals.locationTerms < 4
        ? 'Add verified service-area coverage'
        : 'Improve priority location pages with unique local proof',
      signals.quoteFlow
        ? 'Optimise the existing enquiry journey and measure conversions'
        : 'Add a fast quote or callback flow',
    ];
    return NextResponse.json({
      checkedAt: new Date().toISOString(),
      finalUrl: res.url,
      classification: comprehensive
        ? 'Established website — optimisation only'
        : 'Website opportunity — manual review required',
      signals,
      scores: scores.map(Math.round),
      issues,
      opportunities,
      salesAngle: comprehensive
        ? 'This business already has meaningful service, location and enquiry infrastructure. Do not pitch a missing website or automatic rebuild; only contact them with a specific, verified optimisation opportunity.'
        : 'The website has a usable foundation, but there may be a focused opportunity to improve trust, search coverage and the path to enquiry. Verify the findings before contacting them.',
      warning:
        'Automated structural check only. Visual quality, rankings, reviews, business facts and form delivery still require verification.',
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Website check failed' },
      { status: 422 },
    );
  }
}

