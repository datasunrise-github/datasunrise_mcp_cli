/**
 * Description Registry for DataSunrise CLI MCP
 * 
 * This module provides a central registry for enhanced descriptions of commands and sequences.
 * It allows retrieving detailed metadata, examples, and contextual help for all CLI operations.
 */

import { EnhancedDescription } from './enhanced_descriptions.js';

/**
 * Registry for command descriptions
 */
const commandDescriptions: Map<string, EnhancedDescription> = new Map();

/**
 * Registry for sequence descriptions
 */
const sequenceDescriptions: Map<string, EnhancedDescription> = new Map();

/**
 * Register a command description in the registry
 * @param commandName Name of the command
 * @param description Enhanced description object
 */
export function registerCommandDescription(commandName: string, description: EnhancedDescription): void {
  commandDescriptions.set(commandName, description);
}

/**
 * Register a sequence description in the registry
 * @param sequenceName Name of the sequence
 * @param description Enhanced description object
 */
export function registerSequenceDescription(sequenceName: string, description: EnhancedDescription): void {
  sequenceDescriptions.set(sequenceName, description);
}

/**
 * Get enhanced description for a command
 * @param commandName Name of the command
 * @returns Enhanced description or undefined if not found
 */
export function getCommandDescription(commandName: string): EnhancedDescription | undefined {
  return commandDescriptions.get(commandName);
}

/**
 * Get enhanced description for a sequence
 * @param sequenceName Name of the sequence
 * @returns Enhanced description or undefined if not found
 */
export function getSequenceDescription(sequenceName: string): EnhancedDescription | undefined {
  return sequenceDescriptions.get(sequenceName);
}

/**
 * Get all registered command names
 * @returns Array of command names
 */
export function getAllCommandNames(): string[] {
  return Array.from(commandDescriptions.keys());
}

/**
 * Get all registered sequence names
 * @returns Array of sequence names
 */
export function getAllSequenceNames(): string[] {
  return Array.from(sequenceDescriptions.keys());
}

/**
 * Check if a command has an enhanced description
 * @param commandName Name of the command
 * @returns True if the command has an enhanced description
 */
export function hasCommandDescription(commandName: string): boolean {
  return commandDescriptions.has(commandName);
}

/**
 * Check if a sequence has an enhanced description
 * @param sequenceName Name of the sequence
 * @returns True if the sequence has an enhanced description
 */
export function hasSequenceDescription(sequenceName: string): boolean {
  return sequenceDescriptions.has(sequenceName);
}

/**
 * Get all commands with enhanced descriptions
 * @returns Map of command names to descriptions
 */
export function getAllCommandDescriptions(): Map<string, EnhancedDescription> {
  return new Map(commandDescriptions);
}

/**
 * Get all sequences with enhanced descriptions
 * @returns Map of sequence names to descriptions
 */
export function getAllSequenceDescriptions(): Map<string, EnhancedDescription> {
  return new Map(sequenceDescriptions);
}

/**
 * Get contextual help for a command parameter
 * @param commandName Name of the command
 * @param paramName Name of the parameter
 * @returns Contextual help object or undefined if not found
 */
export function getCommandParameterHelp(commandName: string, paramName: string): string | undefined {
  const desc = commandDescriptions.get(commandName);
  if (!desc || !desc.contextualHelp || !desc.contextualHelp[paramName]) {
    return undefined;
  }
  return desc.contextualHelp[paramName].help;
}

/**
 * Get contextual help for a sequence parameter
 * @param sequenceName Name of the sequence
 * @param paramName Name of the parameter
 * @returns Contextual help object or undefined if not found
 */
export function getSequenceParameterHelp(sequenceName: string, paramName: string): string | undefined {
  const desc = sequenceDescriptions.get(sequenceName);
  if (!desc || !desc.contextualHelp || !desc.contextualHelp[paramName]) {
    return undefined;
  }
  return desc.contextualHelp[paramName].help;
}
