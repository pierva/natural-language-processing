/**
 * THIS TEST DOESN'T PASS BECAUSE OF THE regenerator-runtime issue.
 * Even after configuring babelrc and installing the plugin transform-es2015-modules-commonjs
 * the issue still persists.
 */

// const request = require('supertest')
// const handleSubmit = require('../src/client/js/formHandler')

// require("regenerator-runtime")

// describe('Test request from the client', () => {
//     test('shuould send a request to the server and get a response', (done) => {
//         return handleSubmit('combined', 'Some beautiful text')
//             .then(data => {
//                 expect(data).not.toBe(undefined)
//             })
//     })
// })

