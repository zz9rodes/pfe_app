import type { HttpContext } from '@adonisjs/core/http'

import ApiResponse from '#models/utils/ApiResponse'
import db from '@adonisjs/lucid/services/db'
import Account from '#models/account'
import Company from '#models/company'
import Job from '#models/job'
import { AccountType, ApplyStatus } from '#models/utils/index'
import Project from '#models/project'
import Task from '#models/task'

export default class StatsController {
  async show({ response }: HttpContext) {
    try {
      const [
        { total: userRequests },
        { total: accounts },
        { total: companyRequests },
        { total: companies },
        { total: projects },
        { total: jobs },
        { total: contracts },
        { total: agreements }
      ] = await Promise.all([
        db.from('user_requests').count('* as total').first(),
        db.from('accounts').count('* as total').first(),
        db.from('company_requests').count('* as total').first(),
        db.from('companies').count('* as total').first(),
        db.from('projects').count('* as total').first(),
        db.from('jobs').count('* as total').first(),
        db.from('contracts').count('* as total').first(),
        db.from('agreements').count('* as total').first()
      ])

      const stats = {
        user_requests: userRequests,
        accounts,
        companies_request: companyRequests,
        companies,
        projects,
        jobs,
        contracts,
        agreements,
      }

      return response.status(200).json(ApiResponse.success("Statistiques globales", stats))
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

async AccountStatistiques({ response, auth }: HttpContext) {
  try {
    const user = auth.user;
    const account = user?.account;

    if (!user || !account) {
      return response.unauthorized(ApiResponse.forbidden("Utilisateur non autorisé"));
    }

    // Requête parallèle pour compter les applies et agreements
    const [
      { total: applies },
      { total: agreements }
    ] = await Promise.all([
      db.from('applies').where('account_id', account.id).count('* as total').first(),
      db.from('agreements').where('account_id', account.id).count('* as total').first(),
    ]);

    // Charger uniquement les applies approuvés avec l'id
    await account.load('applies', (query) => {
      query.where('status', ApplyStatus.APPROVED).select('id');
    });

    let companyStats = null;

    if (account.accountType === AccountType.COMPANIES) {
      // Charger les relations de la company avec des champs spécifiques
      await account.load('company', (companyQuery) => {
        companyQuery
          .select('id') // Limiter les champs de la company
          .preload('jobs', (jobsQuery) => {
            jobsQuery.select('id','title').preload('applies', (appliesQuery) => {
              appliesQuery.select('id');
            });
          })

          .preload('projects', (projectsQuery) => {
            projectsQuery.select('id','name').preload('tasks', (tasksQuery) => {
              tasksQuery.select('id');
            });
          })
          .preload('guests', (guestsQuery) => {
            guestsQuery.where('accept', true).select('id');
          })
          .preload('contracts', (contractsQuery) => {
            contractsQuery.select('id').preload('agreements', (agreementsQuery) => {
              agreementsQuery.select('id');
            });
          });
      });

      const company = account.company;

      if (company) {
        // Calculer les totaux directement depuis la base de données si possible
        const totalGuests = company.guests?.length || 0;
        const totalAgreements = await db
          .from('agreements')
          .join('contracts', 'contracts.id', 'agreements.contract_id')
          .where('contracts.company_id', company.id)
          .count('* as total')
          .first()
          .then((result) => result.total || 0);

        companyStats = {
          jobs: company.jobs?.map((job) => ({
            id: job.id,
            title:job.title,
            applies: job.applies?.map((apply) => ({ id: apply.id })) || [], // Inclure les applies
          })) || [],
          projects: company.projects?.map((project) => ({
            id: project.id,
            name:project.name,
            tasks: project.tasks?.map((task) => ({ id: task.id })) || [], // Inclure les tasks
          })) || [],
          contracts: company.contracts?.map((contract) => ({
            id: contract.id,
            agreements: contract.agreements?.map((agreement) => ({ id: agreement.id })) || [], // Inclure les agreements
          })) || [],
          agreements: totalAgreements,
          guests: company.guests?.map((guest) => ({ id: guest.id })) || [], // Inclure les guests
        };
      }
    }

    const stats = {
      applies,
      accept: account.applies.length,
      agreements,
      company: companyStats,
    };

    return response.status(200).json(ApiResponse.success("Statistiques du compte", stats));
  } catch (error) {
    console.error(error);
    return response.internalServerError(ApiResponse.error(error));
  }
}

//   async AccountStatistiques({ response, auth }: HttpContext) {
//     try {
//       const user = auth.user
//       const account = user?.account

//       if (!user || !account) {
//         return response.unauthorized(ApiResponse.forbidden("Utilisateur non autorisé"))
//       }

//       const [
//         { total: applies },
//         { total: agreements }
//       ] = await Promise.all([
//         db.from('applies').where('account_id', account.id).count('* as total').first(),
//         db.from('agreements').where('account_id', account.id).count('* as total').first(),
//       ])

//       if(account.accountType==AccountType.COMPANIES){
//         await account.load('company',query=>{
//             query.preload('jobs')
//             query.preload('projects')
//             query.preload('contracts',queryContract=>{
//                 queryContract.preload('agreements')
//             })
//         })

//         if(account.company){

//         }
//       }

//       const stats = {
//         applies,
//         agreements,
//       }

//       return response.status(200).json(ApiResponse.success("Statistiques du compte", stats))
//     } catch (error) {
//       return response.internalServerError(ApiResponse.error(error))
//     }
//   }

// async AccountStatistiques({ response, auth }: HttpContext) {
//     try {
//       const user = auth.user
//       const account = user?.account

//       if (!user || !account) {
//         return response.unauthorized(ApiResponse.forbidden("Utilisateur non autorisé"))
//       }

//       const [
//         { total: applies },
//         { total: agreements }
//       ] = await Promise.all([
//         db.from('applies').where('account_id', account.id).count('* as total').first(),
//         db.from('agreements').where('account_id', account.id).count('* as total').first(),
//       ])

//       let companyStats = null

//       await account.load('applies',query=>{
//         query.where('status',ApplyStatus.APPROVED)
//       })
    

//       if (account.accountType === AccountType.COMPANIES) {
//         await account.load('company', (companyQuery) => {

//             companyQuery
//             .preload('jobs', (jobs) => {

//                 jobs.preload('applies',applies=>{
//                     applies.select('id')
//                 }).select('id')

//             })
//             .preload('projects', (project) => {
//                  project.preload('tasks',task=>{

//                     task.select('id')

//                  }) // PAS besoin de .select ici si on veut tout
//             })
//             .preload('guests', (query) => {
//                  query.where('accept', true).select(['id'])
//             })
//             .preload('contracts', (contractsQuery) => {
//                  contractsQuery.preload('agreements',agreements=>{
//                     agreements.select('id')
//                  })
//             })

//         })


//         const company = account.company

//         if (company) {
//           // Calcul des totaux imbriqués
//         //   const totalJobs = company.jobs?.length || 0
//         //   const totalProjects = company.projects?.length || 0
//         //   const totalContracts = company.contracts?.length || 0
//           const totalGuests=company.guests?.length||0
//           const totalAgreements = company.contracts?.reduce((sum, contract) => {
//             return sum + (contract.agreements?.length || 0)
//           }, 0)

//           companyStats = {
//             // name: company.name,
//             jobs: company.jobs,
//             projects: company.projects,
//             contracts: company.contracts,
//             agreements: totalAgreements,
//             guests:totalGuests
//           }
//         }
//       }

//       const stats = {
//         applies,
//         accept:account.applies.length,
//         agreements,
//         company: companyStats,
//       }

//       return response.status(200).json(ApiResponse.success("Statistiques du compte", stats))
//     } catch (error) {
//       console.error(error)
//       return response.internalServerError(ApiResponse.error(error))
//     }
//   }
}
