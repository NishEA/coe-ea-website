/**
 * Email template for new application notifications sent to the programme team.
 *
 * Data-residency rule (audit R3): Resend stores email content in the US.
 * Therefore this email contains NO founder PII — name, email, startup, phone
 * are all omitted. The recipient clicks through to the admin dashboard to
 * see the full submission.
 */

export type NewApplicationEmailProps = {
  /** Short prefix of the Supabase row UUID — used as a human-readable ref. */
  refId: string;
  /** ISO timestamp of submission. */
  submittedAt: string;
  /** Capability domain slug (e.g. "smart_manufacturing"). */
  domain: string;
  /** Stage slug (e.g. "mvp"). */
  stage: string;
  /** Full URL to the admin applications page. */
  adminUrl: string;
};

function formatDomain(slug: string): string {
  return slug
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function newApplicationEmailHtml(props: NewApplicationEmailProps): string {
  const { refId, submittedAt, domain, stage, adminUrl } = props;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New CoE-EA Application</title>
</head>
<body style="margin:0;padding:0;background:#F7F4ED;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F4ED;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #d6d3cc;">
          <!-- Header -->
          <tr>
            <td style="background:#0E2D7A;padding:24px 32px;">
              <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#F7F4ED;opacity:0.8;">
                CoE-EA · Programme Office
              </p>
              <p style="margin:6px 0 0;font-family:Georgia,serif;font-size:20px;color:#F7F4ED;">
                New incubation application
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 24px;font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#0E2D7A;">
                A new application has been submitted to the CoE-EA incubation programme.
              </p>

              <table cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e5e2db;margin-bottom:24px;">
                <tr>
                  <td style="padding:12px 16px;font-family:'Courier New',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#6b6760;background:#F7F4ED;width:140px;">
                    Reference
                  </td>
                  <td style="padding:12px 16px;font-family:'Courier New',monospace;font-size:13px;color:#0E2D7A;">
                    ${refId}
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-family:'Courier New',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#6b6760;background:#F7F4ED;border-top:1px solid #e5e2db;">
                    Submitted
                  </td>
                  <td style="padding:12px 16px;font-family:Georgia,serif;font-size:14px;color:#0E2D7A;border-top:1px solid #e5e2db;">
                    ${formatDate(submittedAt)} IST
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-family:'Courier New',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#6b6760;background:#F7F4ED;border-top:1px solid #e5e2db;">
                    Domain
                  </td>
                  <td style="padding:12px 16px;font-family:Georgia,serif;font-size:14px;color:#0E2D7A;border-top:1px solid #e5e2db;">
                    ${formatDomain(domain)}
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-family:'Courier New',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#6b6760;background:#F7F4ED;border-top:1px solid #e5e2db;">
                    Stage
                  </td>
                  <td style="padding:12px 16px;font-family:Georgia,serif;font-size:14px;color:#0E2D7A;border-top:1px solid #e5e2db;text-transform:uppercase;">
                    ${stage}
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;font-family:Georgia,serif;font-size:14px;line-height:1.6;color:#5a5750;">
                Applicant details are not included in this email per the Centre's
                data-residency policy. Review the full application in the admin dashboard.
              </p>

              <a href="${adminUrl}"
                 style="display:inline-block;background:#0E2D7A;color:#F7F4ED;font-family:'Courier New',monospace;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">
                View application &rarr;
              </a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #e5e2db;">
              <p style="margin:0;font-family:'Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:#9a9790;">
                Centre of Excellence — Efficiency Augmentation &middot; STPI Bengaluru
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function newApplicationEmailText(props: NewApplicationEmailProps): string {
  const { refId, submittedAt, domain, stage, adminUrl } = props;
  return [
    "NEW COE-EA INCUBATION APPLICATION",
    "",
    `Reference : ${refId}`,
    `Submitted : ${formatDate(submittedAt)} IST`,
    `Domain    : ${formatDomain(domain)}`,
    `Stage     : ${stage.toUpperCase()}`,
    "",
    "Applicant details are not included in this notification per the Centre's",
    "data-residency policy. View the full application at:",
    "",
    adminUrl,
    "",
    "---",
    "Centre of Excellence — Efficiency Augmentation · STPI Bengaluru",
  ].join("\n");
}
