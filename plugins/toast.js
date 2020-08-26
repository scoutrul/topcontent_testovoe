import { ToastProgrammatic as Toast } from 'buefy'

export default (ctx, inject) => {
  const toast = {
    error: (response) => {
      const message = response?.message || 'Error'
      Toast.open({ position: 'is-bottom', message, type: 'is-danger' })
      console.error(message)
    },
    success: (message) => {
      Toast.open({ position: 'is-bottom', message, type: 'is-success' })
    },
  }

  inject('toast', toast)
}
