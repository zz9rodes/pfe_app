import vine from '@vinejs/vine'
import { CurrencyType, Gender, JobType, JobStatus } from '#models/utils/index'

export const createJobValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2),

    country: vine.string().trim().minLength(2).optional(),

    city: vine.string().trim().minLength(2).optional(),

    description: vine.string().trim().minLength(10),

    industries: vine.string().trim(),

    job_type: vine.enum(JobType),

    price: vine.object({
      value: vine.number(),
      currency: vine.enum(CurrencyType)
    }).optional(),

    details: vine
      .array(
        vine.object({
          title: vine.string().trim().minLength(1),
          items: vine.array(
            vine.string().trim().minLength(1)
          ).minLength(1),
        })
      )
      .minLength(1).optional(),

    years_experience: vine.number().min(0).optional(),

    skill_required: vine.string().trim().optional(),

    last_date: vine.date().after('today').optional(),

    gender: vine.enum(Gender),

    recruitment_steps: vine
      .array(
        vine.object({
          title: vine.string().trim().minLength(1),
          description: vine.string().trim().optional(),
        })
      )
      .minLength(1).optional(),

    status: vine.enum(JobStatus),

    steps: vine.array(
      vine.object({
        name: vine.string(),
        description: vine.string(),
        renumeration: vine.object({
          value: vine.number(),
          currency: vine.enum(CurrencyType)
        }).optional()
      })).optional()
  })
)

export const createManyJobValidator = vine.compile(
  vine.object({
    data: vine.array(
      vine.object({
        title: vine.string().trim().minLength(2).optional(),

        country: vine.string().trim().minLength(2).optional(),

        city: vine.string().trim().minLength(2).optional(),

        description: vine.string().trim().minLength(10).optional(),

        industries: vine.string().trim().optional(),

        job_type: vine.enum(JobType).optional(),

        price: vine.object({
          value: vine.number(),
          currency: vine.enum(CurrencyType)
        }).optional(),

        details: vine
          .array(
            vine.object({
              title: vine.string().trim().minLength(1),
              items: vine.array(
                vine.string().trim().minLength(1)
              ).minLength(1),
            })
          )
          .minLength(1).optional(),

        years_experience: vine.number().min(0).optional(),

        skill_required: vine.string().trim().optional(),

        last_date: vine.date().after('today').optional(),

        gender: vine.enum(Gender).optional(),

        recruitment_steps: vine
          .array(
            vine.object({
              title: vine.string().trim().minLength(1),
              description: vine.string().trim().optional(),
            })
          )
          .minLength(1).optional(),

        status: vine.enum(JobStatus).optional()
      })
    )
  })

)

export const updateJobValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2).optional(),

    country: vine.string().trim().minLength(2).optional(),

    city: vine.string().trim().minLength(2).optional(),

    description: vine.string().trim().minLength(10).optional(),

    industries: vine.string().trim().optional(),

    job_type: vine.enum(JobType).optional(),

    price: vine.object({
      value: vine.number(),
      currency: vine.enum(CurrencyType)
    }).optional(),

    details: vine
      .array(
        vine.object({
          title: vine.string().trim().minLength(1),
          items: vine.array(
            vine.string().trim().minLength(1)
          ).minLength(1),
        })
      )
      .minLength(1).optional(),

    years_experience: vine.number().min(0).optional(),

    skill_required: vine.string().trim().optional(),

    last_date: vine.date().after('today').optional(),

    gender: vine.enum(Gender).optional(),

    recruitment_steps: vine
      .array(
        vine.object({
          title: vine.string().trim().minLength(1),
          description: vine.string().trim().optional(),
        })
      )
      .minLength(1).optional(),

    status: vine.enum(JobStatus).optional()
  })
)
