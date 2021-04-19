 export default {
     sendRequest(state,payload){
         state.requests.push(payload)
     },

     getRequests(state,payload){
         state.requests=payload
     }
 }