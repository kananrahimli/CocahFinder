export default {
  userId(state) {
    return state.userId;
  },
  idToken(state) {
    return state.idToken;
  },
  isLogged(state){
    return !!state.idToken
  }
};
