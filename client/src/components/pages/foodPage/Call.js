const food = search => {
    const axios = require('axios');
    const id = process.env.appid;
    const key = process.env.appkey;
    axios.get("https://api.nutritionix.com/v1_1/search/" + search + "?results=0:10&fields=item_name,brand_name,nf_calories&appId=" + id + "&appKey=" + key)
        .then(response => {
            const itemName = response.data.hits[0].fields.item_name
            const brand = response.data.hits[0].fields.brand_name
            const calories = response.data.hits[0].fields.nf_calories
            const servingSize = response.data.hits[0].fields.nf_serving_size_qty
            console.log(response.data.hits[0].fields)
            console.log(Object.entries(response.data.hits[0].fields))
            console.log("\nName: " + itemName + "\nBrand: " + brand + "\nCalories: " + calories + "\nServing Size: " + servingSize)

        });
        
}
module.exports = food