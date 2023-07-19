import { NavLink } from 'react-router-dom'
function Navigation({ location, content }) {
  return (
    <NavLink to={location} className='return btn'>
      {content}
    </NavLink>
  )
}
export default Navigation
