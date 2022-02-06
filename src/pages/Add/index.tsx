import React from 'react'

import { UserForm } from '../../components/UserForm'

export default function AddPage() {
  return (
    <div>
      <UserForm isEditMode={false} />
    </div>
  )
}
