export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const idToken=context.rootGetters.idToken
    const coachData = {
      id:userId,
      firstName: data.firstName,
      lastName: data.lastName,
      description: data.description,
      hourlyRate: data.hourlyRate,
      role: data.role
    };
    const response=await fetch(
      `https://fir-vue-file-default-rtdb.firebaseio.com/coaches.json?auth=`+idToken,
      {
        method: "POST",
        body: JSON.stringify(coachData),
      }
    );
    const responseData=response.json()
    if(response.status==401){
      const error=new Error(responseData.message || "Before you have to Login")
      throw error;
    }
    // context.commit("registerCoach", {
    //   ...coachData,
    //   id:userId
    // });
  },
  async loadCoaches(context,payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    let coaches = [];
    // const userId = context.rootGetters.userId;
    const response = await fetch(
      `https://fir-vue-file-default-rtdb.firebaseio.com/coaches.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData)
      const error = new Error(response.status );
      throw error;
      
    }

    for (const key in responseData) {
      const coach = {
        id: responseData[key].id,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        role: responseData[key].role,
      };
      coaches.push(coach);
    }
    context.commit("loadCoaches", coaches)
    context.commit('setFetchTimestamp');
  },
};
