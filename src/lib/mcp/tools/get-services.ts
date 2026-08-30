import { defineTool } from "@lovable.dev/mcp-js";
import { services, useCases } from "../content";

export default defineTool({
  name: "get_services",
  title: "Get services and use cases",
  description:
    "List the AI automation services offered (workflows, agents, chatbots, process automation) and practical use cases by business area.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ services, useCases }, null, 2) }],
    structuredContent: { services, useCases },
  }),
});
