# Prompt Architect — Master Product Specification

> **Status**: Draft v1.0  
> **Owner**: Orchestrator Agent  
> **Last Updated**: 2026-06-03  
> **Methodology**: Agentic Spec-Driven Development (ASDD)  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [User Personas](#3-user-personas)
4. [Functional Requirements](#4-functional-requirements)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Domain Model Specification](#6-domain-model-specification)
7. [UX/UI Specification](#7-uxui-specification)
8. [Frontend Architecture Specification](#8-frontend-architecture-specification)
9. [Testing Strategy Specification](#9-testing-strategy-specification)
10. [CI/CD & DevOps Specification](#10-cicd--devops-specification)
11. [Documentation Strategy Specification](#11-documentation-strategy-specification)
12. [Architecture Governance Specification](#12-architecture-governance-specification)
13. [OpenCode Configuration Specification](#13-opencode-configuration-specification)
14. [Initial Roadmap](#14-initial-roadmap)
15. [Agent Delegation Instructions](#15-agent-delegation-instructions)

---

## 1. Executive Summary

### 1.1 Product Vision

Prompt Architect is a visual prompt engineering platform that empowers users to create, compose, organize, validate, optimize, version, and export structured prompts for modern AI systems. By replacing manual text editing with reusable visual blocks, the platform makes prompt engineering systematic, repeatable, and collaborative.

### 1.2 Product Goals

| Goal | Description | Priority |
|------|-------------|----------|
| G1 | Enable visual prompt construction through drag-and-drop block composition | Must Have |
| G2 | Support export to all major AI providers (ChatGPT, Claude, Gemini, OpenRouter) | Must Have |
| G3 | Provide prompt validation and optimization feedback | Must Have |
| G4 | Enable version management with history, drafts, and rollback | Must Have |
| G5 | Support reusable prompt templates | Should Have |
| G6 | Achieve WCAG 2.1 AA accessibility compliance | Must Have |
| G7 | Deploy as a performant static site via GitHub Pages | Must Have |
| G8 | Maintain zero infrastructure cost and fully client-side operation | Must Have |

### 1.3 Success Criteria

| Criterion | Target | Measurement |
|-----------|--------|-------------|
| Prompt creation speed | < 2 minutes for a structured prompt | User timing test |
| Export accuracy | 100% format fidelity for target provider | Automated comparison |
| Validation coverage | 100% of defined structural rules | Test coverage |
| Lighthouse score | ≥ 90 on all categories | Lighthouse CI |
| WCAG compliance | 2.1 AA (no violations) | axe-core audit |
| Bundle size | < 200 KB initial JS (gzipped) | Bundle analysis |
| Test coverage | ≥ 80% unit, ≥ 70% integration | Vitest coverage |
| E2E critical paths | 100% coverage | Playwright |
| Time to interactive | < 2s on 3G | Lighthouse |
| GitHub Pages deploy | < 3 min from push to live | Pipeline timing |

---

## 2. Problem Statement

### 2.1 Current Problem

Prompt engineering today relies primarily on manual text editing in unstructured environments (text editors, chat interfaces, notebooks). This approach has fundamental limitations:

- **Unstructured workflows**: No standard format for prompt construction leads to inconsistency
- **No reuse mechanism**: Engineers rewrite similar prompt structures repeatedly
- **No validation**: Errors in prompt structure are discovered only at runtime through poor AI output
- **No versioning**: Prompt iterations are tracked manually or lost entirely
- **Provider lock-in**: Prompts are formatted for a single provider and must be manually adapted for others
- **No quality feedback**: No systematic way to evaluate prompt quality before use
- **Collaboration gaps**: Sharing prompt structures requires copy-paste or external tools

### 2.2 Target Users

| Segment | Description | Market Size (Est.) |
|---------|-------------|-------------------|
| AI Engineers | Build AI-powered applications and need reliable, repeatable prompts | Large |
| Developers | Integrate AI into software products and need structured prompts | Very Large |
| Prompt Engineers | Specialize in crafting high-quality prompts for specific outcomes | Medium |
| Content Creators | Use AI for content generation and need consistent output formats | Large |
| Technical Teams | Collaborate on prompt libraries and need shared standards | Medium |

### 2.3 Existing Pain Points

| Pain Point | Current Workaround | Impact |
|------------|-------------------|--------|
| Manual prompt formatting | Copy-paste between files and chat windows | Wasted time, errors |
| No prompt validation | Test prompts live in production AI calls | Cost, poor output |
| No version control | Manual file naming (prompt_v1, prompt_v2_final) | Confusion, loss |
| Provider-specific syntax | Manual reformatting per provider | Slow, error-prone |
| No template system | Rebuild prompt structures from scratch | Inefficient |
| No collaborative workflow | Share via documents or chat | Version conflicts |

### 2.4 Business Value

| Value Driver | Impact |
|--------------|--------|
| Reduced prompt engineering time | 60-80% faster prompt construction |
| Improved prompt quality | Systematic validation and optimization |
| Reduced AI output costs | Fewer bad prompts → fewer wasted API calls |
| Faster iteration cycles | Version tracking and rollback |
| Provider flexibility | One prompt → multiple provider formats |
| Team productivity | Shared templates and standards |

---

## 3. User Personas

### 3.1 AI Engineer — "Alex"

| Attribute | Detail |
|-----------|--------|
| **Role** | Senior AI Engineer at a SaaS company |
| **Goals** | Build reliable AI features; iterate prompts quickly; ensure consistent output |
| **Frustrations** | Manual prompt formatting wastes hours; no systematic way to test prompts before deployment |
| **Workflow** | Design prompt → test with API → refine → deploy to production |
| **Needs** | Structured editor; version history; export to OpenAI SDK format; validation rules |
| **Tech Level** | Expert (TypeScript, API integration, git) |

**Key Use Case**: Alex needs to create a system prompt for a customer support classification agent. He defines the role, context, output format, and examples as separate blocks. He exports to OpenAI format and tests directly. He iterates through 5 versions before deployment.

### 3.2 Developer — "Diana"

| Attribute | Detail |
|-----------|--------|
| **Role** | Full-stack developer building AI features for web apps |
| **Goals** | Integrate AI quickly; reuse prompt patterns across features |
| **Frustrations** | No standard prompt library; hard to share prompts across the team |
| **Workflow** | Prototype AI feature → copy prompts from docs → adapt per use case |
| **Needs** | Template library; quick export; markdown and JSON formats |
| **Tech Level** | Intermediate (React, Node.js, basic AI integration) |

**Key Use Case**: Diana wants to add AI-powered search to her app. She starts from a "RAG System Prompt" template, customizes the context and output format blocks, validates the structure, and exports as JSON for her backend.

### 3.3 Prompt Engineer — "Priya"

| Attribute | Detail |
|-----------|--------|
| **Role** | Specialized prompt engineer at an AI consultancy |
| **Goals** | Craft high-quality prompts; optimize for cost and quality; maintain prompt libraries for clients |
| **Frustrations** | No optimization feedback; can't measure prompt quality systematically |
| **Workflow** | Research → draft → test → measure → refine → document |
| **Needs** | Quality analysis; ambiguity detection; token counting; A/B version comparison |
| **Tech Level** | Expert (prompt techniques, tokens, temperature, etc.) |

**Key Use Case**: Priya is optimizing a multi-step reasoning prompt. She uses the clarity analyzer, identifies ambiguous phrasing, restructures blocks, and compares versions side-by-side. She archives the final version for client delivery.

### 3.4 Content Creator — "Chris"

| Attribute | Detail |
|-----------|--------|
| **Role** | Marketing content creator using AI for blog posts, social media, emails |
| **Goals** | Get consistent output quality; reuse successful prompt patterns |
| **Frustrations** | AI output is inconsistent; hard to remember which prompts worked |
| **Workflow** | Find prompt → customize → generate → tweak → regenerate |
| **Needs** | Simple UI; template library; visual blocks; export to chat formats |
| **Tech Level** | Low (minimal technical skills) |

**Key Use Case**: Chris has a "Blog Post Generator" template with blocks for tone, audience, length, and key points. He fills in variables, clicks validate, and exports for ChatGPT. He saves variations for different content types.

### 3.5 Technical Team — "Team Alpha"

| Attribute | Detail |
|-----------|--------|
| **Role** | 5-person team building AI products |
| **Goals** | Share prompt standards; collaborate on prompt libraries; maintain consistency |
| **Frustrations** | No shared workspace; prompts diverge between team members |
| **Workflow** | Define standards → create templates → share → review → update |
| **Needs** | Template sharing; export/import; naming conventions; access control |
| **Tech Level** | Mixed (junior to senior) |

**Key Use Case**: The team lead creates a set of approved prompt templates. Team members instantiate templates for their features. The lead reviews prompt versions before they're used in production.

---

## 4. Functional Requirements

### 4.1 Feature Taxonomy

The platform features are organized into the following domains:

```
Prompt Architect
├── Prompt Management (CRUD operations)
├── Prompt Composition (visual block editor)
├── Prompt Blocks (block types and behaviors)
├── Prompt Templates (reusable structures)
├── Prompt Validation (structural and semantic checks)
├── Prompt Optimization (quality analysis)
├── Versioning (history and lifecycle)
└── Exporting (multi-provider output)
```

### 4.2 Prompt Management

#### FR-PM-01: Create Prompt

| Attribute | Specification |
|-----------|--------------|
| **Description** | User creates a new empty prompt |
| **Trigger** | User clicks "New Prompt" button |
| **Flow** | 1. User clicks "New Prompt" → 2. Prompt created with default title "Untitled Prompt" → 3. Empty canvas shown with block palette → 4. Focus set to title for renaming |
| **Acceptance** | Prompt is created with unique ID, current timestamp, empty block list, status "draft" |
| **Edge Cases** | Multiple rapid creations generate unique prompts; browser refresh after creation retains prompt (auto-save) |

#### FR-PM-02: Edit Prompt

| Attribute | Specification |
|-----------|--------------|
| **Description** | User modifies prompt title and/or content blocks |
| **Trigger** | User interacts with prompt canvas |
| **Flow** | 1. User modifies any block content → 2. Auto-save triggered after 2s debounce → 3. Version state updated to "unsaved changes" → 4. Indicator shown in UI |
| **Acceptance** | All edits auto-saved to localStorage; undo/redo available for block edits |
| **Edge Cases** | Concurrent edits (not applicable — single user); offline edits queued |

#### FR-PM-03: Delete Prompt

| Attribute | Specification |
|-----------|--------------|
| **Description** | User deletes a prompt |
| **Trigger** | User clicks delete in prompt context menu |
| **Flow** | 1. User triggers delete → 2. Confirmation dialog appears → 3. User confirms → 4. Prompt moved to trash/archive → 5. Confirmation toast shown |
| **Acceptance** | Prompt is not permanently deleted; moved to archive (soft delete); archived prompts visible in "Trash" view |
| **Edge Cases** | Delete while prompt is open in editor; bulk delete selection |

#### FR-PM-04: Duplicate Prompt

| Attribute | Specification |
|-----------|--------------|
| **Description** | User creates a copy of an existing prompt |
| **Trigger** | User clicks "Duplicate" in prompt context menu |
| **Flow** | 1. User triggers duplicate → 2. New prompt created with title "{Original Title} (Copy)" → 3. All blocks, variables, and settings copied → 4. New prompt opened in editor |
| **Acceptance** | Duplicate is an exact copy with new ID; no reference to original |
| **Edge Cases** | Duplicating a prompt in archive; duplicating with version history (only latest version copied) |

#### FR-PM-05: Archive Prompt

| Attribute | Specification |
|-----------|--------------|
| **Description** | User moves prompt to archive |
| **Trigger** | User clicks "Archive" in prompt context menu |
| **Flow** | 1. User triggers archive → 2. Confirmation shown if prompt has unsaved changes → 3. Prompt moved to archive → 4. Archive badge shown on prompt card |
| **Acceptance** | Archived prompts excluded from default list view; searchable from archive; can be restored |
| **Edge Cases** | Archiving a published version; archiving a template instance |

#### FR-PM-06: List/Search Prompts

| Attribute | Specification |
|-----------|--------------|
| **Description** | User views and searches prompts |
| **Trigger** | Navigation to prompt library |
| **Flow** | 1. User navigates to library → 2. Prompts displayed as list or grid → 3. Search box filters by title and block content → 4. Sort by date, title, status |
| **Acceptance** | Search is fuzzy; results update in real-time; empty state shown when no results |
| **Edge Cases** | Very large prompt library (>100 prompts); pagination or virtual scrolling |

#### FR-PM-07: Organize Prompts

| Attribute | Specification |
|-----------|--------------|
| **Description** | User organizes prompts into collections/folders |
| **Trigger** | User creates or assigns collection |
| **Flow** | 1. User creates collection → 2. Drag prompts into collection → 3. Tree navigation shows collection hierarchy |
| **Acceptance** | Collections are nestable (max 3 levels); prompt can belong to multiple collections via tags |
| **Edge Cases** | Empty collection; deleting collection with prompts inside |

### 4.3 Prompt Composition

#### FR-PC-01: Visual Block Editor

| Attribute | Specification |
|-----------|--------------|
| **Description** | WYSIWYG editor for prompt construction using visual blocks |
| **Trigger** | User opens prompt for editing |
| **Flow** | 1. Canvas displays current blocks as stacked cards → 2. Block palette available (sidebar or floating) → 3. User adds/removes/reorders blocks → 4. Preview pane shows compiled prompt |
| **Acceptance** | Editor is responsive; blocks are visually distinct by type; preview updates in real-time |
| **Edge Cases** | Empty canvas (no blocks) shows onboarding hint; very long blocks scroll within card |

#### FR-PC-02: Drag and Drop

| Attribute | Specification |
|-----------|--------------|
| **Description** | User reorders blocks via drag and drop |
| **Trigger** | User grabs drag handle on block |
| **Flow** | 1. User initiates drag → 2. Block lifts with visual elevation → 3. Drop zone indicators shown → 4. Block repositions on drop → 5. Animation confirms new position |
| **Acceptance** | Drag is smooth (Anime.js); drop zones clearly indicated; keyboard alternative available |
| **Edge Cases** | Drag to same position (no change); rapid drag operations; drag during auto-save |

#### FR-PC-03: Block Ordering Rules

| Attribute | Specification |
|-----------|--------------|
| **Description** | Enforced ordering constraints for blocks |
| **Rule** | 1. `Role` block must be first or second (after Title) → 2. `Output Format` must be last → 3. `Examples` must precede `Output Format` → 4. All other blocks are flexible |
| **Acceptance** | UI enforces rules with visual warnings; user can override with explicit confirmation |
| **Edge Cases** | Removing a required block; adding block in invalid position |

#### FR-PC-04: Block Validation on Composition

| Attribute | Specification |
|-----------|--------------|
| **Description** | Real-time validation of block composition |
| **Validation** | 1. At least one `Role` block required → 2. No duplicate `Role` blocks → 3. `Objective` block recommended → 4. `Output Format` must have at least one format specified |
| **Acceptance** | Warnings shown as badge on validation panel; errors block export |
| **Edge Cases** | Prompt with all optional blocks removed; prompt with only invalid blocks |

### 4.4 Prompt Blocks

#### FR-BL-01: Role Block

| Attribute | Specification |
|-----------|--------------|
| **Description** | Defines the AI's role/persona |
| **Fields** | `title` (string), `description` (string), `expertise` (string[]), `tone` (enum: professional, casual, academic, creative, custom) |
| **Validation** | Title required; at least one expertise area recommended |
| **Variable Support** | Yes: `{{role_title}}`, `{{expertise_area}}` |

**Example**: "You are an expert software architect specializing in React, TypeScript, and system design."

#### FR-BL-02: Context Block

| Attribute | Specification |
|-----------|--------------|
| **Description** | Provides background context for the AI |
| **Fields** | `summary` (string), `background` (text), `relevant_info` (text[]), `constraints` (text[]) |
| **Validation** | Summary required (max 200 chars); background free text |
| **Variable Support** | Yes: `{{context_summary}}`, `{{relevant_info}}` |

**Example**: "We are building a task management application. The user is viewing their dashboard which shows..."

#### FR-BL-03: Objective Block

| Attribute | Specification |
|-----------|--------------|
| **Description** | States the specific task or goal for the AI |
| **Fields** | `goal` (text), `success_criteria` (text[]), `complexity` (enum: simple, moderate, complex) |
| **Validation** | Goal required; at least one success criterion recommended |
| **Variable Support** | Yes: `{{goal}}`, `{{success_criterion_n}}` |

**Example**: "Generate a JSON array of 5 suggested tasks based on the user's recent activity..."

#### FR-BL-04: Constraints Block

| Attribute | Specification |
|-----------|--------------|
| **Description** | Defines limits and rules the AI must follow |
| **Fields** | `rules` (text[]), `forbidden_elements` (text[]), `limits` (text[]), `formatting_requirements` (text[]) |
| **Validation** | At least one rule recommended; no forbidden elements duplicates |
| **Variable Support** | Yes: `{{rule_n}}`, `{{limit}}` |

**Example**: "Do not use markdown. Respond in valid JSON only. Maximum 10 items. No external references."

#### FR-BL-05: Examples Block

| Attribute | Specification |
|-----------|--------------|
| **Description** | Provides few-shot examples for the AI |
| **Fields** | `examples` (array of `{input: string, output: string, explanation?: string}`), `example_count` (computed) |
| **Validation** | At least 1 example recommended for complex tasks; input and output required per example |
| **Variable Support** | No (examples are concrete) |

**Example**: 
```
Input: "What's the weather in Tokyo?"
Output: {"city": "Tokyo", "temperature": 22, "unit": "celsius"}
```

#### FR-BL-06: Output Format Block

| Attribute | Specification |
|-----------|--------------|
| **Description** | Specifies the desired output structure |
| **Fields** | `format_type` (enum: text, json, markdown, html, code, csv, yaml, custom), `schema` (text — JSON Schema or description), `examples` (text[]) |
| **Validation** | Format type required; schema recommended for structured outputs |
| **Variable Support** | Yes: `{{format_type}}` |

**Example**: "Respond with a JSON object containing: { \"tasks\": [{ \"id\": \"string\", \"title\": \"string\", \"priority\": \"high|medium|low\" }] }"

#### FR-BL-07: Variables Block

| Attribute | Specification |
|-----------|--------------|
| **Description** | Declares variables used within the prompt |
| **Fields** | `variables` (array of `{name: string, type: enum(string, number, boolean, array, object), required: boolean, default?: string, description: string}`) |
| **Validation** | Variable names must match `{{name}}` syntax; no duplicate names; required variables must have a value when prompt is used |
| **Variable Support** | Self-referential (defines variables) |

**Example**: 
```
Variables:
- {{user_name}} (string, required) — The user's display name
- {{task_count}} (number, optional, default: 5) — Number of tasks to generate
```

#### FR-BL-08: Notes Block

| Attribute | Specification |
|-----------|--------------|
| **Description** | Internal notes and documentation (excluded from compiled prompt) |
| **Fields** | `content` (text), `visibility` (enum: private, team) |
| **Validation** | No validation rules; always excluded from export |
| **Variable Support** | No |

#### FR-BL-09: Block Common Attributes

All blocks share:

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | string (UUID) | Unique identifier |
| `type` | BlockType | Enum identifying block type |
| `title` | string | User-facing block title (editable) |
| `enabled` | boolean | Whether block is included in compiled prompt |
| `order` | number | Position in the block sequence |
| `collapsed` | boolean | UI state for collapsed/expanded view |
| `createdAt` | timestamp | Block creation time |
| `updatedAt` | timestamp | Last modification time |

### 4.5 Prompt Templates

#### FR-TP-01: Create Template

| Attribute | Specification |
|-----------|--------------|
| **Description** | User creates a reusable template from a prompt |
| **Trigger** | "Save as Template" action |
| **Flow** | 1. User selects "Save as Template" → 2. Template name and category dialog → 3. Template saved with current block structure → 4. Template available in library |
| **Acceptance** | Template preserves block structure, variables, and ordering; content values are preserved as defaults |
| **Edge Cases** | Saving template from a template instance; saving with unresolved variables |

#### FR-TP-02: Template Categories

| Attribute | Specification |
|-----------|--------------|
| **Description** | Templates organized by category |
| **Categories** | Coding, Architecture, Content Creation, Marketing, Analysis, Research, Product Design, Custom |
| **Acceptance** | Each category has recommended block types; categories are filterable |
| **Edge Cases** | Custom categories created by user; empty category |

#### FR-TP-03: Apply Template

| Attribute | Specification |
|-----------|--------------|
| **Description** | User creates a new prompt from a template |
| **Trigger** | User clicks "Use Template" |
| **Flow** | 1. User selects template → 2. New prompt created with template blocks → 3. Variable placeholder values shown → 4. Prompt ready for customization |
| **Acceptance** | Template instantiation creates a new independent prompt; no link to template |
| **Edge Cases** | Template with required variables; template with deprecated blocks |

#### FR-TP-04: Share Template

| Attribute | Specification |
|-----------|--------------|
| **Description** | User exports/imports templates |
| **Trigger** | "Export Template" / "Import Template" actions |
| **Flow** | 1. Export: Template serialized to JSON → 2. Download .prompt-template file → 3. Import: File upload → 4. Template added to library |
| **Acceptance** | Exported template contains all block definitions, variables, and metadata |
| **Edge Cases** | Import with template name conflict; import with invalid format |

### 4.6 Prompt Validation

#### FR-VL-01: Structure Validation

| Rule ID | Rule | Severity | Behavior |
|---------|------|----------|----------|
| STR-01 | At least one `Role` block present | Error | Blocks export, shows error badge |
| STR-02 | At most one `Role` block | Error | Shows duplicate warning |
| STR-03 | `Role` block must be first in order | Warning | Recommends reordering |
| STR-04 | `Output Format` must be last | Warning | Recommends reordering |
| STR-05 | `Examples` must precede `Output Format` | Warning | Recommends reordering |
| STR-06 | No empty block content | Warning | Highlights empty blocks |
| STR-07 | No duplicate block types (except Examples + Notes) | Error | Marks duplicates |

#### FR-VL-02: Variable Validation

| Rule ID | Rule | Severity | Behavior |
|---------|------|----------|----------|
| VAR-01 | All referenced variables must be declared | Error | Shows unresolved variables |
| VAR-02 | Declared variables must be used at least once | Warning | Shows unused variables |
| VAR-03 | Variable names match `{{[a-zA-Z_][a-zA-Z0-9_]*}}` | Error | Highlights invalid names |
| VAR-04 | Required variables must have default or value | Error | Marks missing values |

#### FR-VL-03: Semantic Validation

| Rule ID | Rule | Severity | Behavior |
|---------|------|----------|----------|
| SEM-01 | Prompt length within provider context window | Warning | Shows token count vs limit |
| SEM-02 | No contradictory instructions detected | Warning | Highlights potential conflicts |
| SEM-03 | Examples format matches output format | Warning | Flags format mismatches |

### 4.7 Prompt Optimization

#### FR-OP-01: Clarity Analysis

| Attribute | Specification |
|-----------|--------------|
| **Description** | Evaluates prompt clarity and specificity |
| **Metrics** | 1. Specificity score (0-100) — are instructions concrete? 2. Actionability score (0-100) — is the task clear? 3. Completeness score (0-100) — are all required elements present? |
| **Visualization** | Gauge/radar chart per metric; color-coded (red < 50, yellow 50-80, green > 80) |
| **Output** | Actionable improvement suggestions per metric below threshold |

#### FR-OP-02: Ambiguity Detection

| Attribute | Specification |
|-----------|--------------|
| **Description** | Identifies ambiguous language in prompt |
| **Detection** | 1. Vague quantifiers ("several", "many", "some") → 2. Unclear references ("it", "them", "that") → 3. Subjective terms ("good", "nice", "appropriate") → 4. Missing specificity markers |
| **Visualization** | Inline highlights in block text; term list with replacement suggestions |
| **Output** | Number of ambiguous terms found; replacement recommendations |

#### FR-OP-03: Redundancy Detection

| Attribute | Specification |
|-----------|--------------|
| **Description** | Identifies redundant or repeated content across blocks |
| **Detection** | 1. Duplicate sentences/phrases → 2. Near-duplicate instructions → 3. Repeated constraints |
| **Visualization** | Cross-block highlights linking duplicates |
| **Output** | List of redundant elements with merge suggestions |

#### FR-OP-04: Token Counting

| Attribute | Specification |
|-----------|--------------|
| **Description** | Counts estimated tokens per provider's tokenizer |
| **Support** | Token estimation for: OpenAI (cl100k_base), Claude, Gemini |
| **Visualization** | Token count per block (bar chart); total with provider limit indicator |
| **Output** | Cost estimation based on provider pricing; optimization suggestions |

#### FR-OP-05: Improvement Suggestions

| Attribute | Specification |
|-----------|--------------|
| **Description** | AI-generated improvement recommendations (configurable) |
| **Types** | 1. Structure improvements (ordering, completeness) → 2. Content improvements (specificity, clarity) → 3. Token optimization (reduction opportunities) → 4. Provider-specific recommendations |
| **Output** | Prioritized list with expected impact (high/medium/low) |

### 4.8 Versioning

#### FR-VR-01: Version History

| Attribute | Specification |
|-----------|--------------|
| **Description** | Maintains chronological version history for each prompt |
| **Trigger** | Explicit "Save Version" or auto-save at configurable interval |
| **Flow** | 1. User edits prompt → 2. Changes tracked in memory → 3. On "Save Version" or interval: snapshot created → 4. Added to version timeline |
| **Acceptance** | Each version stores complete prompt state; versions are immutable |
| **Edge Cases** | No changes since last version (no new version created); storage limits (max 50 versions per prompt) |

#### FR-VR-02: Version States

| State | Description | Transitions |
|-------|-------------|-------------|
| `Draft` | Active editing state | → Published (on explicit publish) |
| `Published` | Stable, usable version | → Draft (on edit), → Archived (on archive) |
| `Archived` | Read-only historical version | → Published (on restore) |

**Transition Rules:**
- `Draft → Published`: User clicks "Publish"; requires all validation errors resolved
- `Published → Draft`: User edits a published version; creates new draft branch
- `Published → Archived`: User archives prompt
- `Archived → Published`: User restores archived prompt

#### FR-VR-03: Rollback

| Attribute | Specification |
|-----------|--------------|
| **Description** | User restores a previous version |
| **Trigger** | "Restore" action on version entry |
| **Flow** | 1. User selects version to restore → 2. Confirmation dialog → 3. Current state backed up as version → 4. Restored state loaded into editor |
| **Acceptance** | Rollback creates a new version (no destructive undo); previous state preserved as backup |
| **Edge Cases** | Rolling back to version with different block types than current schema |

#### FR-VR-04: Version Comparison (Diff)

| Attribute | Specification |
|-----------|--------------|
| **Description** | Side-by-side or inline diff between versions |
| **Trigger** | User selects two versions to compare |
| **Flow** | 1. User selects two versions → 2. Diff rendered showing additions/removals/changes per block → 3. Color-coded (green: added, red: removed, yellow: changed) |
| **Acceptance** | Diff highlights per-block and per-field changes |
| **Edge Cases** | Comparing across schema changes; comparing empty block vs content |

### 4.9 Exporting

#### FR-EX-01: Export Format Support

| Provider/Format | ID | Features |
|-----------------|----|----------|
| ChatGPT | `chatgpt` | System message + user message structure; markdown formatting |
| Claude | `claude` | System prompt format; XML tags for structure |
| Gemini | `gemini` | System instruction format; markdown |
| OpenRouter | `openrouter` | Provider-agnostic format with model routing |
| OpenAI SDK | `openai-sdk` | messages array format (system, user, assistant) |
| Markdown | `markdown` | Readable markdown with section headers |
| JSON | `json` | Structured JSON with blocks as fields |

#### FR-EX-02: Export Flow

| Attribute | Specification |
|-----------|--------------|
| **Description** | User exports a prompt to a target format |
| **Trigger** | "Export" button in export center |
| **Flow** | 1. User clicks Export → 2. Export dialog shows format options → 3. Real-time preview of export output → 4. User selects format → 5. Copy to clipboard or download |
| **Acceptance** | Export is one-click from preview; format selector shows provider-specific notes |
| **Edge Cases** | Export with unresolved variables (warns user); export of empty prompt |

#### FR-EX-03: Provider Compatibility Matrix

| Feature | ChatGPT | Claude | Gemini | OpenRouter |
|---------|---------|--------|--------|------------|
| System messages | ✅ | ✅ | ✅ | ✅ |
| Multi-turn | ✅ | ✅ | ✅ | ✅ |
| JSON mode | ✅ | ✅ | ✅ | ✅ |
| Vision/Images | ✅ | ✅ | ✅ | ✅ |
| Tool/Function calling | ✅ | ❌ | ✅ | Varies |
| Max context (approx) | 128K | 200K | 1M | Varies |
| Streaming | ✅ | ✅ | ✅ | ✅ |

#### FR-EX-04: Variable Interpolation on Export

| Attribute | Specification |
|-----------|--------------|
| **Description** | Variables resolved before export |
| **Flow** | 1. Export initiated → 2. If unresolved variables exist → 3. Variable input dialog shown → 4. User fills values → 5. Variables interpolated → 6. Final export generated |
| **Acceptance** | All `{{variable}}` placeholders replaced with values; unfilled required variables block export |
| **Edge Cases** | Variable used in multiple places (all replaced consistently); variable in block title |

---

## 5. Non-Functional Requirements

### 5.1 Security (NFR-SEC)

| ID | Requirement | Priority |
|----|-------------|----------|
| SEC-01 | All data stored client-side (localStorage/IndexedDB); no data sent to external servers except user-initiated exports | Must Have |
| SEC-02 | No authentication system (static site) — all data is local to the browser | Must Have |
| SEC-03 | Sanitize any user input rendered as HTML (XSS prevention) | Must Have |
| SEC-04 | Content Security Policy headers configured in deployment | Should Have |
| SEC-05 | No secrets, API keys, or tokens stored in the application | Must Have |

### 5.2 Reliability (NFR-REL)

| ID | Requirement | Priority |
|----|-------------|----------|
| REL-01 | Auto-save with 2-second debounce; no data loss on accidental navigation (beforeunload event) | Must Have |
| REL-02 | localStorage fallback if IndexedDB unavailable | Must Have |
| REL-03 | Graceful error handling for localStorage quota exceeded | Must Have |
| REL-04 | All operations are synchronous (no server dependency) | Must Have |
| REL-05 | Export operations must produce correct output even with corrupted state (defensive copying) | Should Have |

### 5.3 Accessibility (NFR-A11Y)

| ID | Requirement | Level |
|----|-------------|-------|
| A11Y-01 | WCAG 2.1 AA compliance across all views | AA |
| A11Y-02 | Full keyboard navigation (Tab, Enter, Escape, Arrow keys, drag-and-drop keyboard alternative) | AA |
| A11Y-03 | Screen reader support: ARIA labels, live regions, roles, focus management | AA |
| A11Y-04 | Color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text | AA |
| A11Y-05 | Focus indicators visible (3:1 contrast ratio minimum) | AA |
| A11Y-06 | All interactive elements reachable and operable via keyboard | AA |
| A11Y-07 | Drag-and-drop operations have keyboard alternative (move up/down buttons) | AA |
| A11Y-08 | Error messages associated with inputs via aria-describedby | AA |
| A11Y-09 | Status announcements via aria-live regions (auto-save, validation results) | AA |
| A11Y-10 | Reduced motion support (prefers-reduced-motion media query) | AA |

### 5.4 Performance (NFR-PERF)

| ID | Requirement | Target |
|----|-------------|--------|
| PERF-01 | Time to Interactive (TTI) | < 2s on 3G |
| PERF-02 | First Contentful Paint (FCP) | < 1.5s |
| PERF-03 | Largest Contentful Paint (LCP) | < 2.5s |
| PERF-04 | Initial bundle size (JS, gzipped) | < 200 KB |
| PERF-05 | Total page weight | < 500 KB |
| PERF-06 | Lighthouse Performance score | ≥ 90 |
| PERF-07 | Route-level code splitting for all feature modules | Required |
| PERF-08 | Lazy load heavy dependencies (e.g., diff library, export formatters) | Required |
| PERF-09 | Debounced auto-save (2s) to prevent excessive writes | Required |
| PERF-10 | Virtual scrolling for prompt library with > 50 items | Recommended |

### 5.5 Maintainability (NFR-MAIN)

| ID | Requirement | Criteria |
|----|-------------|----------|
| MAIN-01 | Clean Architecture layers respected (domain → application → infrastructure → presentation) | Mandatory |
| MAIN-02 | Feature-based module organization with clear boundaries | Mandatory |
| MAIN-03 | No circular dependencies; dependency direction enforced | Mandatory |
| MAIN-04 | TypeScript strict mode with zero exceptions | Mandatory |
| MAIN-05 | All domain logic in pure functions (no UI dependencies) | Mandatory |
| MAIN-06 | Test coverage thresholds enforced (unit ≥ 80%, integration ≥ 70%) | Mandatory |
| MAIN-07 | ADRs for all significant architectural decisions | Mandatory |

### 5.6 Scalability (NFR-SCAL)

| ID | Requirement | Boundary |
|----|-------------|----------|
| SCAL-01 | Support up to 500 prompts in library without degradation | Storage bound by browser quota |
| SCAL-02 | Support up to 50 versions per prompt | Storage bound |
| SCAL-03 | Support up to 20 blocks per prompt | UI usability bound |
| SCAL-04 | Support up to 50 templates in template library | Storage bound |
| SCAL-05 | Compile+export operations complete in < 500ms for any prompt | CPU bound |

### 5.7 Testability (NFR-TEST)

| ID | Requirement | Priority |
|----|-------------|----------|
| TEST-01 | Domain layer fully testable without mocking (pure functions) | Must Have |
| TEST-02 | Repository abstractions enable in-memory test implementations | Must Have |
| TEST-03 | Zustand stores testable in isolation | Must Have |
| TEST-04 | Components testable with mock stores | Must Have |
| TEST-05 | E2E tests run against production build (no server dependency) | Must Have |

---

## 6. Domain Model Specification

> **Delegation**: This section is the specification for the Domain Modeling Agent.  
> **Invoke**: `domain-modeler` agent with this specification as input.  
> **Dependency**: Run after Prompt Engineer delivers prompt domain specifications.

### 6.1 Core Entities

#### Prompt
| Property | Type | Description |
|----------|------|-------------|
| `id` | PromptId (VO) | Unique identifier |
| `title` | string | User-defined title |
| `blocks` | Block[] | Ordered list of blocks |
| `version` | VersionNumber (VO) | Current version number |
| `status` | PromptStatus (enum) | Draft, Published, Archived |
| `variables` | Variable[] | Declared variables |
| `templateId` | TemplateId (VO, optional) | Source template if created from template |
| `createdAt` | Timestamp (VO) | Creation timestamp |
| `updatedAt` | Timestamp (VO) | Last modification timestamp |
| `tags` | Tag[] | User-defined categorization tags |

#### Block
| Property | Type | Description |
|----------|------|-------------|
| `id` | BlockId (VO) | Unique identifier |
| `type` | BlockType (enum) | Role, Context, Objective, Constraints, Examples, OutputFormat, Variables, Notes |
| `title` | string | User-editable title |
| `content` | BlockContent (VO) | Type-specific content payload |
| `enabled` | boolean | Include in compiled prompt? |
| `order` | number | Display order index |
| `collapsed` | boolean | UI state only |
| `createdAt` | Timestamp (VO) | Creation time |
| `updatedAt` | Timestamp (VO) | Last modification time |

#### PromptTemplate
| Property | Type | Description |
|----------|------|-------------|
| `id` | TemplateId (VO) | Unique identifier |
| `name` | string | Template name |
| `category` | TemplateCategory (enum) | Coding, Architecture, ContentCreation, Marketing, Analysis, Research, ProductDesign, Custom |
| `blocks` | BlockTemplate[] | Template block definitions (content as defaults) |
| `variables` | Variable[] | Declared variables with defaults |
| `createdAt` | Timestamp (VO) | Creation timestamp |
| `version` | VersionNumber (VO) | Template version |

#### Version
| Property | Type | Description |
|----------|------|-------------|
| `id` | VersionId (VO) | Unique identifier |
| `promptId` | PromptId (VO) | Parent prompt |
| `number` | VersionNumber (VO) | Sequential version number |
| `snapshot` | PromptSnapshot (VO) | Complete prompt state at version |
| `status` | VersionStatus (enum) | Draft, Published, Archived |
| `message` | string (optional) | User-provided version description |
| `createdAt` | Timestamp (VO) | Version creation time |

### 6.2 Value Objects

| VO | Properties | Equality | Notes |
|----|------------|----------|-------|
| `PromptId` | `value: string` (UUID) | By value | Branded type |
| `BlockId` | `value: string` (UUID) | By value | Branded type |
| `TemplateId` | `value: string` (UUID) | By value | Branded type |
| `VersionId` | `value: string` (UUID) | By value | Branded type |
| `VersionNumber` | `value: number` | By value | Auto-incrementing |
| `Timestamp` | `value: Date` | By value | Immutable |
| `Tag` | `value: string` | By value | Lowercase, trimmed |
| `BlockContent` | `type: BlockType, data: Record<string, unknown>` | By structure | Sealed union per type |
| `PromptSnapshot` | Full prompt state (all properties) | By structure | Used for version snapshots |
| `ExportResult` | `format: ExportFormat, content: string, tokens: number` | Reference | Result of export |
| `ValidationResult` | `rules: ValidationRule[], passed: boolean, errors: ValidationError[]` | Reference | Validation output |
| `QualityScore` | `clarity: number, specificity: number, completeness: number` | By structure | 0-100 per dimension |

### 6.3 Aggregates

#### PromptAggregate
- **Root**: `Prompt`
- **Entities**: `Prompt`, `Block[]`, `Variable[]`
- **VOs**: All value objects above
- **Invariants**:
  - Prompt must have at least one Role block
  - Block ordering must follow placement rules
  - Variable names must be unique within prompt
  - Version must increment sequentially

#### TemplateAggregate
- **Root**: `PromptTemplate`
- **Entities**: `BlockTemplate[]`, `Variable[]`
- **Invariants**:
  - Template must have at least required blocks per category
  - Template variables must be consistent across blocks

#### VersionAggregate
- **Root**: `Version`
- **Entities**: Version chain via `promptId`
- **Invariants**:
  - Version numbers are sequential per prompt
  - Only one active Draft per prompt
  - Published versions are immutable

### 6.4 Domain Services

| Service | Method | Description |
|---------|--------|-------------|
| `PromptCompiler` | `compile(prompt): CompiledPrompt` | Compiles blocks into a single unified prompt string |
| `PromptValidator` | `validate(prompt): ValidationResult` | Runs all validation rules against a prompt |
| `PromptOptimizer` | `analyze(prompt): QualityScore` | Runs quality analysis |
| `PromptExporter` | `export(prompt, format): ExportResult` | Exports prompt to target format |
| `VersionManager` | `createVersion(prompt): Version` | Creates snapshot version |
| `TemplateInstantiator` | `instantiate(template): Prompt` | Creates prompt from template |

### 6.5 Domain Events

| Event | Payload | Trigger |
|-------|---------|---------|
| `PromptCreated` | `promptId, title, timestamp` | New prompt creation |
| `PromptUpdated` | `promptId, versionNumber, timestamp` | Auto-save or explicit save |
| `PromptDeleted` | `promptId, timestamp` | Move to archive |
| `PromptRestored` | `promptId, timestamp` | Restore from archive |
| `BlockAdded` | `promptId, blockType, order` | Block added to prompt |
| `BlockRemoved` | `promptId, blockId, blockType` | Block removed |
| `BlockReordered` | `promptId, blockId, oldOrder, newOrder` | Block reordered |
| `VersionTagged` | `promptId, versionNumber, status` | Version published/archived |
| `VersionRolledBack` | `promptId, fromVersion, toVersion` | Rollback performed |
| `TemplateCreated` | `templateId, name, category` | Template saved |
| `TemplateApplied` | `templateId, promptId` | Template used |
| `PromptExported` | `promptId, format, tokenCount` | Export completed |

### 6.6 Business Rules (Pure Functions)

| Rule | Signature | Description |
|------|-----------|-------------|
| `validateBlockOrder` | `(blocks: Block[]) => ValidationError[]` | Validates block ordering constraints |
| `validateRequiredBlocks` | `(blocks: Block[]) => ValidationError[]` | Checks required block types present |
| `validateDuplicateBlocks` | `(blocks: Block[]) => ValidationError[]` | Detects duplicate block types |
| `validateVariableConsistency` | `(blocks: Block[], variables: Variable[]) => ValidationError[]` | Validates variable declarations vs usage |
| `validateVariableSyntax` | `(content: string) => ValidationError[]` | Validates `{{name}}` syntax |
| `validateVersionIncrement` | `(current: VersionNumber, next: VersionNumber) => boolean` | Ensures sequential versioning |
| `validateTemplateCompleteness` | `(template: PromptTemplate) => ValidationError[]` | Checks template has required blocks |
| `calculateTokenCount` | `(text: string, provider: ProviderType) => number` | Estimates tokens per provider |
| `detectAmbiguity` | `(text: string) => AmbiguityMatch[]` | Finds ambiguous language |
| `detectRedundancy` | `(blocks: Block[]) => RedundancyMatch[]` | Finds redundant content |

### 6.7 Repository Interfaces

| Repository | Methods | Description |
|------------|---------|-------------|
| `IPromptRepository` | `getById(id), getAll(), save(prompt), delete(id), search(query)` | Prompt CRUD |
| `IVersionRepository` | `getByPromptId(promptId), getById(id), save(version), delete(id)` | Version persistence |
| `ITemplateRepository` | `getById(id), getAll(), getByCategory(category), save(template), delete(id)` | Template persistence |
| `IPromptQuery` | `search(query), filterByStatus(status), filterByTag(tag), sortByDate(direction)` | Query operations |

---

## 7. UX/UI Specification

> **Delegation**: This section is the specification for the UX/UI Architect Agent.  
> **Invoke**: `ux-ui-architect` agent with this specification and the domain model as input.  
> **Dependency**: Run after Prompt Engineer delivers prompt domain specs, in parallel with Domain Modeler.

### 7.1 Navigation Structure

```
Prompt Architect
├── 📋 Library (default view)
│   ├── Prompt List (grid/list toggle)
│   ├── Search & Filter
│   ├── Folder/Collection Tree
│   └── Quick Actions (duplicate, delete, archive)
├── ✏️ Editor (prompt composition)
│   ├── Block Palette
│   ├── Canvas (block editor)
│   ├── Validation Panel
│   ├── Preview Panel
│   └── Export Controls
├── 📂 Templates
│   ├── Category Browser
│   ├── Template List
│   └── Template Preview
├── ⏱ Version History
│   ├── Timeline
│   ├── Diff Viewer
│   └── Rollback Controls
└── ⚙️ Settings
    ├── Theme (light/dark)
    ├── Editor Preferences
    └── Export Defaults
```

### 7.2 User Flows (High Level)

#### Flow 1: Create Prompt from Scratch
```
Library → New Prompt → Canvas (empty) → Add Role block → Fill content
    → Add Context → Add Objective → Add Examples → Add Output Format
    → Reorder blocks (drag) → Validate → Fix warnings → Export
```

#### Flow 2: Create Prompt from Template
```
Library → Templates → Select Category → Browse → Select Template
    → "Use Template" → New prompt from template → Customize blocks
    → Fill variables → Validate → Export
```

#### Flow 3: Version Management
```
Editor → Make changes → Auto-save (draft) → "Publish" → Version saved
    → Continue editing (new draft) → Version History → Select version
    → View diff → "Restore" → Confirm → Restored version loaded
```

#### Flow 4: Export
```
Editor → Export button → Export dialog → Select format → Preview
    → Resolve variables → Copy/Download → Success confirmation
```

### 7.3 Design System Direction

| Token Category | Direction | Requirements |
|----------------|-----------|--------------|
| **Color** | Professional, calm palette | Accessible contrast, light/dark mode, semantic colors for validation states |
| **Typography** | System font stack | Readable at all sizes, clear hierarchy via weight/size/color |
| **Spacing** | 4px base unit | Consistent rhythm, WCAG touch targets (44x44px minimum) |
| **Elevation** | Subtle shadows | Drag states, modals, dropdowns |
| **Motion** | Deliberate, purposeful | Anime.js for micro-interactions; all motions serve usability goals |

### 7.4 Animation Guidelines (Anime.js)

**Core Principles:**
1. All animations must serve a usability purpose — never decorative
2. Animations must respect `prefers-reduced-motion`
3. Maximum animation duration: 300ms (200ms preferred)
4. Easing: ease-out for exits, ease-out for entrances (slight overshoot optional for emphasis)

**Defined Animation Points:**

| Animation | Purpose | Spec |
|-----------|---------|------|
| Block add | Reveal new block content | Fade in + slide down (200ms, ease-out) |
| Block remove | Signal block removal | Fade out + collapse (150ms, ease-out) |
| Block reorder | Show position change | Translate to new position (250ms, ease-out) |
| Drag lift | Indicate draggable state | Scale up 1.02 + elevation shadow (150ms) |
| Validation badge | Draw attention to issues | Pulse animation (300ms, 2 repeats) |
| Toast notification | Transient feedback | Slide in from top, auto-dismiss (200ms in, 300ms out) |
| Panel toggle | Expand/collapse side panels | Width/height transition (250ms, ease-out) |
| Page transition | Navigation context change | Fade (150ms) — no slide transitions |
| Diff highlight | Show version changes | Background color flash (500ms) |
| Export complete | Confirm action | Checkmark draw + success (300ms) |

### 7.5 Accessibility Requirements (Per View)

| View | Key Requirements |
|------|-----------------|
| **Library** | List navigation via arrow keys; grid/list toggle announced; search results announced |
| **Editor** | Tab through blocks; Enter to edit block; keyboard drag alternative (move up/down buttons); focus trap in modals; live region for validation status |
| **Templates** | Category tab navigation; template cards focusable; preview modal accessible |
| **Version History** | Timeline slider keyboard operable; diff pane readable by screen readers |
| **Export Dialog** | Format selector clear; preview in accessible format; copy button announces success |

### 7.6 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column; block palette as bottom sheet; preview hidden |
| Tablet | 640-1024px | Two column; block palette as collapsible sidebar |
| Desktop | > 1024px | Three column (palette, canvas, preview); full layout |
| Wide | > 1536px | Max-width container; optional side-by-side editor preview |

---

## 8. Frontend Architecture Specification

> **Delegation**: This section is the specification for the Frontend Architect Agent.  
> **Invoke**: `frontend-architect` agent with this specification, UX/UI spec, and domain model as input.  
> **Dependency**: Run after UX/UI Architect and Domain Modeler complete, and after Architecture Guardian Gate 1 approves.

### 8.1 Technology Stack (Fixed)

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI library |
| TypeScript | 5.x | Strict mode typing |
| Vite | 5.x | Build tool |
| TailwindCSS | 3.x | Utility-first CSS |
| Zustand | 4.x | State management |
| Anime.js | 3.x | Animation library |
| React Router | 6.x | Client-side routing |
| Vitest | 1.x | Test runner |
| React Testing Library | 14.x | Component testing |
| Playwright | 1.x | E2E testing |

### 8.2 Module Structure

```
src/
├── domain/                    # Layer 0: Enterprise business rules
│   ├── entities/              # Domain entities
│   ├── value-objects/         # Immutable value types
│   ├── aggregates/            # Aggregate roots
│   ├── services/              # Domain service interfaces
│   ├── events/                # Domain event types
│   ├── repositories/          # Repository interfaces
│   ├── rules/                 # Pure business rule functions
│   └── types/                 # Shared domain types
│
├── application/               # Layer 1: Use cases
│   ├── use-cases/             # Application use cases
│   ├── ports/                 # Input/output port interfaces
│   └── services/              # Application service implementations
│
├── infrastructure/            # Layer 2: Framework adapters
│   ├── persistence/           # Repository implementations (localStorage, IndexedDB)
│   ├── animation/             # Anime.js adapter/hooks
│   ├── export/                # Export format implementations
│   └── utils/                 # Shared utilities
│
├── presentation/              # Layer 3: React UI
│   ├── features/              # Feature-based modules
│   │   ├── prompt-library/    # Library feature
│   │   │   ├── components/    # Feature components
│   │   │   ├── hooks/         # Feature hooks
│   │   │   ├── stores/        # Feature store slices
│   │   │   ├── types/         # Feature types
│   │   │   └── index.ts       # Public API
│   │   ├── prompt-editor/     # Editor feature
│   │   ├── version-history/   # Version history feature
│   │   ├── export-center/     # Export feature
│   │   ├── templates/         # Templates feature
│   │   └── settings/          # Settings feature
│   ├── routing/               # Route definitions and guards
│   ├── layouts/               # App layout components
│   ├── shared/                # Shared UI components
│   │   ├── atoms/             # Button, Input, Badge, etc.
│   │   ├── molecules/         # Card, Modal, Toast, etc.
│   │   └── organisms/         # Header, Sidebar, etc.
│   ├── theme/                 # Design tokens, TailwindCSS config
│   └── App.tsx                # Root component
│
└── config/                    # Build and tool configuration
    ├── vite.config.ts
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── vitest.config.ts
```

### 8.3 Dependency Rules

```
domain/ → (nothing)           # Domain depends on NOTHING
application/ → domain/         # Application depends only on domain
infrastructure/ → domain/      # Infrastructure depends on domain interfaces
presentation/ → application/   # Presentation depends on application
presentation/ → infrastructure/# Presentation uses infrastructure adapters

NO dependency from domain/ → application/
NO dependency from domain/ → infrastructure/
NO dependency from domain/ → presentation/
NO cross-feature imports between feature modules
```

### 8.4 State Management Strategy (Zustand)

| Store Slice | Responsibility | Key State |
|-------------|---------------|-----------|
| `usePromptStore` | Prompt CRUD and editing | `prompts: Map<PromptId, Prompt>`, `activePromptId`, `dirtyFlag` |
| `useEditorStore` | Editor UI state | `expandedBlocks`, `selectedBlock`, `validationResults`, `previewContent` |
| `useVersionStore` | Version management | `versions: Map<PromptId, Version[]>`, `selectedVersions` (for diff) |
| `useTemplateStore` | Template management | `templates: Template[]`, `activeCategory`, `templatePreview` |
| `useUIStore` | Global UI state | `theme`, `sidebarOpen`, `panelWidth`, `toasts`, `modalState` |
| `useExportStore` | Export flow state | `selectedFormat`, `exportPreview`, `variableValues`, `exportHistory` |

**Middleware Configuration:**
- All stores: `immer` for immutable updates
- `usePromptStore`, `useVersionStore`, `useTemplateStore`: `persist` (localStorage)
- `useEditorStore`, `useUIStore`: no persistence
- Dev mode only: `devtools` middleware

### 8.5 Routing Strategy (React Router 6)

```
/                        → Redirect to /library
/library                 → PromptLibrary (lazy)
/library/:id             → PromptEditor (lazy)
/templates               → TemplateList (lazy)
/templates/:id           → TemplatePreview (lazy)
/versions/:promptId      → VersionHistory (lazy)
/export/:promptId        → ExportCenter (lazy)
/settings                → Settings (lazy)
```

All routes lazy-loaded with `React.lazy()` + `Suspense` with loading skeleton.

### 8.6 Component Hierarchy (Top-Level)

```
App
├── ThemeProvider
│   └── Router
│       └── AppLayout
│           ├── Header
│           │   ├── Logo
│           │   ├── Navigation (Library | Templates | ...)
│           │   └── ThemeToggle
│           ├── Sidebar (conditional)
│           └── MainContent
│               ├── <Outlet /> (routed content)
│               └── ToastContainer
```

### 8.7 Custom Hooks Pattern

| Hook | Responsibility | Example |
|------|---------------|---------|
| `usePromptBuilder` | Prompt editing operations | `usePromptBuilder(id)` → `{prompt, addBlock, removeBlock, reorderBlocks}` |
| `useAutoSave` | Debounced persistence | `useAutoSave(prompt, 2000)` |
| `useDragAndDrop` | Block reordering | `useDragAndDrop(blocks, onReorder)` |
| `useAnimatePresence` | Mount/unmount animations | `useAnimatePresence(visible, options)` |
| `useAnimateTimeline` | Sequential animations | `useAnimateTimeline(steps)` |
| `useValidation` | Real-time validation | `useValidation(prompt)` → `{results, errors, warnings}` |
| `useExport` | Export operations | `useExport(promptId)` → `{exportPrompt, preview, formats}` |
| `useVersionDiff` | Version comparison | `useVersionDiff(v1, v2)` → `{diff, changes}` |
| `useKeyboardNavigation` | Keyboard interaction | `useKeyboardNavigation(blockList, callbacks)` |

### 8.8 Anime.js Integration Pattern

```typescript
// Pattern: Encapsulated anime.js calls in custom hooks
// NEVER use anime.js directly in components

// Hook template:
function useAnimatePresence(
  isVisible: boolean,
  options: { duration?: number; easing?: string }
): { ref: RefObject<HTMLDivElement> } {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    // anime({ targets: ref.current, ... })
  }, [isVisible]);
  
  return { ref };
}
```

---

## 9. Testing Strategy Specification

> **Delegation**: This section is the specification for the Testing Architect Agent.  
> **Invoke**: `testing-architect` agent with this specification and all implementation artifacts as input.  
> **Dependency**: Run after Frontend Architect delivers implementation.

### 9.1 Test Pyramid

```
        ╱╲
       ╱ E2E ╲            ← Playwright: 5-10% of tests
      ╱────────╲
     ╱Integration╲         ← Vitest + RTL: 20-30% of tests
    ╱──────────────╲
   ╱   Unit Tests    ╲     ← Vitest: 60-70% of tests
  ╱────────────────────╲
```

### 9.2 Coverage Targets

| Layer | Coverage Target | Tool |
|-------|----------------|------|
| Domain entities & VOs | 100% line, 90% branch | Vitest |
| Business rules (pure functions) | 100% line, 100% branch | Vitest |
| Domain services | 100% line, 90% branch | Vitest |
| Zustand stores | 90% line, 80% branch | Vitest |
| Custom hooks | 90% line, 80% branch | Vitest + renderHook |
| Components (all states) | 85% line, 75% branch | Vitest + RTL |
| Integration (feature workflows) | 80% line, 70% branch | Vitest + RTL |
| E2E (critical journeys) | 100% of defined scenarios | Playwright |
| Accessibility | 0 violations per component | vitest-axe |

### 9.3 Test Types Detail

#### Unit Tests
- **Target**: Domain entities, value objects, business rules, utilities
- **Pattern**: Pure function input/output testing
- **Mocking**: None required (pure functions)
- **Coverage**: Every business rule with valid/invalid/boundary inputs

#### Component Tests
- **Target**: Every component in every state
- **States**: Normal, loading, empty, error, disabled, focused
- **Pattern**: `render` → `screen.findBy*` → fireEvent → assert
- **Mocking**: Mock store slices and hooks only
- **Accessibility**: `vitest-axe` check per render

#### Integration Tests
- **Target**: Feature workflows spanning components
- **Pattern**: Render feature → simulate user flow → assert state changes
- **Mocking**: Real stores with mock repository implementations

#### E2E Tests (Playwright)
- **Target**: Critical user journeys
- **Browser Coverage**: Chromium, Firefox, WebKit
- **Viewport Coverage**: 375px, 768px, 1280px
- **Journeys**:
  1. Create prompt → add blocks → reorder → validate → export
  2. Create from template → customize → publish → version history → rollback
  3. Duplicate prompt → modify → compare versions → export different format
  4. Create → archive → search → restore → delete permanently

### 9.4 Quality Gates

| Gate | Threshold | Action on Failure |
|------|-----------|-------------------|
| TypeScript strict | 0 errors | Block PR merge |
| ESLint | 0 errors, 0 warnings | Block PR merge |
| Unit test coverage | ≥ 80% line, ≥ 70% branch | Warning (block if < 70%) |
| Integration coverage | ≥ 70% line | Warning |
| E2E tests | 100% pass | Block PR merge |
| Accessibility audit | 0 violations | Block PR merge |
| Build | Success | Block PR merge |

### 9.5 Test Naming Convention

```
src/
├── domain/
│   ├── entities/
│   │   └── Prompt.test.ts
│   ├── value-objects/
│   │   └── PromptId.test.ts
│   └── rules/
│       └── validateBlockOrder.test.ts
├── application/
│   └── use-cases/
│       └── CreatePrompt.test.ts
├── infrastructure/
│   └── persistence/
│       └── LocalStoragePromptRepository.test.ts
└── presentation/
    └── features/
        └── prompt-editor/
            ├── components/
            │   ├── BlockCard.test.tsx
            │   └── BlockPalette.test.tsx
            ├── hooks/
            │   └── usePromptBuilder.test.ts
            └── stores/
                └── promptStore.test.ts
```

---

## 10. CI/CD & DevOps Specification

> **Delegation**: This section is the specification for the DevOps Agent.  
> **Invoke**: `devops` agent with this specification as input.  
> **Dependency**: Run after Frontend Architect confirms build configuration.

### 10.1 CI Pipeline (GitHub Actions)

```yaml
name: CI
trigger: [push, pull_request]

jobs:
  validate:
    steps:
      - Checkout
      - Setup Bun
      - Install dependencies (bun install)
      - TypeScript check (bun run typecheck)
      - Lint (bun run lint)
  
  test:
    needs: [validate]
    strategy:
      matrix:
        test-type: [unit, integration]
    steps:
      - Checkout
      - Setup Bun
      - Install dependencies
      - Run tests (bun run test:${test-type})
      - Upload coverage
  
  e2e:
    needs: [validate]
    steps:
      - Checkout
      - Setup Bun
      - Install dependencies
      - Install Playwright browsers
      - Build (bun run build)
      - Run E2E (bun run test:e2e)
  
  build:
    needs: [test, e2e]
    steps:
      - Checkout
      - Setup Bun
      - Install dependencies
      - Build (bun run build)
      - Validate build (check bundle size, file integrity)
      - Upload build artifact
```

### 10.2 CD Pipeline (GitHub Pages)

```yaml
name: Deploy
trigger:
  push:
    branches: [main]

jobs:
  deploy:
    needs: [ci]  # Reference CI workflow
    steps:
      - Download build artifact
      - Deploy to GitHub Pages
      - Verify deployment (health check URL)
      - Notify success/failure
```

### 10.3 Build Configuration (Vite)

| Setting | Value |
|---------|-------|
| Code splitting | Route-level (`React.lazy`) |
| Asset hashing | Content hash in filename |
| CSS | TailwindCSS (purged) |
| JS target | ES2020 |
| Source maps | `hidden` in production |
| Compression | gzip (via deployment) |
| Bundle analysis | `rollup-plugin-visualizer` |

### 10.4 Performance Budgets

| Asset | Budget |
|-------|--------|
| Initial JS (gzipped) | < 200 KB |
| Initial CSS (gzipped) | < 50 KB |
| Total page weight | < 500 KB |
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |

### 10.5 Environment Configuration

| Environment | Branch | Purpose |
|-------------|--------|---------|
| Development | Any branch | `bun run dev` — HMR server |
| Preview | PR branch | GitHub Pages preview deploy |
| Production | `main` | GitHub Pages production deploy |

### 10.6 Release Workflow

```
Feature branch → PR to develop
  → CI passes → Code Review approved → Merge to develop
  → (Sprint end) → PR develop to main
  → CI passes → Architecture Guardian sign-off → Merge to main
  → CD deploys to GitHub Pages
  → Tag release (v1.x.x)
  → Changelog generated
```

---

## 11. Documentation Strategy Specification

> **Delegation**: This section is the specification for the Documentation Agent.  
> **Invoke**: `documentation` agent with all project artifacts as input.  
> **Dependency**: Run after each feature completion and before releases.

### 11.1 Required Documents

| Document | Location | When Created | Owner |
|----------|----------|-------------|-------|
| ADR-001: Technology Stack | `.opencode/docs/adr/` | Phase 0 | Orchestrator |
| ADR-002: Clean Architecture | `.opencode/docs/adr/` | Phase 0 | Architecture Guardian |
| ADR-003: State Management (Zustand) | `.opencode/docs/adr/` | Phase 2 | Frontend Architect |
| ADR-004: Animation Library (Anime.js) | `.opencode/docs/adr/` | Phase 2 | UX/UI Architect |
| ADR-005: Export Architecture | `.opencode/docs/adr/` | Phase 1 | Prompt Engineer |
| ADR-006: Persistence Strategy | `.opencode/docs/adr/` | Phase 2 | Domain Modeler |
| ADR-007: Testing Strategy | `.opencode/docs/adr/` | Phase 0 | Testing Architect |
| C4 Context Diagram | `.opencode/docs/diagrams/` | Phase 0 | Documentation |
| C4 Container Diagram | `.opencode/docs/diagrams/` | Phase 0 | Documentation |
| C4 Component Diagrams | `.opencode/docs/diagrams/` | Per feature | Documentation |
| Developer Guide | `.opencode/docs/developer-guide.md` | Phase 0 | Documentation |
| Architecture Overview | `.opencode/docs/architecture-overview.md` | Phase 0 | Documentation |
| Agent Interaction Model | `.opencode/docs/agent-interactions.md` | Phase 0 | Documentation |
| Implementation Roadmap | `.opencode/docs/implementation-roadmap.md` | Phase 0 | Orchestrator |
| Contribution Guide | `CONTRIBUTING.md` (project root) | Phase 0 | Documentation |
| Changelog | `CHANGELOG.md` (project root) | Per release | Documentation |

### 11.2 ADR Template

Each ADR must follow:

```markdown
# ADR-{NNN}: {Title}

## Status
Proposed | Accepted | Deprecated | Superseded

## Context
{What is the issue motivating this decision?}

## Decision
{What is the change being proposed?}

## Consequences
{What becomes easier or harder?}

## Compliance
{How will this decision be enforced?}
```

### 11.3 Documentation Principles

1. **Live documentation**: Docs stay in sync with codebase; update on every change
2. **C4 model**: Architecture visualizations follow C4 model (Context, Container, Component, Code)
3. **Mermaid diagrams**: All diagrams in Mermaid format for version control
4. **Decision-first**: ADRs capture the "why" not just the "what"
5. **DRY documentation**: Single source of truth; reference rather than duplicate

---

## 12. Architecture Governance Specification

> **Delegation**: This section is the specification for the Architecture Guardian Agent.  
> **Invoke**: `architecture-guardian` agent with this specification as input.  
> **Dependency**: Active from Phase 0 onward; invoked at all governance gates.

### 12.1 SOLID Enforcement Rules

| Principle | Enforced Rule | Violation Severity |
|-----------|--------------|-------------------|
| **Single Responsibility** | Each module/class must have exactly one reason to change | Critical |
| **Open/Closed** | Domain entities open for extension via composition, not modification | Critical |
| **Liskov Substitution** | All interface implementations must be fully substitutable | Critical |
| **Interface Segregation** | Interfaces must be specific to client needs; no fat interfaces | Major |
| **Dependency Inversion** | Domain layer must not depend on infrastructure or presentation | Blocker |

### 12.2 Layer Rules

```
DIRECTION OF DEPENDENCY
                   
┌──────────────────┐
│  Presentation    │  (can depend on Application, Infrastructure)
├──────────────────┤
│  Infrastructure  │  (can depend on Domain interfaces only)
├──────────────────┤
│  Application     │  (can depend on Domain only)
├──────────────────┤
│  Domain          │  (depends on NOTHING — zero framework dependencies)
└──────────────────┘
```

**Enforced checks:**
- No `import` from `presentation/` in `domain/` → Blocker
- No `import` from `infrastructure/` in `domain/` → Blocker
- No `import` from `presentation/` in `application/` → Blocker
- No cross-feature imports (e.g., `prompt-editor` → `version-history`) → Blocker
- No direct `animejs` import in components → Major (must use hooks)
- No `localStorage` access in domain layer → Blocker

### 12.3 Review Process

**Gate 1: Pre-Implementation Architecture Review**
```
Input: Domain model + UX design + Feature specs
Check: SOLID compliance, layer rules, ADR alignment
Output: Approved | Conditional | Rejected
Blocking: Layer violations, ADR conflicts, SOLID violations
```

**Gate 2: Pre-Merge Architecture Review**
```
Input: Implementation code + tests
Check: Layer boundaries, dependency direction, TypeScript strictness
Output: Pass | Fail
Blocking: Layer violations, circular dependencies, `any` types
```

### 12.4 ADR Compliance

- Every architectural decision must have an ADR before implementation
- ADR changes require: new ADR proposing change → review period → acceptance → supersedes old ADR
- Architecture Guardian validates implementation against active ADRs
- Any conflict between implementation and ADR = blocker until resolved

### 12.5 Technical Debt Management

| Severity | Response | Resolution Timeline |
|----------|----------|-------------------|
| Low | Logged; optional remediation | Next 3 releases |
| Medium | Logged; recommended remediation | Next 2 releases |
| High | Logged; scheduled remediation | Next release |
| Critical | Immediate escalation to Orchestrator | Before next release |

---

## 13. OpenCode Configuration Specification

### 13.1 Directory Structure

```
.opencode/
├── agents/                  # Agent definitions
│   ├── orchestrator.md
│   ├── product-analyst.md
│   ├── prompt-engineer.md
│   ├── domain-modeler.md
│   ├── ux-ui-architect.md
│   ├── frontend-architect.md
│   ├── testing-architect.md
│   ├── devops.md
│   ├── code-reviewer.md
│   ├── architecture-guardian.md
│   └── documentation.md
│   Purpose: Define each agent's mission, scope, responsibilities, and invocation rules
│   Ownership: Orchestrator Agent
│   Convention: kebab-case, lowercase, `.md` extension
│
├── skills/                  # Reusable skill definitions
│   ├── acceptance-criteria-generation.md
│   ├── adr-creation.md
│   ├── animejs-integration.md
│   ├── architecture-validation.md
│   ├── cicd-generation.md
│   ├── code-review.md
│   ├── component-design.md
│   ├── documentation-generation.md
│   ├── domain-modeling.md
│   ├── github-pages-deployment.md
│   ├── performance-review.md
│   ├── playwright-generation.md
│   ├── prompt-architecture-design.md
│   ├── prompt-export-specification.md
│   ├── prompt-quality-evaluation.md
│   ├── react-architecture.md
│   ├── requirements-analysis.md
│   ├── security-review.md
│   ├── testing-strategy.md
│   ├── user-story-generation.md
│   └── zustand-architecture.md
│   Purpose: Domain-specific workflows that agents can invoke
│   Ownership: Respective domain agents
│   Convention: kebab-case, lowercase, `.md` extension
│
├── contracts/               # Agent interface contracts (JSON)
│   ├── orchestrator-contract.json
│   ├── product-analyst-contract.json
│   ├── prompt-engineer-contract.json
│   ├── domain-modeler-contract.json
│   ├── ux-ui-architect-contract.json
│   ├── frontend-architect-contract.json
│   ├── testing-architect-contract.json
│   ├── devops-contract.json
│   ├── code-reviewer-contract.json
│   ├── architecture-guardian-contract.json
│   └── documentation-contract.json
│   Purpose: Formal interface definitions for agent-to-agent handoffs
│   Ownership: Orchestrator Agent (maintains registry)
│   Convention: kebab-case, lowercase, `-contract.json` suffix
│
├── workflows/               # Process workflows
│   ├── new-feature.md
│   ├── bug-fix.md
│   ├── refactor.md
│   ├── architecture-review.md
│   └── release.md
│   Purpose: Define step-by-step processes for common work types
│   Ownership: Orchestrator Agent
│   Convention: kebab-case, lowercase, `.md` extension
│
├── templates/               # Document templates
│   ├── adr.md
│   ├── agent-contract.md
│   ├── user-story.md
│   ├── component-spec.md
│   ├── feature-workflow.md
│   └── skill-template.md
│   Purpose: Standardized templates for consistent document creation
│   Ownership: Documentation Agent
│   Convention: kebab-case, lowercase, `.md` extension
│
├── standards/               # Governance and standards
│   ├── coding-standards.md
│   ├── testing-standards.md
│   ├── definition-of-done.md
│   ├── branch-strategy.md
│   ├── review-policy.md
│   ├── pull-request-policy.md
│   └── release-criteria.md
│   Purpose: Enforceable rules for code quality and process compliance
│   Ownership: Architecture Guardian Agent
│   Convention: kebab-case, lowercase, `.md` extension
│
├── checklists/              # Quality checklists
│   ├── onboarding.md
│   ├── pre-commit.md
│   ├── pre-review.md
│   └── pre-release.md
│   Purpose: Step-by-step verification lists for quality gates
│   Ownership: Orchestrator Agent
│   Convention: kebab-case, lowercase, `.md` extension
│
└── docs/                    # Architecture and design documentation
    ├── adr/                  # Architecture Decision Records
    │   ├── ADR-001-technology-stack.md
    │   ├── ADR-002-clean-architecture.md
    │   └── ...
    ├── architecture-overview.md
    ├── developer-guide.md
    ├── agent-interactions.md
    └── implementation-roadmap.md
    Purpose: Living documentation of architectural decisions and system design
    Ownership: Documentation Agent
    Convention: ADRs: `ADR-NNN-description.md`; others: kebab-case
```

### 13.2 Naming Conventions Summary

| Context | Convention | Example |
|---------|-----------|---------|
| Agent files | kebab-case, `.md` | `frontend-architect.md` |
| Contracts | kebab-case, `-contract.json` | `frontend-architect-contract.json` |
| Skills | kebab-case, `.md` | `react-architecture.md` |
| Workflows | kebab-case, `.md` | `new-feature.md` |
| Templates | kebab-case, `.md` | `adr.md` |
| Standards | kebab-case, `.md` | `coding-standards.md` |
| Checklists | kebab-case, `.md` | `pre-commit.md` |
| ADRs | `ADR-NNN-description.md` | `ADR-001-technology-stack.md` |

### 13.3 Ownership Matrix

| Directory | Owner | Review Cadence |
|-----------|-------|----------------|
| `agents/` | Orchestrator | Monthly or on agent change |
| `skills/` | Respective domain agents | Per skill update |
| `contracts/` | Orchestrator | On any interface change |
| `workflows/` | Orchestrator | On process change |
| `templates/` | Documentation | On template update |
| `standards/` | Architecture Guardian | Quarterly review |
| `checklists/` | Orchestrator | On process change |
| `docs/` | Documentation | Continuous (every commit) |

### 13.4 opencode.json Configuration

```json
{
  "agents": {
    "orchestrator": { "path": ".opencode/agents/orchestrator.md" },
    "product-analyst": { "path": ".opencode/agents/product-analyst.md" },
    "prompt-engineer": { "path": ".opencode/agents/prompt-engineer.md" },
    "domain-modeler": { "path": ".opencode/agents/domain-modeler.md" },
    "ux-ui-architect": { "path": ".opencode/agents/ux-ui-architect.md" },
    "frontend-architect": { "path": ".opencode/agents/frontend-architect.md" },
    "testing-architect": { "path": ".opencode/agents/testing-architect.md" },
    "devops": { "path": ".opencode/agents/devops.md" },
    "code-reviewer": { "path": ".opencode/agents/code-reviewer.md" },
    "architecture-guardian": { "path": ".opencode/agents/architecture-guardian.md" },
    "documentation": { "path": ".opencode/agents/documentation.md" }
  },
  "workflows": {
    "new-feature": ".opencode/workflows/new-feature.md",
    "bug-fix": ".opencode/workflows/bug-fix.md",
    "refactor": ".opencode/workflows/refactor.md",
    "architecture-review": ".opencode/workflows/architecture-review.md",
    "release": ".opencode/workflows/release.md"
  },
  "standards": {
    "coding": ".opencode/standards/coding-standards.md",
    "testing": ".opencode/standards/testing-standards.md",
    "definition-of-done": ".opencode/standards/definition-of-done.md"
  }
}
```

---

## 14. Initial Roadmap

### Phase 0: Foundation (Week 1)

**Goal**: Scaffold project, configure tooling, validate agent ecosystem.

| Task | Agent | Dependencies |
|------|-------|-------------|
| Initialize Bun project | Orchestrator | None |
| Configure Vite + React + TypeScript strict | Frontend Architect | Project init |
| Configure TailwindCSS with design tokens | Frontend Architect | Vite setup |
| Set up ESLint + Prettier | Frontend Architect | Project init |
| Set up Vitest + React Testing Library | Testing Architect | Project init |
| Set up Playwright | Testing Architect | Project init |
| Create GitHub Actions CI pipeline | DevOps | Build config |
| Create GitHub Actions CD pipeline (GitHub Pages) | DevOps | Build config |
| Validate agent ecosystem and contracts | Architecture Guardian | All agent configs |
| Create initial ADRs (001, 002) | Documentation | Architecture decisions |

**Deliverable**: Running dev server, passing CI, validated agents, deployable to Pages.

### Phase 1: Core Domain (Week 2)

**Goal**: Formalize domain model, business rules, and persistence interfaces.

| Task | Agent | Dependencies |
|------|-------|-------------|
| Define prompt domain specifications | Prompt Engineer | User stories |
| Model domain entities, VOs, aggregates | Domain Modeler | Prompt Engineer output |
| Implement business rules (pure functions) | Domain Modeler | Entity definitions |
| Define repository interfaces | Domain Modeler | Aggregate definitions |
| Define domain events | Domain Modeler | Entity definitions |
| Architecture review (Gate 1) | Architecture Guardian | Domain model complete |

**Deliverable**: Complete domain model with TypeScript types, business rules, repository interfaces.

### Phase 2: Infrastructure & State (Week 3)

**Goal**: Implement persistence, state management, animation infrastructure.

| Task | Agent | Dependencies |
|------|-------|-------------|
| Implement localStorage repository | Frontend Architect | Repository interfaces |
| Implement in-memory repository (test) | Frontend Architect | Repository interfaces |
| Create Zustand store slices | Frontend Architect | Domain model |
| Configure immer + persist middleware | Frontend Architect | Store design |
| Create Anime.js hooks | Frontend Architect | Animation specs |
| Architecture review | Architecture Guardian | Implementation |

**Deliverable**: Working persistence, Zustand stores, animation hooks.

### Phase 3: UI Components (Weeks 4-5)

**Goal**: Build complete UI with all feature modules.

| Task | Agent | Dependencies |
|------|-------|-------------|
| Implement design system (shared components) | Frontend Architect | Design tokens |
| Build Prompt Library feature | Frontend Architect | Store layer |
| Build Prompt Editor feature | Frontend Architect | Store layer + domain |
| Build Version History feature | Frontend Architect | Store layer |
| Build Export Center feature | Frontend Architect | Export domain |
| Build Templates feature | Frontend Architect | Store layer |
| Implement accessibility (WCAG 2.1 AA) | Frontend Architect | All components |
| Architecture review (Gate 2) | Architecture Guardian | All features |

**Deliverable**: Complete UI with accessibility compliance, responsive design.

### Phase 4: Testing (Week 6)

**Goal**: Achieve coverage targets and quality gates.

| Task | Agent | Dependencies |
|------|-------|-------------|
| Write domain unit tests (100% rules) | Testing Architect | Domain model |
| Write store tests (all transitions) | Testing Architect | Store layer |
| Write component tests (all states) | Testing Architect | Components |
| Write integration tests (feature workflows) | Testing Architect | Features |
| Write E2E tests (critical journeys) | Testing Architect | Build |
| Configure quality gates in CI | DevOps | Test config |
| Accessibility audit | UX/UI Architect | All components |

**Deliverable**: ≥ 80% unit coverage, ≥ 70% integration, E2E for all critical paths.

### Phase 5: Polish & Release (Week 7)

**Goal**: Performance optimization, documentation, and v1.0.0 release.

| Task | Agent | Dependencies |
|------|-------|-------------|
| Bundle analysis and optimization | Frontend Architect | Production build |
| Code splitting and lazy loading | Frontend Architect | Route design |
| Lighthouse optimization | Frontend Architect | All features |
| Complete ADR documentation | Documentation | All decisions |
| C4 model diagrams | Documentation | Architecture |
| Module README files | Documentation | All features |
| Release v1.0.0 | DevOps | All phases complete |
| Post-release validation | Architecture Guardian | Release |

**Deliverable**: Prompt Architect v1.0.0 on GitHub Pages, full documentation, verified quality gates.

---

## 15. Agent Delegation Instructions

### 15.1 How to Use This Specification

1. **Orchestrator** reads this Master Specification and breaks it into work packages
2. Each work package references the relevant section(s) of this document
3. The Orchestrator creates a delegation task with:
   - The exact section(s) to implement
   - The acceptance criteria from this spec
   - The dependencies (inputs from other agents)
   - The output format expected
4. The specialist agent produces deliverables against the spec
5. The Orchestrator validates outputs against the acceptance criteria

### 15.2 Delegation Sequence (Default Order)

```
Phase 0: Agent Setup
  1. Orchestrator → DevOps: CI/CD pipeline
  2. Orchestrator → Frontend Architect: Project scaffolding
  
Phase 1: Specification
  3. Orchestrator → Prompt Engineer: Prompt domain spec
  4. Orchestrator → Domain Modeler: Domain model (parallel with UX/UI)
  5. Orchestrator → UX/UI Architect: Design spec (parallel with Domain Modeler)
  6. Orchestrator → Architecture Guardian: Pre-implementation review
  
Phase 2: Implementation
  7. Orchestrator → Frontend Architect: Infrastructure + state
  8. Orchestrator → Frontend Architect: UI components
  9. Orchestrator → Testing Architect: Test suite
 10. Orchestrator → Architecture Guardian: Pre-merge review
 11. Orchestrator → Code Reviewer: Final review
  
Phase 3: Release
 12. Orchestrator → Documentation: Complete docs
 13. Orchestrator → DevOps: Build + deploy
 14. Orchestrator → Architecture Guardian: Release validation
```

### 15.3 Rework Loop

If any agent's output fails validation:
1. Orchestrator rejects with specific failure reasons (referencing spec section)
2. Agent receives rejection with actionable feedback
3. Agent reworks and resubmits
4. Orchestrator re-validates
5. Max 3 rework attempts before escalation

### 15.4 Conflict Resolution

If two agents produce conflicting recommendations:
1. Orchestrator reviews both positions against this specification
2. If spec is ambiguous, Orchestrator makes a binding decision
3. Decision is documented as a specification clarification
4. Spec is updated for future reference

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| **Block** | Reusable visual unit representing a prompt section (Role, Context, etc.) |
| **Prompt** | Complete set of blocks forming a single prompt structure |
| **Template** | Reusable prompt pattern with default values and variable placeholders |
| **Version** | Immutable snapshot of a prompt at a point in time |
| **Export** | Transform prompt structure into provider-specific format |
| **Validation** | Automated checking of prompt structure and content against rules |
| **Optimization** | Analysis of prompt quality with improvement suggestions |
| **Variable** | Dynamic placeholder in block content, resolved at export time |
| **Collection** | User-defined grouping of prompts for organization |
| **Aggregate** | Domain-Driven Design pattern for consistency boundaries |
| **Value Object** | Immutable object defined by its attributes, not identity |

## Appendix B: Provider Context Window Limits

| Provider | Model | Context Window | Max Output |
|----------|-------|---------------|------------|
| ChatGPT | GPT-4o | 128,000 tokens | 16,384 tokens |
| ChatGPT | GPT-4o-mini | 128,000 tokens | 16,384 tokens |
| Claude | Claude 3.5 Sonnet | 200,000 tokens | 8,192 tokens |
| Claude | Claude 3 Haiku | 200,000 tokens | 8,192 tokens |
| Gemini | Gemini 1.5 Pro | 1,000,000 tokens | 8,192 tokens |
| Gemini | Gemini 1.5 Flash | 1,000,000 tokens | 8,192 tokens |
| OpenRouter | Varies | Varies by model | Varies by model |

## Appendix C: Key Differentiators

| Feature | Prompt Architect | Manual Text Editor | Other Tools |
|---------|------------------|-------------------|-------------|
| Visual block editor | ✅ Native | ❌ | ⚠️ Limited |
| Multi-provider export | ✅ 5+ formats | ❌ Manual | ⚠️ 1-2 formats |
| Validation engine | ✅ Structural + semantic | ❌ | ⚠️ Basic |
| Quality optimization | ✅ Clarity + ambiguity + redundancy | ❌ | ❌ |
| Version management | ✅ Draft → Publish → Archive | ❌ Manual | ⚠️ Basic |
| Template system | ✅ 8 categories + custom | ❌ | ⚠️ Limited |
| Token counting | ✅ Per provider | ❌ | ⚠️ Basic |
| Accessibility | ✅ WCAG 2.1 AA | ❌ | ❌ |
| Zero infrastructure | ✅ Static site | ✅ | ❌ Server needed |
| Open source agentic | ✅ ASDD methodology | ❌ | ❌ |

---

> **End of Master Product Specification v1.0**  
> This document constitutes the definitive specification for the Prompt Architect platform.  
> All development work must conform to this specification.  
> Changes to this specification require Orchestrator approval and ADR documentation.
