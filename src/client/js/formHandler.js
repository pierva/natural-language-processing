/**
 * @param {String} endpoint - API endpoint where to fetch the data from 
 * @param {String} text - The text to process
 * @param {String} domain - Domain for the aspect based sentiment analysis
 *                          options are 'hotels', 'restaurants', 'cars',
 *                          'airlines'. Default = empty string
 *  
 * @returns {json} - API response in json
 */

const handleSubmit = async (endpoint, text, domain = '') => {

    // Get the text from the text field and add the domain if available
    let formObj = {
        'text': text,
        'domain': domain
    }

    /**
     * For production dist change 'http://localhost:8081/process/' with 
     * window.location.origin + '/process/'
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
