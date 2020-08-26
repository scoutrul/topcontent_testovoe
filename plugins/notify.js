import { ToastProgrammatic as Toast } from 'buefy'

export default (ctx, inject) => {
  const notify = {
    error: (response) => {
      const message = response?.message || 'Error'
      Toast.open({ message, type: 'is-danger' })
      console.error(message)
    },
    success: (message) => {
      Toast.open({ message, type: 'is-success' })
    },
  }

  inject('notify', notify)
}
