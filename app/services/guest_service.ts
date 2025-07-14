import Account from "#models/account"
import Company from "#models/company"
import Guest from "#models/guest"
import ApiResponse from "#models/utils/ApiResponse"
import { inject } from "@adonisjs/core"
import EmailEmiterService from "./email_emiter_service.js"
import { EmailData } from "#models/utils/index"
import User from "#models/user"
import { renderSendInvitationMessage } from "../../html/jsTemplate/SendInvitation.js"
import { renderSendApprovedMessage } from "../../html/jsTemplate/SendApproveInvitation.js"
import env from '#start/env'

@inject()

export class GuestService {
  constructor(private EmailEmiterService: EmailEmiterService) { }

  async createGuest(data: any) {

    const { accountId, companyId } = data;


    const account = await Account.find(accountId);
    const company = await Company.find(companyId);

    if (!account || !company) {
      return ApiResponse.badRequest("Invalid Account or Company Id");
    }
    

    const existingGuest = await Guest.query()
      .where('account_id', accountId)
      .andWhere('company_id', companyId).first();
      
    if (existingGuest) {
      return ApiResponse.badRequest("Guest already exists");
    }

    const guest = await Guest.create(data);
    const companyAccount = await Account.find(company.accountId);

    const clientDomain=env.get('APP_CLIENT_DOMAIN')

    let guestName= account.firstName +" "+ account.lastName
    
    const emaildata: EmailData = {
      from: companyAccount!.userId,
      to: account.userId,
      cc: "You are invited to join our company",
      bcc: "You are invited to join our company",
      subject: "Invitation",
      html: renderSendInvitationMessage(company.activeDetails.name,guestName,company.activeDetails.avatarUrl,`${clientDomain}/account/list_companie_invitations`),
      text: `Après avoir examiné votre profil et votre parcours professionnel, nous sommes convaincus que vous seriez un atout précieux pour notre entreprise. Chez TalentVision, nous construisons l'avenir avec des talents comme le vôtre.   clicker ici pour confirmer votre interet ${clientDomain}/account/list_companie_invitations   `,
    };

    const emailInfo = await this.EmailEmiterService.sendEmail(emaildata);
    console.log(emailInfo)
    return ApiResponse.success("Votre Demande a bien ete Envoyer", guest);
  }

  async CancelGuest(guestId: any) {

    const guest = await Guest.find(guestId)
    if (!guest) {
      return ApiResponse.notFound("ressource Not found")
    }

    if (guest.accept) {
      return ApiResponse.notFound("The Invitation is Already Accepted")
    }

    await guest.delete()

    return ApiResponse.success("Success", guest)
  }

  async AcceptGuest(guestId: any,accountId:any) {

    const guest = await Guest.find(guestId)
    if (!guest) {
      return ApiResponse.notFound("Your ressource not found")
    }


    if(!(guest.accept) && (accountId!==guest.accountId)){
      return ApiResponse.badRequest("Bad request With Invalid Account Id")
    }

    await guest.merge({ accept: true }).save()
    await guest.load('company')
    await guest.load('account')
    await guest.load('company', async(query)=>{
      await query.preload('activeDetails')
    })

    let admin=await User.query().select(['id','is_admin','email']).where('is_admin',true).first()

    let companyAdmin= await Account.find(guest?.company?.accountId)

    if(admin && companyAdmin){

      let accounName=guest.account.firstName+" "+guest.account.lastName

      const emaildata: EmailData = {
        from: admin.id,
        to: companyAdmin?.userId,
        cc: `${guest.account.firstName} ${guest.account.lastName} Accept Your Invitation To ${guest.company.activeDetails.name}`,
        bcc: "Nouveau membre dans l'equipe",
        subject: "Nouveau membre dans l'equipe",
        html: renderSendApprovedMessage(accounName),
        text: `${guest.account.firstName} ${guest.account.lastName} Accept Your Invitation To ${guest.company.activeDetails.name}`,
      }

      await this.EmailEmiterService.sendEmail(emaildata)
    }


    return ApiResponse.success("Success", guest)
  }

  async listGuest(compsnyId:string){
    try {

      const company= await Company.findBy('slug',compsnyId)

      if(!company){
        return ApiResponse.notFound("Company NotFound")
      }
      
       await company.load('guests', (guestQuery) => {
        guestQuery
          .preload('account', (accountQuery) => {
            accountQuery.select(['first_name', 'last_name','avatarUrl','first_langage'])
          })
      })

      return ApiResponse.success("Success",company.guests)
    } catch (error) {
      console.log(error)

      return ApiResponse.error(error.message)
    }
  }
}