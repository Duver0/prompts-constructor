import { BlockType } from "@/domain/types";

/**
 * Guidance content for each block type — what to write, how to improve,
 * and examples.
 */
export interface BlockGuidance {
  /** Short description of the block's purpose */
  purpose: string;
  /** Key questions the block should answer */
  questions: string[];
  /** Concrete example snippets (can be empty if N/A) */
  examples: string[];
  /** Common mistakes / pitfalls */
  pitfalls: string[];
  /** Tips for writing high-quality content */
  tips: string[];
}

const GUIDANCE_MAP: Record<BlockType, BlockGuidance> = {
  [BlockType.Role]: {
    purpose:
      "Define WHO the AI should act as. A precise role sets the tone, expertise level, and perspective for the entire response.",
    questions: [
      "What profession or expertise should the AI embody?",
      "What level of formality or technical depth is expected?",
      "Should the AI adopt a specific persona (e.g., 'senior architect', 'friendly teacher')?",
      "What background knowledge should the AI assume?",
    ],
    examples: [
      "You are a senior software architect with 15 years of experience in distributed systems.",
      "Act as a friendly, patient tutor explaining complex topics to a beginner.",
      "You are an expert copywriter specializing in SaaS marketing and conversion optimization.",
    ],
    pitfalls: [
      "Being too vague ('You are a helpful assistant') — misses the opportunity to set specialized context.",
      "Over-constraining the role ('You are a strict formal academic') when a conversational tone would work better.",
      "Contradicting the role later in the prompt (e.g., role says 'expert' but constraints say 'simplify for a child').",
    ],
    tips: [
      "Be specific: include years of experience, industry, and specialty.",
      "Match the role to the audience: technical roles for developers, creative roles for content.",
      "Consider adding a brief rationale for why this role was chosen.",
    ],
  },

  [BlockType.Context]: {
    purpose:
      "Provide the BACKGROUND INFORMATION the AI needs to understand the situation. This grounds the response in reality.",
    questions: [
      "What project, product, or situation is this about?",
      "What has happened so far that led to this request?",
      "Who are the stakeholders or target audience?",
      "What constraints or environmental factors matter?",
      "What relevant data, metrics, or facts should the AI know?",
    ],
    examples: [
      "We are building a React-based dashboard for a healthcare SaaS platform. The users are hospital administrators who need to view patient flow metrics in real time.",
      "Our startup has 50 employees and is migrating from a monolith to microservices. We've already split the auth and payment services. Next is the notification service.",
      "The attached dataset contains 10,000 customer support tickets from Q1 2025, labeled by category and priority.",
    ],
    pitfalls: [
      "Assuming the AI knows information you haven't provided — always spell out critical context.",
      "Dumping too much irrelevant information — stick to what's needed for the task.",
      "Making the context overly long without structure (use paragraphs or bullet points).",
    ],
    tips: [
      "Front-load the most important context — what's essential for a correct answer?",
      "Use bullet points for multiple facts or data points.",
      "If referencing external documents, summarize their key points here.",
    ],
  },

  [BlockType.Objective]: {
    purpose:
      "Clearly state WHAT you want the AI to DO. This is the core instruction — the single most important block.",
    questions: [
      "What is the specific output or action you want?",
      "What format should the response take?",
      "What is the primary goal vs. secondary goals?",
      "How will you measure success of the output?",
    ],
    examples: [
      "Write a comprehensive API design document for the notification service, covering endpoints, data models, authentication, and rate limiting.",
      "Analyze the attached customer support tickets and identify the top 5 recurring issues, ranked by frequency. For each issue, propose a solution.",
      "Generate a 30-day social media content calendar for our product launch, with 3 posts per week across LinkedIn and Twitter.",
    ],
    pitfalls: [
      "Being too vague ('Help me with my project') — leads to generic, unusable responses.",
      "Including multiple objectives without prioritizing them.",
      "Confusing the objective with the role or context — the objective is the ACTION, not the SETTING.",
    ],
    tips: [
      "Start with a strong action verb: Analyze, Design, Write, Compare, Explain, Generate.",
      "Break complex objectives into numbered sub-tasks.",
      "Be explicit about what you DON'T want ('Do not include implementation details').",
    ],
  },

  [BlockType.Constraints]: {
    purpose:
      "Set the BOUNDARIES and LIMITATIONS for the AI's response. What should it avoid, what must it include, and what rules should it follow?",
    questions: [
      "Are there any topics, approaches, or technologies to avoid?",
      "What quality or style requirements must the output meet?",
      "Are there length, format, or structural constraints?",
      "What must the AI NOT do under any circumstances?",
    ],
    examples: [
      "Do not use external libraries or frameworks. Use only vanilla JavaScript and CSS.",
      "The response must be under 300 words and written at a 8th-grade reading level.",
      "Do not mention competitors by name. If comparing, use generic categories like 'other solutions'.",
    ],
    pitfalls: [
      "Over-constraining — too many 'don'ts' can paralyze the AI's creativity.",
      "Negatives without alternatives — instead of 'Don't use X', say 'Use Y instead'.",
      "Contradicting objectives or other constraints.",
    ],
    tips: [
      "Use 'must' and 'must not' for hard rules, 'prefer' and 'avoid' for softer guidance.",
      "Group related constraints together for readability.",
      "If there are many constraints, consider moving some to a separate 'Guidelines' block.",
    ],
  },

  [BlockType.Examples]: {
    purpose:
      "Show the AI WHAT GOOD LOOKS LIKE. Examples are the most effective way to communicate tone, structure, and quality expectations.",
    questions: [
      "What does a great response look like for this task?",
      "Are there different scenarios that need different example outputs?",
      "What format should the example follow (e.g., input → output)?",
      "Should there be counter-examples (what NOT to do)?",
    ],
    examples: [
      "Input: 'Explain closures in JavaScript'\nOutput: 'A closure is a function that retains access to its outer scope even after the outer function has returned. For example...'",
      "Good: 'The system processed 1,200 transactions per second with 99.9% uptime.'\nBad: 'It was really fast and almost never went down.'",
    ],
    pitfalls: [
      "Providing examples that don't match the desired output quality or style.",
      "Using overly complex examples for simple tasks (or vice versa).",
      "Forgetting to include a diverse range of examples if the task has multiple variations.",
    ],
    tips: [
      "Provide 2-3 high-quality examples — enough to establish a pattern, not so many it's overwhelming.",
      "Use the same format you want in the actual output.",
      "Include a brief annotation explaining WHY the example is good.",
    ],
  },

  [BlockType.OutputFormat]: {
    purpose:
      "Specify the EXACT STRUCTURE of the AI's response. This removes ambiguity about how the answer should be presented.",
    questions: [
      "Should the output be JSON, Markdown, plain text, or another format?",
      "What sections or fields should the response contain?",
      "What data types and structures are expected?",
      "Is there a schema or template to follow?",
    ],
    examples: [
      "Respond in JSON format with the following structure:\n{\n  \"summary\": \"string\",\n  \"issues\": [{ \"title\": \"string\", \"priority\": \"high|medium|low\" }],\n  \"recommendation\": \"string\"\n}",
      "Use Markdown with the following sections:\n## Overview\n## Key Findings\n## Recommendations\n## Next Steps",
    ],
    pitfalls: [
      "Being too loose ('Write a report') — the AI will choose its own structure, which may not match your needs.",
      "Specifying a format the AI can't reliably produce (e.g., complex charts or diagrams in ASCII).",
      "Forgetting to specify edge cases (e.g., 'if no results found, return {\"empty\": true}').",
    ],
    tips: [
      "If using JSON, provide the full schema with types and descriptions.",
      "If using Markdown, specify which sections and their order.",
      "For code output, specify the language for syntax highlighting.",
    ],
  },

  [BlockType.Variables]: {
    purpose:
      "Define the PLACEHOLDERS and PARAMETERS that make your prompt reusable. Variables let you swap content without rewriting the prompt.",
    questions: [
      "What parts of this prompt will change each time it's used?",
      "What are the default values for these variables?",
      "What type of data does each variable expect (text, number, choice)?",
      "Are there validation rules for variable values?",
    ],
    examples: [
      "{{PRODUCT_NAME}} — the name of the product (text)\n{{TARGET_AUDIENCE}} — the primary user group (text)\n{{INDUSTRY}} — choose from: SaaS, Healthcare, Finance, Education",
      "{{TOPIC}} — the subject to explain (text)\n{{AUDIENCE_LEVEL}} — beginner / intermediate / advanced\n{{MAX_WORDS}} — maximum word count (number, default: 500)",
    ],
    pitfalls: [
      "Using too many variables — prompts become hard to read and configure.",
      "Not providing defaults or example values for variables.",
      "Inconsistent variable naming conventions (use {{DOUBLE_BRACES}} consistently).",
    ],
    tips: [
      "Use descriptive variable names that are self-explanatory.",
      "Provide a default value and a brief description for each variable.",
      "Group related variables and list them together at the start or end of the prompt.",
    ],
  },

  [BlockType.Notes]: {
    purpose:
      "Add IMPORTANT REMINDERS, meta-instructions, or clarifications that don't fit other blocks. Use sparingly for truly exceptional cases.",
    questions: [
      "Is there a special edge case the AI should handle?",
      "Are there cultural, ethical, or compliance considerations?",
      "Does the AI need to acknowledge uncertainty or limitations?",
    ],
    examples: [
      "If you cannot answer with confidence, state your uncertainty clearly and suggest how to find the answer.",
      "All responses must comply with GDPR and not request or store personal information.",
      "The user may not be a native English speaker — use clear, simple language and define technical terms.",
    ],
    pitfalls: [
      "Using Notes as a dumping ground for important instructions that belong in other blocks.",
      "Adding too many notes — they dilute focus from the main blocks.",
      "Putting contradictory information in Notes that conflicts with Role, Context, or Objective.",
    ],
    tips: [
      "Use Notes only for information that genuinely doesn't fit elsewhere.",
      "If you find yourself writing multiple Notes, consider restructuring your prompt.",
      "Keep Notes concise — one key point per note.",
    ],
  },
};

