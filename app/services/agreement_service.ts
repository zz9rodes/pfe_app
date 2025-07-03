// import Account from "#models/account";
// import Agreement from "#models/agreement";
// import Contract from "#models/contract";
// import User from "#models/user";
// import ApiResponse from "#models/utils/ApiResponse";
// import is from "@adonisjs/core/helpers/is";
// import { log } from "console";

// export class AgreementService {
//   // Your code here
//   async create(data: any, me: User) {

//     const account = await Account.findBy('slug', data.accountId)

//     const contract = await Contract.findBy('slug', data.contractId)

//     if (account?.userId == me.id) {
//       return ApiResponse.badRequest("You Cannot Sign Your Contract As Employee")
//     }

//     if (!account || !contract) {
//       return ApiResponse.badRequest("Invalid Contract Or User ")
//     }

//     const isAlreadySign=await Agreement.query().where('account_id',account.id).andWhere('contract_id',contract.id)

//     if(isAlreadySign.length>0){
//       return ApiResponse.badRequest("You Already Sign")
//     }

//     try {
//       let data={
//         accountId: account.id,
//         contractId: contract.id
//       }

//       const agreement = await Agreement.create(data)

//       return ApiResponse.success("Success", agreement)

//     } catch (error) {
//       console.log(error);

//       return ApiResponse.error(error)
//     }
//   }

//   async getAgreementDetails(agreementId: number) {
//     try {
//       const agreement = await Agreement.find(agreementId)

//       return ApiResponse.success("success", agreement)
//     } catch (error) {
//       return ApiResponse.error(error)
//     }

//   }
// }

import Account from '#models/account'
import Agreement from '#models/agreement'
import Contract from '#models/contract'
import User from '#models/user'
import ApiResponse from '#models/utils/ApiResponse'
import Signature from '#models/signature'
import { JobStatus, JobType, ProjectStatus } from '#models/utils/index'
import Project from '#models/project'
import { Priority } from '#models/utils/index'
import { randomUUID } from 'crypto'

export class AgreementService {
  async create(data: any) {
    const account = await Account.findBy('slug', data.accountId)
    const contract = await Contract.findBy('slug', data.contractId)

    // Charger la compagnie du contrat
    await contract?.load('company')
    const company = contract?.company
    if (!company || !account) {
      return ApiResponse.badRequest('Contrat ou utilisateur invalide.')
    }

    // Vérifier que l'utilisateur est un Guest accepté de la compagnie
    const guest = await (await import('#models/guest')).default.query()
      .where('account_id', account?.id)
      .andWhere('company_id', company.id)
      .andWhere('accept', true)
      .first()
      
    if (!guest) {
      return ApiResponse.badRequest('Vous ne faites pas partie de cette entreprise.')
    }

    const isAlreadySign = await Agreement.query()
      .where('account_id', account.id)
      .andWhere('contract_id', contract.id)

    if (isAlreadySign.length > 0) {
      return ApiResponse.badRequest('Vous avez déjà signé ce contrat.')
    }

    // Vérification de la signature
    const signature = await Signature.find(data.signatureId)
    if (!signature || signature.accountId !== account.id) {
      return ApiResponse.badRequest("La signature n'appartient pas à ce compte.")
    }

    try {
      let agreementData = {
        accountId: account.id,
        contractId: contract.id,
        reference: data.reference,
        signatureId: signature.id,
      }

      const agreement = await Agreement.create(agreementData)
      await contract.load('job')

      console.log(contract.job)
      console.log(contract.job.job_type)

      // Création du projet si le job est de type FREELANCE
      if (contract.job && contract.job.job_type === JobType.FREELANCE) {
        // On s'assure que la compagnie et son admin sont chargés
        await contract.load('company')
        await contract.company.load('admin')
        const job = contract.job
        const company = contract.company
        const admin = company.admin
        // Chercher le Guest correspondant à l'admin
        let managerGuest = await (await import('#models/guest')).default.findBy('accountId', admin.id)
        if (!managerGuest) {
          // Créer le Guest admin si il n'existe pas
          const { CompanyScope } = await import('#models/utils/index')
          let scopes = Object.values(CompanyScope)
          managerGuest = await (await import('#models/guest')).default.create({
            role: 'ADMIN',
            scopes: scopes,
            accountId: admin.id,
            companyId: company.id,
            accept: true,
          })
        }
        // Création du projet
        const project = await Project.create({
          name: job.title,
          slug:randomUUID(),
          description: job.description,
          managerId: managerGuest.id,
          priority: Priority.LOW,
          companyId: company.id,
          jobId: job.id,
          status: ProjectStatus.OPEN,
          start: new Date(),
          objectif: '',
        })
        // Ajouter le Guest (lié à l'account) comme TeamMember du projet s'il n'existe pas déjà
        const TeamMember = (await import('#models/team_member')).default
        let existingMember = await TeamMember.query().where('project_id', project.id).andWhere('member_id', guest.id).first()
        if (!existingMember) {
          await TeamMember.create({
            projectId: project.id,
            memberId: guest.id,
          })
        }
        // Ajouter aussi le manager comme TeamMember du projet s'il n'existe pas déjà
        if (managerGuest.id !== guest.id) {
          let existingManager = await TeamMember.query().where('project_id', project.id).andWhere('member_id', managerGuest.id).first()
          if (!existingManager) {
            await TeamMember.create({
              projectId: project.id,
              memberId: managerGuest.id,
            })
          }
        }
      }

      return ApiResponse.success('Succès', agreement)
    } catch (error) {
      console.log(error)
      return ApiResponse.error(error)
    }
  }

  async getAgreementDetails(agreementId: number) {
    try {
      const agreement = await Agreement.find(agreementId)
      if (!agreement) {
        return ApiResponse.notFound('Ressource non trouvée')
      }
      return ApiResponse.success('Succès', agreement)
    } catch (error) {
      return ApiResponse.error(error)
    }
  }

  async deleteAgreementDetails(agreementId: number) {
    try {
      const agreement = await Agreement.find(agreementId)
      if (!agreement) {
        return ApiResponse.notFound('Ressource non trouvée')
      }
      await agreement.delete()
      return ApiResponse.success('Agreement supprimé avec succès')
    } catch (error) {
      return ApiResponse.error(error)
    }
  }

  async getAgreementDetailsByReference(id: number) {
    try {
      const agreement = await Agreement.query()
        .where('id', id)
        .preload('signature')
        .preload('account')
        .preload('contract', (contractQuery) => {
          contractQuery.preload('company', (companyQuery) => {
            companyQuery.preload('admin')
          })
        })
        .first()

      if (!agreement) {
        return ApiResponse.notFound('Ressource non trouvée')
      }

      await agreement.contract?.company?.admin.load('signatures')

      return ApiResponse.success('Success', agreement)
    } catch (error) {
      return ApiResponse.error(error)
    }
  }

  async showForAccount(account: Account) {
    try {
      const agreements = await Agreement.query()
        .select('*')
        .where('account_id', account.id)
        .preload('contract')

      // await agreement.load('signature')
      // await agreement.load('account')
      // await agreement.load('contract',(contract)=>{
      //   contract.preload('company',company=>{
      //     company.preload('admin',admin=>{
      //       admin.preload('signatures')
      //     })
      //   })
      // })

      return ApiResponse.success('Success', agreements)
    } catch (error) {
      return ApiResponse.error(error)
    }
  }
}
