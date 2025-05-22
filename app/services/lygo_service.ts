import ApiResponse from '#models/utils/ApiResponse'
import env from '#start/env'
import axios from 'axios'
env
const LYGOS_API_URL = 'https://api.lygosapp.com/v1'
const LYGOS_API_KEY = env.get('LYGOS_API_KEY')

export default class LygosService {
  public async createPaymentGateway(payload: {
    amount: number
    shop_name: string
    message?: string
    success_url: string
    failure_url: string
    order_id: string
  }) {
    try {
      const response = await axios.post(`${LYGOS_API_URL}/gateway`, {
        amount: payload.amount,
        shop_name: payload.shop_name,
        message: payload.message || 'Paiement pour commande',
        success_url: payload.success_url,
        failure_url: payload.failure_url,
        order_id: payload.order_id,
      }, {
        headers: {
          'api-key': LYGOS_API_KEY,
          'Content-Type': 'application/json',
        },
      })

      return ApiResponse.success("",response.data) 
    } catch (error: any) {
      return ApiResponse.error(error.response?.data || error.message,error.code,error, error.response?.status || 500)
    }
  }

  public async getGatewayById(gatewayId: string) {
  try {
    const response = await axios.get(`${LYGOS_API_URL}/gateway/${gatewayId}`, {
      headers: {
        'api-key': LYGOS_API_KEY,
        'Content-Type': 'application/json',
      },
    })

    return ApiResponse.success("Success",response.data)
  } catch (error: any) {
        return ApiResponse.error(error.response?.data || error.message,error.code,error, error.response?.status || 500)

    }
}

}
