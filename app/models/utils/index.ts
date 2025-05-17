
export enum AccountType {
    COMPANIES = "COMPANIES",
    PERSONNAL = "PERSONNAL"
}

export enum AppRoles {
    ADMIN = "ADMIN",
    CLIENT = "CLIENT"
}

export enum JobType {
    CDI = "CDI",
    INTERNSHIP = "INTERNSHIP",
    FREELANCE = "FREELANCE"
}

export enum Priority {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW',
}

export enum ProjectStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
  CLOSED = 'closed'
}

  
export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    BOTH = "BOTH"
}

export enum JobStatus{
    OPEN="OPEN",
    CLOSE="CLOSE",
    DRAFT="DRAFT"
}
export interface Price{
    value:number|null,
    currency:CurrencyType
}

export enum CurrencyType {
    XOF = 'XOF', // Franc CFA BCEAO (Afrique de l’Ouest)
    XAF = 'XAF', // Franc CFA BEAC (Afrique Centrale)
    ZAR = 'ZAR', // Rand sud-africain (Afrique du Sud)
    EGP = 'EGP', // Livre égyptienne (Égypte)
    NGN = 'NGN', // Naira nigérian (Nigéria)
  
    USD = 'USD', // Dollar américain
    EUR = 'EUR', // Euro
    GBP = 'GBP', // Livre sterling
    JPY = 'JPY', // Yen japonais
    CAD = 'CAD', // Dollar canadien
  
    AUD = 'AUD', // Dollar australien
    CNY = 'CNY', // Yuan renminbi
    INR = 'INR', // Roupie indienne
    BRL = 'BRL', // Réal brésilien
    RUB = 'RUB', // Rouble russe
  
    CHF = 'CHF', // Franc suisse
    KRW = 'KRW', // Won sud-coréen
    TRY = 'TRY', // Livre turque
    SEK = 'SEK', // Couronne suédoise
    MXN = 'MXN', // Peso mexicain
  }
  
export interface Address {
    title: String | null,
    long?: number | null,
    lat?: number | null
}

export interface EmailData {
    from: number
    to: number
    cc?: string
    bcc?: string
    subject: string
    html?: string
    text?: string,
}

export enum requiredField{
    UserEmail,
    AccountFirstName,
    AccountLastName,
    AccountPhoneNumber,
    AccountAvatarUrl,
    AccountCountry,
    AccountCity,
    AccountFirstLangage,
    AccountSecondLangage
}

export enum File_Type{
    IMAGE='image',
    VIDEO='video',
    PDF='pdf',
    DOCX='docx'
}

export enum CompanyScope {
    // TASK
    TASK_CREATE = "task:create",
    TASK_EDIT = "task:edit",
    TASK_DELETE = "task:delete",
    TASK_VIEW = "task:view",
    TASK_ALL = "task:all",
  
    // PROJECT
    PROJECT_CREATE = "project:create",
    PROJECT_EDIT = "project:edit",
    PROJECT_DELETE = "project:delete",
    PROJECT_VIEW = "project:view",
    PROJECT_ALL = "project:all",
  
    // JOB
    JOB_CREATE = "job:create",
    JOB_EDIT = "job:edit",
    JOB_DELETE = "job:delete",
    JOB_VIEW = "job:view",
    JOB_ALL = "job:all",
  }
  