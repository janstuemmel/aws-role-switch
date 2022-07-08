import { z } from "zod"

export const AWSConfigItemSchema = z.object({
  title: z.string(),
  aws_account_id: z.string(),
  role_name: z.string(),
  color: z.string().optional(),
  region: z.string().optional(),
  group: z.string().optional(),
})
export type AWSConfigItem = z.infer<typeof AWSConfigItemSchema>

export const AWSConfigSchema = z.array(AWSConfigItemSchema)
export type AWSConfig = z.infer<typeof AWSConfigSchema>

export const AWSConfigItemStateSchema = AWSConfigItemSchema.extend({ selected: z.boolean().optional() })
export type AWSConfigItemState = z.infer<typeof AWSConfigItemStateSchema>

export const StoredConfigItemSchema = AWSConfigItemSchema.omit({ title: true })
export type StoredConfigItem = z.infer<typeof StoredConfigItemSchema>

export const StoredConfigSchema = z.record(StoredConfigItemSchema)
export type StoredConfig = z.infer<typeof StoredConfigSchema> 
