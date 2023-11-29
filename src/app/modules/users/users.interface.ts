export type Tuser = {
  id: string
  password: string
  needsPasswordChange: boolean
  role: 'admin' | 'faculty' | 'student'
  status: 'in-progress' | 'blocked'
  isdeleted: boolean
}
