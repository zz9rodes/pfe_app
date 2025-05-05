export default class ApiResponse {
    /**
     * Format standard pour les réponses réussies
     */
    public static success(message: string, data: any = null) {
      return {
        success: true,
        message,
        data,
      }
    }
  
    /**
     * Format standard pour les erreurs
     */
    public static error(message: string, code: string = 'E_UNEXPECTED_ERROR', details: any = null) {
      return {
        success: false,
        message,
        error: {
          code,
          details,
        },
      }
    }

    public static validation(message = 'Validation failed', errors: any = []) {
        return {
          success: false,
          message,
          error: {
            code: 'E_VALIDATION_FAILED',
            details: errors,
          },
        }
      }
      
  }
  