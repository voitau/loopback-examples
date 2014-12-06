StrongLoop's [LoopBack.JS] (https://github.com/strongloop/loopback) playground
============================
Testing LoopBack push notifications
----------------------------
Requires [loopback-push-component](https://github.com/strongloop/loopback-component-push) and [Sinon.js](https://github.com/cjohansen/Sinon.JS).

```javascript
  ...
  beforeEach(function(done) {
    pushStub = sinon.stub(app.models.Push, 'notifyByQuery', function(query, notification, cb) { cb(); });
    done();
  });

  afterEach(function(done) {
    pushStub.restore();
    done();
  });

  it('should send push notification when created', function(done) {
    Event.create({title: 'Party'}, function(err, results) {
      pushStub.calledOnce.should.eql(true);
      var pushStubCall = pushStub.getCall(0);

      var query = pushStubCall.args[0];
      query.should.eql({});

      var notification = pushStubCall.args[1];
      notification.title.should.eql('Party');
      done();
    });
  });
  ...
```
The rest of the code is in `tests/event.test.js`
