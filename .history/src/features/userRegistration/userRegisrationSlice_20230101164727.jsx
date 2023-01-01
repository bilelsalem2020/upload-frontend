import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = `${process.env.REACT_APP_STRAPI_API_BASE_URL}/api/auth/local/register`;
export const register = createAsyncThunk(
  "userRegistration/register",
  async (state, thunkAPI) => {
    try {
      const resp = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          username: `${state.firstName} ${state.lastName}`,
          email: ${state.email}`,
          password: "password",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await resp.json();
      console.log(json);
      localStorage.setItem("token", json.jwt);
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
const initialState = {
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  phone: null,
  birth: null,
  loading: true,
};
const userRegistrationSlice = createSlice({
  name: "userRegistration",
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setBirth: (state, action) => {
      state.birth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(register.rejected, (state) => {
      state.loading = true;
    });
  },
});
export const {
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setPhone,
  setBirth,
} = userRegistrationSlice.actions;
export default userRegistrationSlice.reducer;
