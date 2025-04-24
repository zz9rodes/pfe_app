
export  enum AccountType{
    companies="companies",
    personnal="personnal"
}

export interface Address{
    title:String |null,
    long?:number|null,
    lat?:number|null
}