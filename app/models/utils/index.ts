
export  enum AccountType{
    COMPANIES="companies",
    PERSONNAL="personnal"
}

export  enum AppRoles{
    ADMIN="companies",
    CLIENT="personnal"
}

export interface Address{
    title:String |null,
    long?:number|null,
    lat?:number|null
}

export interface Link{
    icon?:string |null,
    title?:string|null,
    href:string|null
}

export interface Education{
    title:string|null,
    institution:string|null,
    deree:string|null,
    year:string|null    
}

export interface WorkExperience{
    title:string|null,
    desription:string|null,
    company:string|null,
    role:string|null,
    years:number,
    website:string
}


export interface PersonnalProject{
    title:string|null,
    desription:string|null,
    website:string
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