import { defineTool } from "@lovable.dev/mcp-js";
import { faqs } from "../content";

export default defineTool({
  name: "get_faq",
  title: "Get FAQ",
  description:
    "Return frequently asked questions and answers about maintenance, timelines, security, tooling, and pricing.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ faqs }, null, 2) }],
    structuredContent: { faqs },
  }),
});
