import { z } from "zod";
import { CONTACT_REASONS, LOCALES } from "@/lib/config/constants";

export const localeSchema = z.enum(LOCALES);
export const contentTypeSchema = z.enum(["posts", "projects"]);

export const contactSchema = z.object({
  email: z.email(),
  reason: z.enum(CONTACT_REASONS),
  message: z.string().trim().min(30).max(2000),
  name: z.string().trim().max(80).optional().or(z.literal("")),
  links: z.array(z.url().max(500)).max(2).optional().default([]),
  honeypot: z.string().max(0).optional().default(""),
  turnstileToken: z.string().trim().min(1),
});

export const previewIssueSchema = z.object({
  version: z.int().positive(),
  locale: localeSchema,
  contentType: contentTypeSchema,
  slug: z.string().trim().min(1).max(120),
  ttlHours: z.int().positive().max(72).optional(),
});

export const adminMutationSchema = z.object({
  version: z.int().positive(),
});

export const postCreateSchema = z.object({
  locale: localeSchema,
  title: z.string().trim().min(3).max(120),
});

export const postUpdateSchema = z.object({
  version: z.int().positive(),
  locale: localeSchema.optional(),
  title: z.string().trim().min(3).max(120).optional(),
  summary: z.string().trim().min(10).max(220).optional(),
  slug: z.string().trim().min(1).max(120).optional(),
  bodyMdx: z.string().trim().min(20).optional(),
});

export const mediaUploadRequestSchema = z.object({
  filename: z.string().trim().min(1).max(200),
  mime: z.enum(["image/webp", "image/avif", "image/png", "image/jpeg"]),
  bytes: z.int().positive().max(10_485_760),
  width: z.int().positive().max(5000).optional(),
  height: z.int().positive().max(5000).optional(),
  usageHint: z.enum(["hero", "cover", "inline", "og", "avatar", "gallery"]),
});

export const mediaAttachSchema = z.object({
  version: z.int().positive(),
  assetId: z.string().uuid(),
  contentType: contentTypeSchema,
  contentId: z.string().uuid(),
  locale: localeSchema.optional(),
  usageSlot: z.string().trim().min(2).max(50),
});
