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

import Account from "#models/account";
import Agreement from "#models/agreement";
import Contract from "#models/contract";
import User from "#models/user";
import ApiResponse from "#models/utils/ApiResponse";

export class AgreementService {
  // Your code here
  async create(data: any, me: User) {
    

    const account = await Account.findBy('slug', data.accountId)

    const contract = await Contract.findBy('slug', data.contractId)

    if (account?.userId == me.id) {
      return ApiResponse.badRequest("You Cannot Sign Your Contract As Employee")
    }

    if (!account || !contract) {
      return ApiResponse.badRequest("Invalid Contract Or User ")
    }

    const isAlreadySign=await Agreement.query().where('account_id',account.id).andWhere('contract_id',contract.id)

    if(isAlreadySign.length>0){
      return ApiResponse.badRequest("You Already Sign")
    }

    try {
      let data={
        accountId: account.id,
        contractId: contract.id
      }

      const agreement = await Agreement.create(data)


      return ApiResponse.success("Success", agreement)

    } catch (error) {
      console.log(error);

      return ApiResponse.error(error)
    }
  }

  async getAgreementDetails(agreementId: number) {
    try {
      const agreement = await Agreement.find(agreementId)

      if(!agreement){
        return ApiResponse.notFound("Ressource Not Found")
      }

      return ApiResponse.success("success", agreement)
    } catch (error) {
      return ApiResponse.error(error)
    }

  }

  async deleteAgreementDetails(agreementId: number) {
    try {
      const agreement = await Agreement.find(agreementId)

      if(!agreement){
        return ApiResponse.notFound("Ressource Not Found")
      }

      await agreement.delete()
      return ApiResponse.success("Agreement Delete Successfully")
    } catch (error) {
      return ApiResponse.error(error)
    }

  }
}