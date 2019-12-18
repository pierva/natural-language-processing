// __mocks__/request.js
const data = {
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

export default function request(url) {
  return new Promise((resolve, reject) => {
    const userID = parseInt(url.substr('/users/'.length), 10);
    process.nextTick(() =>
      users[userID]
        ? resolve(users[userID])
        : reject({
            error: 'User with ' + userID + ' not found.',
          }),
    );
  });
}