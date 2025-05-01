// import { DateTime } from 'luxon'
// import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
// import User from './user.js'
// // import type 
// import type {HasOne} from '@adonisjs/lucid/types/relations'

// export default class Email extends BaseModel {
//   @column({ isPrimary: true })
//   declare id: number

//   @hasOne(() => User)
//   declare from: HasOne<typeof User>

//   @hasOne(() => User)
//   declare to: HasOne<typeof User>

//   @column()
//   declare cc?: string

//   @column()
//   declare bcc?: string

//   @column()
//   declare subject: string

//   @column()
//   declare html?: string

//   @column()
//   declare text?: string

//   @column()
//   declare status: 'pending' | 'sent' | 'failed'

//   @column()
//   declare error_message?: string

//   @column.dateTime()
//   declare sent_at?: DateTime

//   @column.dateTime({ autoCreate: true })
//   declare created_at: DateTime

//   @column.dateTime({ autoCreate: true, autoUpdate: true })
//   declare updated_at: DateTime
// }

import { DateTime } from 'luxon';
import {
  BaseModel,
  column,
  belongsTo,
} from '@adonisjs/lucid/orm';
import type {BelongsTo} from '@adonisjs/lucid/types/relations'

import User from './user.js';

export default class Email extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare from: number;

  @column()
  declare to: number;

  @column()
  declare cc?: string;

  @column()
  declare bcc?: string;

  @column()
  declare subject: string;

  @column()
  declare html?: string;

  @column()
  declare text?: string;

  @column()
  declare status: 'pending' | 'sent' | 'failed';

  @column()
  declare error_message?: string;

  @column.dateTime()
  declare sent_at?: DateTime;

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime;

  @belongsTo(() => User, {
    foreignKey: 'from',
  })
  declare sender: BelongsTo<typeof User>;

  @belongsTo(() => User, {
    foreignKey: 'to',
  })
  declare recipient: BelongsTo<typeof User>;
}
