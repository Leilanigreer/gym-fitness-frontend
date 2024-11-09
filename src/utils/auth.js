export const isAuthenticated = () => {
  return localStorage.jwt !== undefined;
};