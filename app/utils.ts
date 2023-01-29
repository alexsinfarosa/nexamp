export function stringToSlug(str: string) {
  str = str.replace(/^\s+|\s+$/g, '') // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
  var to = 'aaaaeeeeiiiioooouuuunc------'
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes

  return str
}

export function groupBy<T>(arr: T[], keys: (keyof T)[]): {[key: string]: T[]} {
  return arr.reduce((storage, item) => {
    const objKey = keys.map(key => `${item[key]}`).join(':')
    if (storage[objKey]) {
      storage[objKey].push(item)
    } else {
      storage[objKey] = [item]
    }
    return storage
  }, {} as {[key: string]: T[]})
}

export function isValidDate(date: string) {
  return isNaN(Date.parse(date)) ? null : date
}

export function isDateAfterDate2(date: string, date2: string) {
  return Date.parse(date) > Date.parse(date2)
}
