import { createStore, action } from 'easy-peasy'

const todos = {
  list: ['Create store', 'Wrap application', 'Use store'],
  delete: action((state: any, payload: number) => {
    // eslint-disable-next-line
    console.log(state)
    state.list.splice(payload, 1)
  }),
}

export default createStore({ todos })