/**
 * Get guidance for a specific block type.
 */
export function getGuidance(type: BlockType): BlockGuidance {
  return GUIDANCE_MAP[type];
}

/**
 * Check if a block's text is well-written and return improvement suggestions.
 */
export function analyzeBlockText(type: BlockType, text: string): string[] {
  const suggestions: string[] = [];
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  if (wordCount < 10) {
    suggestions.push(
      `Very short for a "${type}" block (${String(wordCount)} words). Consider expanding with more detail using the questions above as a guide.`,
    );
  }

  // Check for common issues across all types
  if (text.includes("should") && text.split("should").length > 3) {
    suggestions.push(
      'Repeated use of "should" — consider using more direct language (e.g., "must", "will", or imperative verbs).',
    );
  }

  if (wordCount > 200) {
    suggestions.push(
      `This block is quite long (${String(wordCount)} words). Consider breaking it into more specific sub-blocks for clarity.`,
    );
  }

  // Type-specific checks
  if (type === BlockType.Objective) {
    const hasActionVerb = /^(analyze|design|write|compare|explain|generate|create|build|implement|evaluate|list|describe|summarize)\b/i.test(
      text.trim(),
    );
    if (!hasActionVerb) {
      suggestions.push(
        'Start the objective with a strong action verb (e.g., "Design", "Analyze", "Generate") for clarity.',
      );
    }
  }

  if (type === BlockType.Role) {
    if (!text.includes("expert") && !text.includes("specialist") && !text.includes("senior")) {
      suggestions.push(
        'Consider specifying the expertise level (e.g., "senior", "expert") to set expectations.',
      );
    }
  }

  if (type === BlockType.OutputFormat && text.length > 10) {
    if (!text.includes("JSON") && !text.includes("Markdown") && !text.includes("XML")) {
      suggestions.push(
        'Specify a concrete format (JSON, Markdown, XML, etc.) for predictable output.',
      );
    }
  }

  return suggestions;
}

