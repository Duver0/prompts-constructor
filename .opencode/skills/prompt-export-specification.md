# Skill: Prompt Export Specification

## Domain
Prompt Engineering

## Invoked By
Prompt Engineer Agent

## Purpose
Define provider-specific export specifications for all supported AI platforms — ChatGPT, Claude, Gemini, OpenRouter, and custom providers — documenting formatting differences, capability differences, context limitations, and recommended prompt structures.

## Inputs
- Provider API specifications and documentation
- Prompt domain model (blocks, composition rules)
- User stories for export features
- Format transformation requirements

## Process

### Phase 1: Provider Capability Matrix
1. For each supported provider, document:
   - Context window limit (tokens)
   - Supported content types (text, markdown, code blocks, JSON)
   - Message format (single prompt, system/user/assistant roles, multi-turn)
   - Special formatting requirements (XML tags, markdown headings, separation markers)
   - Capability restrictions (no system message, no markdown, no code blocks)
2. Create capability matrix with columns: provider, context_limit, roles_supported, formatting, restrictions

### Phase 2: Format Map Design
1. For each provider, design the output format mapping:
   - How each block type maps to provider-specific formatting
   - How variables are rendered in provider-specific syntax
   - How structural elements (headings, separators, lists) translate
2. Define format transformation rules:
   - Block → markdown headings for ChatGPT
   - Block → XML tags for Claude
   - Block → structured text for Gemini
   - Block → JSON structure for OpenAI Agents API

### Phase 3: Context Management
1. Define context window calculation method per provider
2. Define token estimation rules per block type
3. Define truncation/prioritization strategy when content exceeds limits
4. Define warning thresholds for context utilization

### Phase 4: Template Adaptation
1. For each template category, define provider-specific adaptations
2. Document recommended prompt structure per provider (e.g., Claude prefers XML, ChatGPT prefers markdown)
3. Define fallback behaviors when provider does not support a feature

### Phase 5: Export Validation
1. Define validation rules for provider-specific exports
2. Define completeness checks (all required sections present)
3. Define format correctness rules (valid XML, valid JSON, proper markdown)
4. Define token budget compliance rules

## Output
- Provider capability matrix with context limits, roles, formatting
- Per-provider format maps with block-to-format transformations
- Context management rules (calculation, limits, prioritization)
- Template adaptation specifications per provider
- Export validation rules per provider

## Quality Criteria
- Every supported provider has complete export specifications
- Format maps are accurate (verified against provider docs)
- Context limits are correctly calculated per provider
- Token estimation is within 10% of actual token count
- Fallback behaviors are defined for unsupported features
- Export validation catches format errors before output
