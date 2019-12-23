// __mocks__/request.js
const mockResponse = {
  "text": "Delicious food. Disappointing service.",
  "domain": "restaurants",
  "aspects": [{
    "aspect": "food",
    "aspect_confidence": 0.9835863709449768,
    "polarity": "positive",
    "polarity_confidence": 0.9158669114112854
  }, {
    "aspect": "staff",
    "aspect_confidence": 0.9747142195701599,
    "polarity": "negative",
    "polarity_confidence": 0.9969394207000732
  }],
  "sentences": [{
    "text": "Delicious food.",
    "polarity": "positive",
    "polarity_confidence": 0.9158669114112854,
    "aspects": [{
      "aspect": "food",
      "aspect_confidence": 0.9835863709449768,
      "polarity": "positive",
      "polarity_confidence": 0.9158669114112854
    }]
  }, {
    "text": "Disappointing service.",
    "polarity": "negative",
    "polarity_confidence": 0.9969394207000732,
    "aspects": [{
      "aspect": "staff",
      "aspect_confidence": 0.9747142195701599,
      "polarity": "negative",
      "polarity_confidence": 0.9969394207000732
    }]
  }]
}

export default function request(url, domain) {
  const domains = ['restaurants', 'hotels', 'car', 'airlines']
  const isValidDomain = domains.find(element => element === domain)
  return new Promise((resolve, reject) => {
    url = url === 'review' ? true : false
    if(!url) {
      reject({
        error: 'Invalid endpoint'
      })
    }
    if(!isValidDomain) {
      reject({
        error: 'Invalid domain'
      })
    } 
    resolve(mockResponse)
  })
}