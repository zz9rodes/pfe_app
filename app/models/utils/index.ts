
export  enum AccountType{
    COMPANIES="companies",
    PERSONNAL="personnal"
}

export interface Address{
    title:String |null,
    long?:number|null,
    lat?:number|null
}