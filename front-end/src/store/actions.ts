export const login = (token: string) => ({
    type: 'LOGIN',
    payload: token,
  });
  
export const logout = () => ({
    type: 'LOGOUT',    
});

export const register = (token: string) =>({
  type: 'REGISTER',
  payload: token
})
