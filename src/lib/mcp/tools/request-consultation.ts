import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "request_consultation",
  title: "Request a free consultation",
  description:
    "Submit a free AI automation consultation request. Sends the enquiry to the consultant and logs it as a new lead. Only submit with the visitor's explicit confirmation.",
  inputSchema: {
    name: z.string().trim().min(1).max(120).describe("Full name of the person requesting."),
    email: z.string().trim().email().max(200).describe("Contact email address."),
    details: z
      .string()
      .trim()
      .max(4000)
      .default("")
      .describe("Business, automation goal, and current challenge or scale."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
  handler: async ({ name, email, details }) => {
    const { appendLeadToSheet, emailLeadNotification } = await import("../../leads.server");
    const submittedAt = new Date().toISOString();
    const lead = { name, email, details: details ?? "", source: "MCP agent" };

    const results = await Promise.allSettled([
      appendLeadToSheet(lead, submittedAt),
      emailLeadNotification(lead, submittedAt),
    ]);
    const failed = results.filter((r) => r.status === "rejected");
    if (failed.length === results.length) {
      throw new ToolError("Could not record the consultation request. Please try again shortly.");
    }

    return {
      content: [
        {
          type: "text",
          text: `Consultation request received for ${name} (${email}). The team will reply by email within one business day.`,
        },
      ],
      structuredContent: { ok: true, submittedAt, partial: failed.length > 0 },
    };
  },
});
