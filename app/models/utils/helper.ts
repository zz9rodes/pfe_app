import CompanyRequest from "#models/company_request";
// export function removeEmptyFields(obj) {
//     if (Array.isArray(obj)) {
//       return obj
//         .map(removeEmptyFields)
//         .filter(value => {
//           if (value === null || value === undefined) return false;
//           if (typeof value === 'string' && value.trim() === '') return false;
//           if (typeof value === 'object' && Object.keys(value).length === 0) return false;
//           return true;
//         });
//     } else if (typeof obj === 'object' && obj !== null) {
//       return Object.entries(obj).reduce((acc, [key, value]) => {
//         const cleanedValue = removeEmptyFields(value);
//         if (
//           cleanedValue === null ||
//           cleanedValue === undefined ||
//           (typeof cleanedValue === 'string' && cleanedValue.trim() === '') ||
//           (typeof cleanedValue === 'object' && Object.keys(cleanedValue).length === 0)
//         ) {
//           return acc;
//         }
//         acc[key] = cleanedValue;
//         return acc;
//       }, {});
//     }
//     return obj;
//   }

export function removeEmptyFields<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj
      .map(removeEmptyFields)
      .filter((value) => {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string' && value.trim() === '') return false;
        if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) return false;
        return true;
      }) as unknown as T;
  } else if (typeof obj === 'object' && obj !== null) {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = removeEmptyFields(value);
      if (
        cleanedValue === null ||
        cleanedValue === undefined ||
        (typeof cleanedValue === 'string' && cleanedValue.trim() === '') ||
        (typeof cleanedValue === 'object' && cleanedValue !== null && Object.keys(cleanedValue).length === 0)
      ) {
        continue;
      }
      result[key] = cleanedValue;
    }
    return result;
  }

  return obj;
}




  
  
 export function cleanCompanyData(company: any) {
    const {
      id,
      slug,
      accountId,
      createdAt,
      updatedAt,
      ...rest
    } = company
  
    return rest
  }


export function serializeFields(payload: any, fields: string[]): void {
  fields.forEach((field) => {
    if (payload[field]) {
      payload[field] = JSON.stringify(payload[field])
    }
  })
}


export function deserializeFields(entity: any | any[], fields: string[]): void {
  if (Array.isArray(entity)) {
    entity.forEach((item) => deserializeFields(item, fields))
  } else {
    fields.forEach((field) => {
      const value = entity[field]
      if (typeof value === 'string') {
        try {
          entity[field] = JSON.parse(value)
        } catch (e) {
          entity[field] = null
        }
      }
    })
  }
}


  
  