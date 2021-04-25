export default {
  async login(context, data) {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDVVwvYvNnd09y9W5owVoxULuT04YSROs",
      {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();

    if (response.status==400) {
      console.log(responseData);
      const error = new Error(
        response.message || "This email not found.Please sign up or check your email addres and password"
      );
      throw error;
    }

    const newUser={
      idToken: responseData.idToken,
      expiresIn: responseData.expiresIn,
      userId: responseData.localId,
    }
    console.log(newUser);

    context.commit("setAuth", newUser);
  },
  async signUp(context, data) {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDVVwvYvNnd09y9W5owVoxULuT04YSROs",
      {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        response.message ||
          "This email was sign up already! Please enter other email address."
      );
      throw error;
    }
    const newUser={
      idToken: responseData.idToken,
      expiresIn: responseData.expiresIn,
      userId: responseData.localId,
    }
    console.log(newUser);
    context.commit("setAuth", newUser);
  },
  logOut(context){
    context.commit('setAuth',{
      idToken:null,
      expiresIn:null,
      userId:null
    })
  }
};
