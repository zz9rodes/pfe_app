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

import Company from '#models/company'
import CvProfile from '#models/cv_profile'
import Project from '#models/project'
import User from '#models/user'
import { Bouncer } from '@adonisjs/bouncer'


/**
 * Delete the following ability to start from
 * scratch
 */
export const editUser = Bouncer.ability((me: User, id: any) => {
  return (me.id === id) || (me.isAdmin == true)
})

export const editAccount = Bouncer.ability(async (me: User, slug: string | any) => {
  return (me.account && (me.account.slug === slug)) || (me.isAdmin == true)
})

export const editCvprofile = Bouncer.ability(async (me: User, slug: string | any) => {

  await me.account?.load('cvProfiles')

  const cvProfile = me?.account?.cvProfiles

  return ((cvProfile?.slug === slug)) || (me.isAdmin == true)
})

export const manageCompany=Bouncer.ability( async (user:User,company:Company)=>{

  const account= user.account



 return  company.accountId==account?.id
})

export const manageTasks = Bouncer.ability(async (user: User, project: Project) => {
  // Charger les invités (guests) liés au compte de l'utilisateur
  const account = await user.related('account').query().preload('guests').first()

  if (!account) {
    return false
  }

  // Extraire les IDs des guests liés à cet utilisateur
  const guestIds = account.guests.map((guest) => guest.id)

  // Vérifie si un des guests est manager ou membre du projet
  const isManager = guestIds.includes(project.managerId)

  // Vérifie si un des guests est membre du projet (dans ProjectTeam)
  const members = await project.related('members').query()
  const isMember = members.some((member) => guestIds.includes(member.memberId))

  if (isManager || isMember) {
    return true
  }

  return false
})



export const manageCompaniesVersion = Bouncer.ability(async (me: User, slug: string | any) => {
  await me?.account?.load('company')

  return (me?.account?.company?.slug === slug) || (me.isAdmin == true)
})
