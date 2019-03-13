import axios from "axios"
import { getFromStorage, setInStorage, } from '../utils/storage';
export default {
  search: (query) => {
    const id = "4fd1d55d";
    const key = "9788c6b183e3995fbc144d4b1b300850";
    const baseURL = "https://api.nutritionix.com/v1_1/search/"
    const paramsURL = "?results=0:10&fields=item_name,brand_name,nf_calories&appId=" + id
    const keyURL = "&appKey=" + key
    return axios.get(baseURL + query + paramsURL + keyURL)
  },

  // Gets the user with the given id
  getUser: function (id) {
    return axios.get("/user/" + id);
  },

  photo: function (query) {
    return axios.get("https://trackapi.nutritionix.com/v2/search/instant?query=" + query, {
      headers: {
        "x-app-id": "4fd1d55d",
        "x-app-key": "9788c6b183e3995fbc144d4b1b300850"
      }
    })
  },
 
  exer: function (query) {
    return axios.post("https://trackapi.nutritionix.com/v2/natural/exercise", {
      "query": query
    }, {
        headers: {
          "x-app-id": "4fd1d55d",
          "x-app-key": "9788c6b183e3995fbc144d4b1b300850",
          "Content-Type": "application/json"
        },

      })
  },

  signIn: function (email, password) {
    return new Promise((resolve, reject) => {

      fetch('/api/account/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then(res => res.json())
        .then(json => {
          if (json.success) {
            // !! call for the user's profile data
            this.getUser(json.userId)
              .then(res => resolve({user:res.data,token: json.token}))
              .catch(err => console.log(err));
            //!!
            setInStorage('the_main_app', { token: json.token });
            
          } else {
            reject("login failed")
          }
        });
    })
  }
}

