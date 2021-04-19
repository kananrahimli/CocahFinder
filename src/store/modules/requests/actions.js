export default {
  async contactCoach(context, data) {
    const userId = context.rootGetters.userId;
    await fetch(
      `https://request-20e5d-default-rtdb.firebaseio.com/requests/${userId}.json`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    context.commit("sendRequest", data);
  },

  async getRequests(context) {
    const userId = context.rootGetters.userId;
    const response = await fetch(
      `https://request-20e5d-default-rtdb.firebaseio.com/requests/${userId}.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error=new Error(response.status )
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
