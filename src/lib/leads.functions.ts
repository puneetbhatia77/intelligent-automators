import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  details: z.string().trim().max(4000).default(""),
  source: z.string().trim().max(80).default("Consultation form"),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { appendLeadToSheet, emailLeadNotification } = await import("./leads.server");
    const submittedAt = new Date().toISOString();

    const results = await Promise.allSettled([
      appendLeadToSheet(data, submittedAt),
      emailLeadNotification(data, submittedAt),
    ]);

    const failed = results.filter((r) => r.status === "rejected");
    if (failed.length === results.length) {
      throw new Error("Could not record your request. Please try again or email us directly.");
    }
    return { ok: true, partial: failed.length > 0 };
  });
