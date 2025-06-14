import vine from '@vinejs/vine'

export const createCvProfileValidator = vine.compile(
  vine.object({
    bio: vine.string().trim(),
    focus_point: vine.array(vine.string().trim()),
    competence: vine.array(vine.string().trim()),

    links: vine.array(
      vine.object({
        icon: vine.string().nullable(),
        title: vine.string().nullable(),
        href: vine.string().url(),
      })
    ).optional(),

    educations: vine.array(
      vine.object({
        title: vine.string(),
        institution: vine.string().nullable(),
        degree: vine.string().nullable(),
        year: vine.string(),
      })
    ).optional(),

    work_experiences: vine.array(
      vine.object({
        title: vine.string(),
        description: vine.string().nullable(), // ex description example
        company: vine.string().nullable(), // ex : orange cm
        role: vine.string(), // ex : administrator
        period: vine.string(), // ex : 1month , 3years , 12 week
        year: vine.number().nullable(), //ex : 2years
        website: vine.string().url().nullable(), // ex : https://www.youtube.com/
      })
    ).optional(),

    personal_projects: vine.array(
      vine.object({
        title: vine.string(),
        description: vine.string().nullable(),
        website: vine.string().nullable(),
      })
    ).optional(),
  })
)

export const updateCvProfileValidator = vine.compile(
  vine.object({
    bio: vine.string().trim().optional(),
    focus_point: vine.array(vine.string().trim()),
    competence: vine.array(vine.string().trim()),


    links: vine.array(
        vine.object({
          icon: vine.string().nullable(),
          title: vine.string().nullable(),
          href: vine.string().url(),
        })
      ).optional(),
  
      educations: vine.array(
        vine.object({
          title: vine.string(),
          institution: vine.string().nullable(),
          degree: vine.string().nullable(),
          year: vine.number().min(1900).max(new Date().getFullYear())
        })
      ).optional(),
  
      work_experiences: vine.array(
        vine.object({
          title: vine.string(),
          description: vine.string().nullable(), // ex description example
          company: vine.string().nullable(), // ex : orange cm
          role: vine.string(), // ex : administrator
          period: vine.number(), // ex : 1month , 3years , 12 week
          year: vine.number().min(1900).max(new Date().getFullYear()).nullable(), //ex : 2years
          website: vine.string().url().nullable(), // ex : https://www.youtube.com/
        })
      ).optional(),
  
      personal_projects: vine.array(
        vine.object({
          title: vine.string(),
          description: vine.string().nullable(),
          website: vine.string().nullable(),
        })
      ).optional(),
  })
)
