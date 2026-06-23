import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  try {
    const user = localStorage.getItem('user');
    return {
      user: user ? JSON.parse(user) : null,
      isAuthenticated: !!user,
    };
  } catch (error) {
    return {
      user: null,
      isAuthenticated: false,
    };
  }
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    register: (state, action) => {
      // Mocking register, sets user in session immediately
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
});

export const { login, register, logout } = authSlice.actions;
export default authSlice.reducer;
