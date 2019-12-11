/**
 * @param {String} endpoint - API endpoint where to fetch the data from 
 * @param {String} textElement - The DOM element (textarea or input) where to get the text to process
 * @param {String} domain - Domain for the aspect based sentiment analysis
 *                          options are 'hotels', 'restaurants', 'cars',
 *                          'airlines'. Default = empty string
 *  
 * @returns {json} - API response in json
 */

const handleSubmit = async (endpoint, textElement, domain = '') => {

    // Get the text from the text field and add the domain if available
    let formObj = {
        'text': textElement.value,
        'domain': domain
    }

    console.log("::: Form Submitted :::")
    /**
     * For production dist change 'http://localhost:8081/' with 
     * window.location.origin
    */

    const baseUrl = 'http://localhost:8081/process/'

    const response = await fetch(baseUrl + endpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObj)
    })

    try {
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
        return error
    }
}

export { handleSubmit }
