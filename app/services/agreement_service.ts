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

export class AgreementService {
  // Your code here
  async create(data: any, me: User) {
    const account = await Account.findBy('slug', data.accountId)
    const contract = await Contract.findBy('slug', data.contractId)

    contract?.load('company')
    if (contract?.company.accountId == account?.id) {
      return ApiResponse.badRequest(
        "Vous ne pouvez pas signer votre propre contrat en tant qu'employé."
      )
    }

    if (!account || !contract) {
      return ApiResponse.badRequest('Contrat ou utilisateur invalide.')
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
