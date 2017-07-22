export const state = () => ({
  list: []
})

export const mutations = {
  setUsers(state, users) {
    state.list = users;
  }
}