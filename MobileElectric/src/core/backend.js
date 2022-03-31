/* eslint-disable no-undef */
const endpoint = 'https://electric.viesoftware.net:5002/api/';
export default api = {
  login: endpoint + 'auth/login',
  logup: endpoint + 'auth/register',
  forgotPass: endpoint + 'auth/forgotpass',
  verifyotp: endpoint + 'auth/verifyotp',
  changePass: endpoint + 'auth/changepass',
  user: endpoint + 'user',
  updateUser: endpoint + 'user/',
  blog: endpoint + 'blog/detail?idBlog=',
};
