import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { afterFetch, afterFind, BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Link from './link.js'
import Education from './education.js'
import WorkExperience from './work_experience.js'
import Account from './account.js'
import PersonalProject from './personal_project.js'

export default class CvProfile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug: string

  @column()
  declare bio: string

  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare focus_point: string[]

  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare competence: string[]


  @column()
  declare accountId: number

  @belongsTo(() => Account)
  declare account: BelongsTo<typeof Account>

  @hasMany(() => Link)
  declare links: HasMany<typeof Link>

  @hasMany(() => Education)
  declare educations: HasMany<typeof Education>

  @hasMany(() => WorkExperience)
  declare workExperiences: HasMany<typeof WorkExperience>

  @hasMany(() => PersonalProject)
  declare personalProjects: HasMany<typeof PersonalProject>

  @afterFind()
  static async loadaDetails(cvProfile: CvProfile) {
        await  cvProfile.load('links')
        await cvProfile.load('educations')
        await cvProfile.load('personalProjects')
        await cvProfile.load('workExperiences')
  }

  @afterFetch()
  static async fetchLoadDetails(cvProfiles: CvProfile[]) {
    for (const cvProfile of cvProfiles) {
      await cvProfile.load('links')
      await cvProfile.load('educations')
      await cvProfile.load('personalProjects')
      await cvProfile.load('workExperiences')
    }
  }


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

