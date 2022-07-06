import { z } from "zod"

export const AWSConfigItemSchema = z.object({
  title: z.string(),
  account: z.string(),
  roleName: z.string(),
  color: z.string().optional(),
  region: z.string().optional(),
  group: z.string().optional(),
})
export type AWSConfigItem = z.infer<typeof AWSConfigItemSchema>

export const AWSConfigSchema = z.array(AWSConfigItemSchema)
export type AWSConfig = z.infer<typeof AWSConfigSchema>

export const AWSConfigGroupSchema = z.record(AWSConfigSchema)
export type AWSConfigGroup = z.infer<typeof AWSConfigGroupSchema>

export const StoredConfigItemSchema = AWSConfigItemSchema.omit({ title: true })
export type StoredConfigItem = z.infer<typeof StoredConfigItemSchema>

export const StoredConfigSchema = z.record(StoredConfigItemSchema)
export type StoredConfig = z.infer<typeof StoredConfigSchema> 
