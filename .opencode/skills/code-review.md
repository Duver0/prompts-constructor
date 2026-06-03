# Skill: Code Review

## Domain
Code Review

## Invoked By
Code Reviewer Agent

## Purpose
Comprehensive code quality review enforcing SOLID principles, Clean Architecture compliance, TypeScript strictness, and coding standards.

## Inputs
- Source code files
- Test files
- Coding standards document
- Architecture documentation

## Process
1. Validate SOLID principles:
   - **SRP**: Each class/module has one reason to change
   - **OCP**: Open for extension, closed for modification
   - **LSP**: Subtypes are substitutable for base types
   - **ISP**: Interfaces are specific, not general-purpose
   - **DIP**: High-level modules don't depend on low-level modules
2. Validate Clean Architecture:
   - Domain layer has zero external dependencies
   - Application layer depends on domain abstractions
   - Presentation layer depends on application interfaces
   - Dependency arrows point inward
3. Validate TypeScript strictness:
   - No `any` type usage
   - No implicit any
   - Proper generic constraints
   - Exhaustive type narrowing (switch statements, discriminated unions)
4. Validate coding standards:
   - File naming, folder structure
   - Import ordering
   - Naming conventions
   - File length limits
   - Component patterns
5. Validate test quality:
   - Meaningful assertions (not just snapshot tests)
   - Proper test isolation (no shared mutable state)
   - Coverage of edge cases
   - Test descriptions describe behavior, not implementation

## Output
- Per-file review report with line-level findings
- SOLID compliance score (1-10 per principle)
- Clean Architecture violation list
- TypeScript strictness violation list
- Test quality assessment
- Overall quality verdict: pass | conditional-pass | fail

## Quality Criteria
- Review covers all files in the changeset
- Each finding includes severity, location, and remediation
- Violations are categorized by principle/rule
- Quality verdict is clear and actionable
- False positive rate < 5%
