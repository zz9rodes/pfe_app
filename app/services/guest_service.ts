import Account from "#models/account"
import Company from "#models/company"
import Guest from "#models/guest"
import ApiResponse from "#models/utils/ApiResponse"
import { inject } from "@adonisjs/core"
import EmailEmiterService from "./email_emiter_service.js"
import { EmailData } from "#models/utils/index"

@inject()

export class GuestService {
  constructor(private EmailEmiterService: EmailEmiterService) { }

  async createGuest(data: any) {
    console.log("dans le service");

    const { accountId, companyId } = data;

    const account = await Account.find(accountId);
    const company = await Company.find(companyId);

    if (!account || !company) {
      return ApiResponse.badRequest("Invalid Account or Company Id");
    }
    console.log({accountId,companyId});
    

    const existingGuest = await Guest.query()
      .where('account_id', accountId)
      .andWhere('company_id', companyId).first();
      console.log(existingGuest);
      
    if (existingGuest) {
      return ApiResponse.badRequest("Guest already exists");
    }

    const guest = await Guest.create(data);
    const companyAccount = await Account.find(company.accountId);

    const emaildata: EmailData = {
      from: companyAccount!.userId,
      to: account.userId,
      cc: "You are invited to join our company",
      bcc: "You are invited to join our company",
      subject: "Invitation",
      html: "string",
      text: "string",
    };

    const emailInfo = await this.EmailEmiterService.sendEmail(emaildata);

    console.log(emailInfo);
    return ApiResponse.success("Success", guest);
  }

  async CancelGuest(guestId: any,accountId:any) {

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
      return ApiResponse.notFound("ressource Not found")
    }

    if(!(guest.accept)||(accountId!==guest.accountId)){
      return ApiResponse.badRequest("Bad request With Invalid Account Id")
    }

    await guest.merge({ accept: true }).save()
    await guest.load('company')
    await guest.load('account')
    await guest.load('company', async(query)=>{
      await query.preload('activeDetails')
    })


    const emaildata: EmailData = {
      from: guest?.accountId,
      to: guest?.company?.accountId,
      cc: `${guest.account.firstName} ${guest.account.lastName} Accept Your Invitation To ${guest.company.activeDetails.name}`,
      bcc: "Invitation Accept",
      subject: "Invitation Accept",
      html: "string",
      text: `${guest.account.firstName} ${guest.account.lastName} Accept Your Invitation To ${guest.company.activeDetails.name}`,
    }

    await this.EmailEmiterService.sendEmail(emaildata)

    return ApiResponse.success("Success", guest)
  }
}