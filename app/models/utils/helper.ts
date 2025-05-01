export function removeEmptyFields(obj) {
    if (Array.isArray(obj)) {
      return obj
        .map(removeEmptyFields)
        .filter(value => {
          if (value === null || value === undefined) return false;
          if (typeof value === 'string' && value.trim() === '') return false;
          if (typeof value === 'object' && Object.keys(value).length === 0) return false;
          return true;
        });
    } else if (typeof obj === 'object' && obj !== null) {
      return Object.entries(obj).reduce((acc, [key, value]) => {
        const cleanedValue = removeEmptyFields(value);
        if (
          cleanedValue === null ||
          cleanedValue === undefined ||
          (typeof cleanedValue === 'string' && cleanedValue.trim() === '') ||
          (typeof cleanedValue === 'object' && Object.keys(cleanedValue).length === 0)
        ) {
          return acc;
        }
        acc[key] = cleanedValue;
        return acc;
      }, {});
    }
    return obj;
  }
  