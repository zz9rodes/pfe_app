import type { HttpContext } from '@adonisjs/core/http'

import Account from "#models/account";
import Agreement from "#models/agreement";
import Company from "#models/company";
import CompanyRequest from "#models/company_request";
import Contract from "#models/contract";
import Job from "#models/job";
import Project from "#models/project";
import UserRequest from "#models/user_request";
import ApiResponse from "#models/utils/ApiResponse";

export default class StatsController {
    async show({response}:HttpContext){

        try {
            const user_requests=await UserRequest.all()

            const accounts =await Account.all()

            const companies_request= await CompanyRequest.all()

            const companies= await Company.all()

            const projects=await Project.all()

            const jobs=await Job.all()

            const contracts= await Contract.all()

            const aggrements=await Agreement.all()

            const stats={

                jobs:jobs.length,
                projects:projects.length,
                accounts:accounts.length,
                user_requests:user_requests.length,
                companies_request:companies_request.length,
                companies:companies.length,
                contracts:contracts.length,
                aggrements:aggrements.length
            }

            return response.status(200).json(ApiResponse.success("Statistiques",stats))
        } catch (error) {
            return response.internalServerError(ApiResponse.error(error))
        }
       
    }

     async showStats({response}:HttpContext){

        try {

            const accounts =await Account.all()


            const companies= await Company.all()


            const jobs=await Job.all()

            

            const stats={

                jobs:jobs,
                accounts:accounts,
                companies:companies,
            }

            return response.status(200).json(ApiResponse.success("Statistiques",stats))
        } catch (error) {
            return response.internalServerError(ApiResponse.error(error))
        }
       
    }
}