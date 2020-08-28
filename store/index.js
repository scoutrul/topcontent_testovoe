const BASE_URL = process.env.BASE_URL

const toFormData = function (obj) {
  const formData = new FormData()

  for (const key in obj) {
    if (key === 'file') {
      formData.append(key, obj[key])
    } else {
      formData.set(key, obj[key])
    }
  }

  return formData
}

export const state = () => ({
  isLoading: false,
  events: [],
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
      this.$toast.success('Updated')
    } catch (err) {
      this.$toast.error(err)
    } finally {
      commit('updLoading', false)
    }
  },
  async postData({ commit }, { path, data = {} }) {
    commit('updLoading', true)
    try {
      await this.$axios
        .$post(`${BASE_URL}/${path}`, toFormData(data))
        .then(() => {
          this.$toast.success('Success')
        })
    } catch (err) {
      this.$toast.error(err)
    } finally {
      commit('updLoading', false)
    }
  },
}

export const mutations = {
  setData(state, { facility, data }) {
    state[facility] = data
  },
  updLoading(state, status) {
    state.isLoading = status
  },
}
