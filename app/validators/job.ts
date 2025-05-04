import vine from '@vinejs/vine'

export const createJobValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2),

    description: vine.string().trim().minLength(10),

    industries: vine.string().trim(),

    job_type: vine.enum(['CDI', 'INTERNSHIP', 'FREELANCE'] as const),

    total_price: vine.number().min(0), 

    details: vine
      .array(
        vine.object({
          title: vine.string().trim().minLength(1),
          items: vine.array(
            vine.string().trim().minLength(1)
        ).minLength(1), 
        })
      )
      .minLength(1),

    years_experience: vine.number().min(0).optional(), 

    skill_required: vine.string().trim().optional(),

    last_date: vine.date().after('today'),

    gender: vine.enum(['MALE', 'FEMALE', 'OTHER', 'NOT_SPECIFIED'] as const).optional(),

    recruitment_steps: vine
      .array(
        vine.object({
          title: vine.string().trim().minLength(1),
          description: vine.string().trim().optional(),
        })
      )
      .minLength(1),

    company_id: vine.number().min(1),
  })
)


export const updateJobValidator = vine.compile(
    vine.object({
      title: vine.string().trim().minLength(1).optional(),
  
      description: vine.string().trim().optional(),
  
      industries: vine.string().trim().optional(),
  
      job_type: vine.enum(['CDI', 'INTERNSHIP', 'FREELANCE'] as const).optional(),
  
      total_price: vine.number().min(0).optional(),
  
      details: vine
        .array(
          vine.object({
            title: vine.string().trim().minLength(1).optional(),
            items: vine.array(vine.string().trim().minLength(1)).minLength(1).optional(),
          })
        )
        .minLength(1)
        .optional(),
  
      years_experience: vine.number().min(0).optional(),
  
      skill_required: vine.string().trim().optional(),
  
      last_date: vine.date().optional(),
  
      gender: vine.enum(['MALE', 'FEMALE', 'OTHER', 'NOT_SPECIFIED'] as const).optional(),
  
      recruitment_steps: vine
        .array(
          vine.object({
            title: vine.string().trim().minLength(1).optional(),
            description: vine.string().trim().optional(),
          })
        )
        .minLength(1)
        .optional(),
  
      company_id: vine.number().min(1).optional(),
    })
  )
