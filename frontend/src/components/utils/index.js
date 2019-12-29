import React from 'react'
import { Link } from 'react-router-dom'

export const RedirectLogin = props => {
  return(
    <b>Usted no cuenta con los permisos necesarios para ver esta página,<Link to="/"> ir al login</Link></b>
  )
}