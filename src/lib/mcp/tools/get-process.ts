import { defineTool } from "@lovable.dev/mcp-js";
import { process as steps } from "../content";

export default defineTool({
  name: "get_process",
  title: "Get engagement process",
  description:
    "Return the four-step engagement process (Audit, Design, Build, Operate & Scale) for an AI automation project.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ process: steps }, null, 2) }],
    structuredContent: { process: steps },
  }),
});
