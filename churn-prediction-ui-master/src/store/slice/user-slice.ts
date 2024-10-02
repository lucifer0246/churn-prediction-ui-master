import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type SetUserPayload = {
  isAuthenticated: boolean,
  user: {
    email: string,
    role: string
  }
}

const initialState = {
  isAuthenticated: false,
  user: {
    email: '',
    role: ''
  }
}


const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      state.isAuthenticated = action.payload.isAuthenticated
      state.user = action.payload.user
    },
  }
})
export const { setUser } = userSlice.actions
export default userSlice.reducer