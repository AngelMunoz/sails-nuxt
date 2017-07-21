export const state = () => ({
  users: []
})

export const mutations = {
  setUsers(users) {
    state.users = users;
  }
}