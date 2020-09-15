import { ToastProgrammatic as Toast } from 'buefy'

export default (ctx, inject) => {
  const toast = {
    error: (response) => {
      const message = response?.data?.message || 'Error'
      const errors = response?.data?.errors || []

      if (errors) {
        for (const error in errors) {
          Toast.open({
            position: 'is-bottom',
            message: errors[error],
            type: 'is-danger',
            queue: false,
          })
        }
      }
      Toast.open({ position: 'is-bottom', message, type: 'is-danger' })
      console.error(message)
    },
    success: (message) => {
      Toast.open({ position: 'is-bottom', message, type: 'is-success' })
    },
    info: (message) => {
      Toast.open({ position: 'is-bottom', message, type: 'is-info' })
    },
  }

  inject('toast', toast)
}
