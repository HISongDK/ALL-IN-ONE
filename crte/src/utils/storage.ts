const storage = {
  set: (key: string, value: any) => {
    localStorage.set(key, JSON.stringify(value))
  },
  get: (key: string) => {
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value as string)
    } catch (e) {
      return value
    }
  },
}

export default storage
