import { z } from "zod";

// Validates a single code snippet
export const snippetSchema = z.object({
  trigger: z.string().min(1, "Trigger is required (e.g., 'bfs')"),
  description: z.string().optional(),
  code: z.string().min(1, "Code cannot be empty"),
  language: z.string().default("text"),
});

// Validates the full bundle upload
export const bundleSchema = z.object({
  snippets: z.array(snippetSchema).max(20, "Max 20 snippets per bundle"),
});

export type Snippet = z.infer<typeof snippetSchema>;
export type SnippetBundle = z.infer<typeof bundleSchema>;