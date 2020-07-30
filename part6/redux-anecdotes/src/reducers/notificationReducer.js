const notificationReducer = (state = { message: ``, show: false }, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { message: action.message, show: true }
    case 'HIDE_NOTIFICATION':
      return { message: ``, show: false }
    default:
      return state
  }
}

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      message
    })

    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
      })
    }, time * 1000)
  }
}

export default notificationReducer