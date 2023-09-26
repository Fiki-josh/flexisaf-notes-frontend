import {Routes, Route} from 'react-router-dom'
import { Layout } from './components/Layout'
import { Public } from './components/Public'
import { UserLayout } from './components/UserLayout'
import { Login } from './features/auth/Login'
import { UserList } from './features/users/UserList'
import { NoteList } from './features/notes/NoteList'
import Welcome from './features/auth/Welcome'
import { EditUser } from './features/users/EditUser'
import { NewUserForm } from './features/users/NewUserForm'
import { EditNote } from './features/notes/EditNote'
import { NewNote } from './features/notes/NewNote'
import { Prefetch } from './features/auth/Prefetch'
import { PersistLogin } from './features/auth/PersistLogin'
import { Roles } from './config/roles'
import { RequireAuth } from './features/auth/RequireAuth'
import { useTitle } from './hooks/useTitle'
function App() {
  useTitle("FikiNotes");
  return (
    <Routes>
      <Route path = '/' element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
        {/* private routes */}
        <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(Roles)]} />}>
            <Route element={<Prefetch />}>

              <Route path ='dash' element={<UserLayout />}>
                <Route index element={<Welcome />} />

                  <Route element={<RequireAuth allowedRoles={[Roles.Manager, Roles.Admin]} />}>

                    <Route path='users' >

                      <Route index element={<UserList />} />
                      <Route path=':id' element={<EditUser />} />
                      <Route path='new' element={<NewUserForm />} />

                    </Route>
                  </Route>
                  
                  <Route path='notes' >
                    <Route index element={<NoteList />} />
                    <Route path=':id' element={<EditNote />} />
                    <Route path='new' element={<NewNote />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route> {/* private routes */}
    </Routes>
  )
}

export default App
