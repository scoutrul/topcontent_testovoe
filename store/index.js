const BASE_URL = process.env.BASE_URL

const toFormData = function (obj) {
  const formData = new FormData()
  for (const key in obj) {
    formData.set(key, obj[key])
  }
  return formData
}

export const state = () => ({
  events: [],
  stands: [],
})

export const actions = {
  async getData({ commit }, { path, facility }) {
    commit('updLoading', true)
    try {
      const res = await this.$axios.$get(`${BASE_URL}/${path}`)
      commit('setData', {
        facility,
        data: res,
      })
      this.$notify.success('Данные загружены')
    } catch (err) {
      this.$notify.error(err)
    } finally {
      commit('updLoading', false)
    }
  },
  async postData({ commit }, { facility, path, data = {} }) {
    commit('updLoading', true)
    try {
      const res = await this.$axios.$post(
        `${BASE_URL}/${path}`,
        toFormData(data)
      )
      commit('pushOne', { facility, data: { ...data, id: res.id } })
      this.$notify.success('Успешно добавлено')
    } catch (err) {
      this.$notify.error(err)
    } finally {
      commit('updLoading', false)
    }
  },
}

export const mutations = {
  setData(state, { facility, data }) {
    state[facility] = data
  },
  pushOne(state, { facility, data }) {
    state[facility].push(data)
  },
  updLoading(state, status) {
    state.isLoading = status
  },
}
