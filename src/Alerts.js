import { useEffect, useState } from 'react'

const Alerts = ({ message, show, type }) => {
  return <>{show && <div className={type}>{message}</div>}</>
}
export default Alerts
