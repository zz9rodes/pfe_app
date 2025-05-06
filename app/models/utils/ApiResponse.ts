// export default class ApiResponse {
//     /**
//      * Format standard pour les réponses réussies
//      */
//     public static success(message: string, data: any = null) {
//       return {
//         success: true,
//         message,
//         data,
//       }
//     }

//     /**
//      * Format standard pour les erreurs
//      */
//     public static error(message: string, code: string = 'E_UNEXPECTED_ERROR', details: any = null) {
//       return {
//         success: false,
//         message,
//         error: {
//           code,
//           details,
//         },
//       }
//     }

//     public static validation(message = 'Validation failed', errors: any = []) {
//         return {
//           success: false,
//           message,
//           error: {
//             code: 'E_VALIDATION_FAILED',
//             details: errors,
//           },
//         }
//       }

//   }


// ApiResponse.ts
export default class ApiResponse {
  static success(message: string, data: any = null, statusCode = 200) {
    return { success: true, message, data, statusCode }
  }

  static error(message: string, code: string = 'E_ERROR', error: any = null, statusCode = 500) {
    return { success: false, message, code, error, statusCode }
  }

  static validation(message: string, errors: any, statusCode = 422) {
    return { success: false, message, errors, statusCode }
  }

  static notFound(message = 'Resource not found') {
    return { success: false, message, code: 'E_NOT_FOUND', statusCode: 404 }
  }

  static forbidden(message = 'Forbidden') {
    return { success: false, message, code: 'E_FORBIDDEN', statusCode: 403 }
  }

  static badRequest(message = 'Bad Request') {
    return { success: false, message, code: 'E_BAD_REQUEST', statusCode: 400 }
  }
}
