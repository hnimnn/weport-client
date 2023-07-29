export const roundToK = (num: number) => {
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ]

  const found = map.find((x) => Math.abs(num) >= x.threshold)

  if (found) {
    const formatted = (num / found.threshold).toFixed(0) + found.suffix
    return formatted
  }

  return num
}
export const getDataOnCookies = (name: string) => {
  const newName = name + '='
  let token = null

  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieArray = decodedCookie.split(';')

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i]
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1)
    }
    if (cookie.indexOf(newName) === 0) {
      token = cookie.substring(newName.length, cookie.length)
    }
  }
  return token
}
