const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async(category)=>{
    const responce = await fetch(SummaryApi.categoryWiseProduct.url,{
        method: SummaryApi.categoryWiseProduct.method,
        headers: {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category
        })
    })
    const dataResponce = await responce.json()

    return dataResponce
}

export default fetchCategoryWiseProduct