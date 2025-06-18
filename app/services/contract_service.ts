import Company from '#models/company'
import Contract from '#models/contract'
import ApiResponse from '#models/utils/ApiResponse'

export class ContractService {
  async create(data: any) {
    const company = await Company.findBy('slug', data?.companyId)

    if (!company) {
      return ApiResponse.badRequest('Invalid Company Id Request')
    }

    const { companyId, ...restData } = data
    const contract = await Contract.create({
      companyId: company.id,
      ...restData,
      slug: crypto.randomUUID(),
    })

    return ApiResponse.success('Contract Create Successfully', contract)
  }

  async update(contractId: string, data: any) {
    const contract = await Contract.findBy('slug', contractId)
    if (!contract) {
      return ApiResponse.notFound('Ressource Not Found')
    }

    await contract.merge(data).save()
    return ApiResponse.success('Contract has Been edit', contract)
  }

  async delete(contractId: string) {
    const contract = await Contract.findBy('slug', contractId)

    if (!contract) {
      return ApiResponse.notFound('Ressource Not Found')
    }

    await contract.delete()
    return ApiResponse.success('Success', 'Contract deleted successfully')
  }

  async getAll() {
    return ApiResponse.success('Success', await Contract.all())
  }

  async getComapanyContract(companyId: any) {
    try {
      const company = await Company.findBy('slug', companyId)

      if (!company) {
        return ApiResponse.notFound(' Comapny Request Not Found')
      }

      const contracts = await Contract.query().select('*').where('company_id', company?.id).preload('agreements')

      return ApiResponse.success('Success', contracts)
    } catch (error) {
      return ApiResponse.error('Internal  Server Error', error)
    }
  }

  async getById(contractId: string) {
    const contract = await Contract.findBy('slug', contractId)
    return contract
      ? ApiResponse.success('Success', contract)
      : ApiResponse.notFound('Ressource Not Found')
  }
}
