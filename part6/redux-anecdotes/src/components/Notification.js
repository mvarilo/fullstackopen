import React from 'react';
import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notification = useSelector((store) => store.notification)
  return (
    <div style={notification.show ? style : { display: 'none' }}>
      {notification.message}
    </div>
  )
}

export default Notification
