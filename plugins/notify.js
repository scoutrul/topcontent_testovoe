export default (ctx, inject) => {
  const notify = {
    error: (response) => {
      const msg = response?.message || 'Что-то пошло не так'
      if (typeof msg === 'object') {
        for (const key in msg) {
          ctx.app.$toast.error(msg[key])
          console.error(msg[key])
        }
      } else {
        ctx.app.$toast.error(msg)
        console.error(msg)
      }
    },
    success: (msg) => {
      ctx.app.$toast.success(msg || 'Успешно')
    },
  }

  inject('notify', notify)
}
