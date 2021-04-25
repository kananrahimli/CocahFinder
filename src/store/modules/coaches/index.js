import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      lastFetch:null,
      coaches: [
        // {
        //   id:1,
        //   firstName: "This is a test.",
        //   lastName: "So if you do refresh page,this data will delete.",
        //   role: ["frontend", "backend", "career"],
        //   description: "This will delete",
        //   hourlyRate: 30,
        // },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
