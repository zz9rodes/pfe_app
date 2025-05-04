
export  enum AccountType{
    COMPANIES="COMPANIES",
    PERSONNAL="PERSONNAL"
}

export  enum AppRoles{
    ADMIN="ADMIN",
    CLIENT="CLIENT"
}

export interface Address{
    title:String |null,
    long?:number|null,
    lat?:number|null
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