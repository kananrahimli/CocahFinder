export default {
    setAuth(state,payload){
        state.userId=payload.userId,
        state.expiresIn=payload.expiresIn,
        state.idToken=payload.idToken
    }
}