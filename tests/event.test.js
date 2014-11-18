var proxyquire = require('proxyquire'),
  pushManagerStub = {};

//FIXME
//var ??? = proxyquire('???', { 'push-manager': pushManagerStub });

var app = require('..');
var Event = app.models.Event;

describe('events', function() {

  it('should send push notification', function(done) {
    pushManagerStub.notifyByQuery = function(installationQuery, notification, cb) {
      notification.foo.should.eql('bar');
      done();
    };

    Event.create({}, function(err, results) {
      console.log(results);
    });
  });

});
