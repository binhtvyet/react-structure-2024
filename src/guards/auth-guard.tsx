import React from 'react'
import { Navigate } from 'react-router-dom'

import { STORAGE } from '../config/storage'
import { PAGE_URL } from '../config/page-url'

function AuthGuard({ children }: React.PropsWithChildren) {
  const access_token = window.localStorage.getItem(STORAGE.ACCESS_TOKEN)

  if(!access_token) {
    return <Navigate to={PAGE_URL.LOGIN} />
  }

  return (
    <>{children}</>
  )
}

export default AuthGuard