# StrongLoop [LoopBack.JS] (https://github.com/strongloop/loopback) usage examples

## Push notifications
Shows how to set up and test push notifications.

```javascript
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

## Mongo connector
Shows how to use custom mongo operators.

```javascript
  petition.updateAttributes({'$set': {description: 'v1'}, '$inc': {version: 1}}, function(err, petitionUpdated) {
    if (err) return done(err);
    Petition.findById(petitionUpdated.id, function(err, petitionFound) {
      if (err) return done(err);
      petitionFound.description.should.eql('v1');
      petitionFound.version.should.eql(1);
      done();
    });
  });
```

Full example is here: [mongo-connector/](https://github.com/voitau/loopback-examples/tree/master/mongo-connector)
