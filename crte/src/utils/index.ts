export const debounce = (fn: () => void, ms = 200) => {
  let timer: any
  return function handle(this: any, ...args: any) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), ms)
  }
}

export default debounce
