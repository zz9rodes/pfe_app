import type { HttpContext } from '@adonisjs/core/http'
import { createContractValidator, updateContractValidator } from '#validators/contract'
import { ContractService } from '#services/contract_service'
import { inject } from '@adonisjs/core'
import ApiResponse from '#models/utils/ApiResponse'
import { errors } from '@vinejs/vine'


@inject()
export default class ContractsController {

  constructor(private ContractService: ContractService) { }

  async index({ response }: HttpContext) {
    const result = await this.ContractService.getAll()
    return response.status(result.statusCode).json(result)
  }

  async show({ params, response }: HttpContext) {
    const result = await this.ContractService.getById(params.contractId)
    return response.status(result.statusCode).json(result)
  }

  async store({ request, response }: HttpContext) {
    console.log("dns le controller");
    
    try {
      const payload = await createContractValidator.validate(request.all())

      const result = await this.ContractService.create(payload)
      return response.status(result.statusCode).json(result)
    } catch (error) {
      console.log(error);
      
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(
          ApiResponse.validation('Invalid input', error.messages)
        )
      }

      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))

    }

  }

  async update({ request, params, response }: HttpContext) {

    try {
     

      const data= await updateContractValidator.validate(request.all())

      console.log(params.contractId)

    
  
      const result = await this.ContractService.update(params.contractId, data)
      return response.status(result.statusCode).json(result)
    } catch (error) {
      console.log(error)
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(
          ApiResponse.validation('Invalid input', error.messages)
        )
      }

      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))

    }

   
  }

  async destroy({ params, response }: HttpContext) {
    const result = await this.ContractService.delete(params.contractId)
    return response.status(result.statusCode).json(result)
  }
}
