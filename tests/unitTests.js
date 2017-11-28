var superagent = require('superagent')
var expect = require('expect.js')

describe('Unit Test Cases', function() {

    it('Post Task', function(done) {
        superagent.post('http://localhost:3000/v1/tasks')
            .send({
                'task': 'Workout at Gym, tomorrow 5:30!!!'
            })
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(res.body.result).to.eql(true)
                done()
            })
    })

    it('Post Task Multi - line input ', function(done) {
        superagent.post('http://localhost:3000/v1/tasks')
            .send({
                'task': 'Workout at Gym, tomorrow 5:30!!!\nDAy after tomorrow morning 4am Go jogging at West Park'
            })
            .end(function(e, res) {
                expect(e).to.eql(null)
                expect(res.body.result).to.eql(true)
                done()
            })
    })

    it('Retrieves all tasks', function(done) {
        superagent.get('http://localhost:3000/v1/tasks')
            .end(function(e, res) {
                expect(e).to.eql(null)
                done()
            })
    })

    it('Retrieves task at 5:30', function(done) {
        superagent.get('http://localhost:3000/v1/tasks/"2017-11-28T21:30:00.000Z"')
            .end(function(e, res) {
                expect(e).to.eql(null)
                done()
            })
    })
})