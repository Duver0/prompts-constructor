import { ProviderType } from "@/domain/types";

const TOKENS_PER_CHAR: Record<ProviderType, number> = {
  [ProviderType.ChatGPT]: 0.25,
  [ProviderType.Claude]: 0.35,
  [ProviderType.Gemini]: 0.30,
  [ProviderType.OpenRouter]: 0.25,
};

/**
 * Estimates token count for a given text and provider.
 * This is an approximation — actual tokenization varies.
 */
export function calculateTokenCount(
  text: string,
  provider: ProviderType = ProviderType.ChatGPT,
): number {
  const rate = TOKENS_PER_CHAR[provider];
  return Math.ceil(text.length * rate);
}

/**
 * Estimates token count more accurately by accounting
 * for common structural elements.
 */
export function calculateTokenCountDetailed(
  text: string,
  provider: ProviderType = ProviderType.ChatGPT,
): { tokens: number; characters: number; words: number } {
  const characters = text.length;
  const words = text.split(/\s+/).filter(Boolean).length;
  const baseRate = TOKENS_PER_CHAR[provider];
  const tokens = Math.ceil(characters * baseRate);

  return { tokens, characters, words };
}

/**
 * Returns the context window limit for a provider.
 */
export function getContextLimit(provider: ProviderType): number {
  switch (provider) {
    case ProviderType.ChatGPT:
      return 128000;
    case ProviderType.Claude:
      return 200000;
    case ProviderType.Gemini:
      return 1000000;
    case ProviderType.OpenRouter:
      return 128000;
    default:
      return 128000;
  }
}

/**
 * Checks if content fits within a provider's context window.
 */
export function fitsInContextWindow(
  text: string,
  provider: ProviderType,
): { fits: boolean; usedTokens: number; maxTokens: number } {
  const tokens = calculateTokenCount(text, provider);
  const maxTokens = getContextLimit(provider);

  return {
    fits: tokens <= maxTokens,
    usedTokens: tokens,
    maxTokens,
  };
}
