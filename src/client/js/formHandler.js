function handleTextSubmit(event) {
    event.preventDefault()

    // Get the text from the text field
    const formText = document.querySelector('#textForm').value
    // Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    /**
     * For production dist change 'http://localhost:8081/' with 
     * window.location.origin
    */
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}

export { handleTextSubmit }
