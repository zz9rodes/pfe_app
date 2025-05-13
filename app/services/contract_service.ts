import Contract from '#models/contract'
import ApiResponse from '#models/utils/ApiResponse'

export class ContractService {
  async create(data: any) {

    console.log("dans le service");


    const contract = await Contract.create({
      ...data,
      slug: crypto.randomUUID(),
    })


    return ApiResponse.success("Success", contract)
  }

  async update(contractId: string, data: any) {
    console.log(contractId)
    const contract = await Contract.findBy('slug', contractId)
    if (!contract) {
      return ApiResponse.notFound("Ressource Not Found")
    }

    await contract.merge(data).save()
    return ApiResponse.success("Success", contract)
  }

  async delete(contractId: string) {
    const contract = await Contract.findBy('slug', contractId)

    if (!contract) {
      return ApiResponse.notFound("Ressource Not Found")
    }

    await contract.delete()
    return ApiResponse.success("Success", "Contract deleted successfully")
  }

  async getAll() {
    return ApiResponse.success("Success", await Contract.all())
  }

  async getById(contractId: string) {
    const contract = await Contract.findBy('slug', contractId)
    return contract ? ApiResponse.success("Success", contract) : ApiResponse.notFound("Ressource Not Found")
  }
}
