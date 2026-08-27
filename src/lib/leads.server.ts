const SHEETS_GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";
const GMAIL_GATEWAY = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

export const SPREADSHEET_ID = "1Ru0qymUCDu7qPJv0MON-rSON5X02xN3-073mvz4XbVY";
export const NOTIFY_EMAIL = "puneetbhatia77@gmail.com";

export type LeadInput = {
  name: string;
  email: string;
  details: string;
  source: string;
};

const b64 = (s: string) =>
  btoa(Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join(""));

const header = (v: string) => (/^[\x00-\x7F]*$/.test(v) ? v : `=?UTF-8?B?${b64(v)}?=`);

function rawEmail(to: string, replyTo: string, subject: string, body: string) {
  const message = [
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${header(subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    body,
  ].join("\r\n");
  return b64(message).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function assertOk(res: Response, label: string) {
  if (!res.ok) {
    const text = await res.text();
    console.error(`${label} failed [${res.status}]: ${text}`);
    throw new Error(`${label} failed [${res.status}]: ${text}`);
  }
}

export async function appendLeadToSheet(lead: LeadInput, submittedAt: string) {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const sheetsKey = process.env["GOOGLE_SHEETS_API_KEY"];
  if (!lovableKey || !sheetsKey) throw new Error("Google Sheets connection is not configured");

  const res = await fetch(
    `${SHEETS_GATEWAY}/spreadsheets/${SPREADSHEET_ID}/values/Leads!A:F:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": sheetsKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [
          [submittedAt, lead.name, lead.email, lead.details, lead.source, "nexflow-ai landing"],
        ],
      }),
    },
  );
  await assertOk(res, "Google Sheets append");
}

export async function emailLeadNotification(lead: LeadInput, submittedAt: string) {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const gmailKey = process.env["GOOGLE_MAIL_API_KEY"];
  if (!lovableKey || !gmailKey) throw new Error("Gmail connection is not configured");

  const body = [
    "New free consultation request from your website.",
    "",
    `Name:    ${lead.name}`,
    `Email:   ${lead.email}`,
    `Source:  ${lead.source}`,
    `Time:    ${submittedAt}`,
    "",
    "Details:",
    lead.details || "(none provided)",
    "",
    `Logged in your leads sheet: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`,
  ].join("\n");

  const res = await fetch(`${GMAIL_GATEWAY}/users/me/messages/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gmailKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      raw: rawEmail(
        NOTIFY_EMAIL,
        lead.email,
        `New consultation request — ${lead.name}`,
        body,
      ),
    }),
  });
  await assertOk(res, "Gmail send");
}
