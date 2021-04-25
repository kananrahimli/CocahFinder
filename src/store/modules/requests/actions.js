export default {
  async contactCoach(context, data) {
    // const userId = context.rootGetters.userId;
    const idToken= context.rootGetters.idToken;
   const response= await fetch(
      `https://fir-vue-file-default-rtdb.firebaseio.com/requests/${data.coachId}.json?auth=${idToken}`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const responseData=response.json();
    if(response.status==401){
      const error=new Error(responseData.message||'Before you have to login')
      throw error;
    }
    context.commit("sendRequest", data);
  },

  async getRequests(context) {
    const userId = context.rootGetters.userId;
    const response = await fetch(
      `https://fir-vue-file-default-rtdb.firebaseio.com/requests/${userId}.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error=new Error(response.status || 'Error:')
      throw error;
    }
    const requests = [];
    for (const key in responseData) {
      const request = {
        coachId: responseData[key].coachId,
        email: responseData[key].email,
        id: responseData[key].id,
        message: responseData[key].message
      };
      requests.push(request);
    }
    context.commit("getRequests", requests);
  },
};
