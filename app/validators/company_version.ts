import vine from '@vinejs/vine'

export const createCompanyVersionsValidator =vine.compile(
    vine.object({
    name: vine.string().trim().minLength(2),
    industry: vine.string().trim(),
    description: vine.string().trim(),
    email: vine.string().email().optional(),
    phoneNumber: vine.string().trim().optional(),
    firstLangage: vine.string().trim(),
    country: vine.string().trim(),
    city: vine.string().trim().optional(),
    avatarUrl: vine.string().url(),
    coverUrl: vine.string().url().optional(),
    socialStatus: vine.string().trim().optional(),
    registrationNumber: vine.string().trim(),
    certificateOfIncorporation: vine.string().url().optional(),
    isActive:vine.boolean()
}))

export const editCompanyVerionsValidator = vine.compile(
    vine.object({ 
    name: vine.string().trim().minLength(2).optional(),
    industry: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    email: vine.string().email().optional().optional(),
    phoneNumber: vine.string().trim().optional().optional(),
  
    firstLangage: vine.string().trim().optional(),
    contry: vine.string().trim().optional(),
    city: vine.string().trim().optional().optional(),
    avatarUrl: vine.string().url().optional().optional(),
    coverUrl: vine.string().url().optional().optional().optional(),
    socialStatus: vine.string().trim().optional().optional(),
  
    isActive:vine.boolean().optional(),

    registrationNumber: vine.string().trim().optional(),
    certificateOfIncorporation: vine.string().url().optional().optional(),
  }))
