export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    await fetch(
      `https://fir-vue-file-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    // context.commit("registerCoach", data);
  },
  async loadCoaches(context) {
    let coaches = [];
    const userId = context.rootGetters.userId;
    const response = await fetch(
      `https://fir-vue-file-default-rtdb.firebaseio.com/coaches/${userId}.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
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
    context.commit("loadCoaches", coaches);
  },
};
