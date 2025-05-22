import  vine  from '@vinejs/vine'

export const createLygosGatewayValidator = vine.compile(
  vine.object({
    amount: vine.number().positive(),
    shop_name: vine.string().minLength(2),
    message: vine.string().optional(),
    success_url: vine.string().url(),
    failure_url: vine.string().url(),
    order_id: vine.string().minLength(3),
  })
)
