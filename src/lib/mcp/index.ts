import { defineMcp, type AnyToolDefinition } from "@lovable.dev/mcp-js";
import getServicesTool from "./tools/get-services";
import getProcessTool from "./tools/get-process";
import getFaqTool from "./tools/get-faq";
import requestConsultationTool from "./tools/request-consultation";

export default defineMcp({
  name: "ai-workflow-solutions",
  title: "AI Workflow Solutions",
  version: "0.1.0",
  instructions:
    "Tools for Nexflow AI, an AI automation consultancy. Use `get_services`, `get_process`, and `get_faq` to answer questions about the offering, and `request_consultation` to book a free consultation once the visitor has confirmed their name, email, and what they want to automate.",
  tools: [getServicesTool, getProcessTool, getFaqTool, requestConsultationTool] as AnyToolDefinition[],
});
