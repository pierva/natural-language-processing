/**
 * @param {String} endpoint - API endpoint where to fetch the data from 
 * @param {String} textElement - The DOM element (textarea or input) where to get the text to process
 *
 * @returns {json} - API response in json
 */

const handleSubmit = async (endpoint, textElement) => {

    // Get the text from the text field
    let formText = {'text': textElement.value}

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
        body: JSON.stringify(formText)
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
