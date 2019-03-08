import axios from "axios"
export default {
    search: (query) => {
        const id = "4fd1d55d";
        const key = "9788c6b183e3995fbc144d4b1b300850";
        const baseURL = "https://api.nutritionix.com/v1_1/search/"
        const paramsURL = "?results=0:10&fields=item_name,brand_name,nf_calories&appId=" + id
        const keyURL = "&appKey=" + key
        return axios.get( baseURL + query + paramsURL + keyURL)  
    },

   // Gets the user with the given id
    getUser: function(id) {
      return axios.get("/user/" + id);
    }

}