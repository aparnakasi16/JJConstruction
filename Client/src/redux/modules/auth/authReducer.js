import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  isLoading: false,
  token: '',
  userDetails: '',
  hasToken:''
};

export const signup = createAsyncThunk(
    'signup',
    async (payload, thunkAPI) => {
      // console.log('payload here',payload)
      try {
        thunkAPI.dispatch(updateIsLoading(true));
        const response = await fetch(`http://localhost:8000/api/signup`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log('authenticate response', data);
        thunkAPI.dispatch(updateIsLoading(false));
        return data;
      } catch (error) {
        console.log('error', error);
        thunkAPI.dispatch(updateIsLoading(false));
        // throw new Error(error.message);
      }
    },
  );



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      isSignedIn: (state, action) => {
        state.hasToken = action.payload;
        return state;
      },
      updateIsLoading: (state, action) => {
        state.isLoading = action.payload;
        return state;
      },
    },
    extraReducers: builder => {
    //   builder.addCase(authenticate.fulfilled, (state, action) => {
    //     state.token = action.payload?.token;
    //   //   state.hasToken = action.payload?.accessStatus
    //     if (action.payload?.token) {
    //       state.userDetails = action.payload.userDetail;
    //       AsyncStorage.setItem('token', JSON.stringify(action.payload.token));
    //       AsyncStorage.setItem(
    //         'userData',
    //         JSON.stringify(action.payload.userDetail),
    //       );
    //     }
  
    //     return state;
    //   });
    },
  });
  export const { updateIsLoading,isSignedIn} = authSlice.actions;
  export default authSlice.reducer;
  