/**
 * Analyze the overall prompt and return structured feedback.
 */
export interface PromptReviewResult {
  overallScore: number; // 0-100
  blocksWithIssues: Array<{
    blockType: BlockType;
    blockIndex: number;
    issues: string[];
  }>;
  missingBlocks: BlockType[];
  strengths: string[];
  suggestions: string[];
}

export function analyzePrompt(
  blocks: Array<{ type: BlockType; text: string }>,
): PromptReviewResult {
  const allTypes = Object.values(BlockType);
  const presentTypes = new Set(blocks.map((b) => b.type));
  const missingBlocks = allTypes.filter((t) => !presentTypes.has(t));

  const blocksWithIssues: PromptReviewResult["blocksWithIssues"] = [];
  let totalIssues = 0;

  blocks.forEach((block, index) => {
    const issues = analyzeBlockText(block.type, block.text);
    if (issues.length > 0) {
      blocksWithIssues.push({
        blockType: block.type,
        blockIndex: index,
        issues,
      });
      totalIssues += issues.length;
    }
  });

  const strengths: string[] = [];
  const suggestions: string[] = [];

  // Check for critical blocks
  const hasRole = presentTypes.has(BlockType.Role);
  const hasObjective = presentTypes.has(BlockType.Objective);
  const hasContext = presentTypes.has(BlockType.Context);

  if (hasRole && hasObjective && hasContext) {
    strengths.push("Prompt has the three essential blocks: Role, Objective, and Context.");
  } else {
    if (!hasRole) suggestions.push("Add a Role block to define the AI's persona and expertise.");
    if (!hasObjective) suggestions.push("Add an Objective block — this is the most critical block for telling the AI what to do.");
    if (!hasContext) suggestions.push("Add a Context block to provide the background information the AI needs.");
  }

  if (presentTypes.has(BlockType.Constraints)) {
    strengths.push("Constraints block helps keep the AI's output within boundaries.");
  } else {
    suggestions.push("Consider adding a Constraints block to set boundaries and avoid unwanted outputs.");
  }

  if (presentTypes.has(BlockType.Examples)) {
    strengths.push("Examples block significantly improves output quality by showing the AI what good looks like.");
  } else {
    suggestions.push("Examples are the most effective way to teach the AI your preferred style — consider adding one.");
  }

  // Calculate overall score
  const baseScore = 50;
  const missingPenalty = missingBlocks.length * 8;
  const issuesPenalty = totalIssues * 5;
  const hasAllEssentials = hasRole && hasObjective && hasContext;
  const essentialBonus = hasAllEssentials ? 20 : 0;
  const score = Math.max(0, Math.min(100, baseScore + essentialBonus - missingPenalty - issuesPenalty));

  return {
    overallScore: Math.round(score),
    blocksWithIssues,
    missingBlocks,
    strengths,
    suggestions,
  };
}
