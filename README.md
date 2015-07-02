# StrongLoop [LoopBack.JS] (https://github.com/strongloop/loopback) usage examples

## Testing LoopBack push notifications

```
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
```

Full example is here: [push-notifications/](https://github.com/voitau/loopback-examples/tree/master/push-notifications)