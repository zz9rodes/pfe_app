import Account from "#models/account";
import Apply from "#models/apply";
import Job from "#models/job";
import ApiResponse from "#models/utils/ApiResponse";

export class ApplyService {


  async GetAllApplyDetails(page: number) {
    
    const applies = Apply.query().select("*").paginate(page, 20)
    return ApiResponse.success("success", applies)
  }

  async create(data: any) {
    const { accountId, jobId } = data;
  
    console.log({ accountId, jobId });
  
    const jobInfo = await Job.find(jobId);
    const account = await Account.find(accountId);
  
    if (!account || !jobInfo) {
      return ApiResponse.notFound("Account or job not found");
    }
  
    await jobInfo.load('company');
    const companyInfo = jobInfo.company;
  
    if (!companyInfo || (accountId === companyInfo.accountId)) {
      return ApiResponse.badRequest("You cannot apply for your company's job");
    }
  
    // Check if the application already exists
    const existingApplication = await Apply.query()
      .where('account_id', accountId)
      .where('job_id', jobId)
      .first();
  
    if (existingApplication) {
      return ApiResponse.badRequest("You have already applied for this job");
    }
  
    const apply = await Apply.create({
      ...data,
      slug: crypto.randomUUID(),
    });

    await apply.load('job')
  
    return ApiResponse.success("Application created successfully", apply);
  }

  async delete(applyId: number) {
    const apply = await Apply.findBy('slug', applyId)

    if (!apply) {

      return ApiResponse.notFound("Ressource not Found")
    }
    apply.delete()

    return ApiResponse.success("success")
  }

  async GetAllUserApplies(account: Account | undefined) {

    if (!account) {
      return ApiResponse.error("You need to complete")
    }

    const applies = await Apply.findManyBy('account_id', account.id)

    return ApiResponse.success("success", applies)

  }

  async GetApplyDetails(applyId: string) {

    const apply = await Apply.findBy('slug', applyId)

    if (!apply) {
      return ApiResponse.notFound("Ressource not Found")
    }

    return ApiResponse.success('success', apply)
  }
}