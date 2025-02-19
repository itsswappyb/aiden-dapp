import { z } from 'zod';
import { Clients } from '../types';

// Define enum for model providers
export const ModelProviderNameSchema = z.enum(['openai', 'anthropic', 'google']);

// Define schema for template type
export const TemplateTypeSchema = z.union([
  z.string(),
  z
    .function()
    .args(z.object({ state: z.any() }))
    .returns(z.string()),
]);

// Define schema for templates
export const TemplatesSchema = z.object({
  goalsTemplate: TemplateTypeSchema.optional(),
  factsTemplate: TemplateTypeSchema.optional(),
  messageHandlerTemplate: TemplateTypeSchema.optional(),
  shouldRespondTemplate: TemplateTypeSchema.optional(),
  continueMessageHandlerTemplate: TemplateTypeSchema.optional(),
  evaluationTemplate: TemplateTypeSchema.optional(),
  twitterSearchTemplate: TemplateTypeSchema.optional(),
  twitterActionTemplate: TemplateTypeSchema.optional(),
  twitterPostTemplate: TemplateTypeSchema.optional(),
  twitterMessageHandlerTemplate: TemplateTypeSchema.optional(),
  twitterShouldRespondTemplate: TemplateTypeSchema.optional(),
  twitterVoiceHandlerTemplate: TemplateTypeSchema.optional(),
  instagramPostTemplate: TemplateTypeSchema.optional(),
  instagramMessageHandlerTemplate: TemplateTypeSchema.optional(),
  instagramShouldRespondTemplate: TemplateTypeSchema.optional(),
  farcasterPostTemplate: TemplateTypeSchema.optional(),
  lensPostTemplate: TemplateTypeSchema.optional(),
  farcasterMessageHandlerTemplate: TemplateTypeSchema.optional(),
  lensMessageHandlerTemplate: TemplateTypeSchema.optional(),
  farcasterShouldRespondTemplate: TemplateTypeSchema.optional(),
  lensShouldRespondTemplate: TemplateTypeSchema.optional(),
  telegramMessageHandlerTemplate: TemplateTypeSchema.optional(),
  telegramShouldRespondTemplate: TemplateTypeSchema.optional(),
  telegramAutoPostTemplate: z.string().optional(),
  telegramPinnedMessageTemplate: z.string().optional(),
  discordAutoPostTemplate: z.string().optional(),
  discordAnnouncementHypeTemplate: z.string().optional(),
  discordVoiceHandlerTemplate: TemplateTypeSchema.optional(),
  discordShouldRespondTemplate: TemplateTypeSchema.optional(),
  discordMessageHandlerTemplate: TemplateTypeSchema.optional(),
  slackMessageHandlerTemplate: TemplateTypeSchema.optional(),
  slackShouldRespondTemplate: TemplateTypeSchema.optional(),
  jeeterPostTemplate: z.string().optional(),
  jeeterSearchTemplate: z.string().optional(),
  jeeterInteractionTemplate: z.string().optional(),
  jeeterMessageHandlerTemplate: z.string().optional(),
  jeeterShouldRespondTemplate: z.string().optional(),
  devaPostTemplate: z.string().optional(),
});

// Define schema for knowledge items
const KnowledgeItemSchema = z.union([
  z.string(),
  z.object({
    path: z.string(),
    shared: z.boolean().optional(),
  }),
]);

// Define the main Character schema
export const CharacterSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  system: z.string().optional(),
  modelProvider: ModelProviderNameSchema,
  imageModelProvider: ModelProviderNameSchema.optional(),
  imageVisionModelProvider: ModelProviderNameSchema.optional(),
  modelEndpointOverride: z.string().optional(),
  templates: TemplatesSchema.optional(),
  bio: z.union([z.string(), z.array(z.string())]),
  lore: z.array(z.string()),
  messageExamples: z.array(z.array(z.any())), // Using any for MessageExample since it's a complex type
  postExamples: z.array(z.string()),
  topics: z.array(z.string()),
  adjectives: z.array(z.string()),
  knowledge: z.array(KnowledgeItemSchema).optional(),
  clients: z.array(z.nativeEnum(Clients)),
  plugins: z.array(z.any()), // Using any for Plugin since it's a complex type
});

// Type inference
export type Character = z.infer<typeof CharacterSchema>;
export type ModelProviderName = z.infer<typeof ModelProviderNameSchema>;
export type TemplateType = z.infer<typeof TemplateTypeSchema>;
export type Templates = z.infer<typeof TemplatesSchema>;
