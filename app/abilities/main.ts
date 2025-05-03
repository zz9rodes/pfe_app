/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import User from '#models/user'
import { Bouncer } from '@adonisjs/bouncer'


/**
 * Delete the following ability to start from
 * scratch
 */
export const  editUser =  Bouncer.ability((me: User, id: any) =>  {
  return (me.id === id) || (me.isAdmin==true)
})

export const  editAccount =  Bouncer.ability( async(me: User, slug: string|any) =>  {
  await me.load('account')  
  return (me.account.slug === slug) || (me.isAdmin==true)
})

export const  manageCompaniesVersion =  Bouncer.ability( async(me: User, slug: string|any) =>  {
  await  me.account.load('company')
  return (me?.account?.company?.slug === slug) || (me.isAdmin==true)
})
