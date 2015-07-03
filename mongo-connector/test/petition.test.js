var app = require('..');
var should = require('should');
var Petition = app.models.Petition;

describe('petitions', function() {
  beforeEach(function(done) {
    Petition.destroyAll({}, done);
  });

  it('should init petition with 0', function(done) {
    Petition.create({description: 'v0'}, function(err, petitionCreated) {
      if (err) return done(err);
      petitionCreated.version.should.eql(0);
      done();
    });
  });

  describe('petition created', function() {
    var petition;

    beforeEach(function(done) {
      Petition.create({description: 'v0'}, function(err, petitionCreated) {
        if (err) return done(err);
        petition = petitionCreated;
        done();
      });
    });

    // TODO: fix. ignores the rest of update instructions if $- operator is present.
    it('should update description without $set and increment version', function(done) {
      petition.updateAttributes({description: 'v1', '$inc': {version: 1}}, function(err, petitionUpdated) {
        if (err) return done(err);
        Petition.findById(petitionUpdated.id, function(err, petitionFound) {
          if (err) return done(err);
          petitionFound.description.should.eql('v1');
          petitionFound.version.should.eql(1);
          done();
        });
      });
    });

    // TODO: fix. updateAttributes() does not return updated instance, as it supposed to:
    // http://docs.strongloop.com/display/LB/PersistedModel+class#persistedmodel-prototype-updateattributes
    it('should update description, increment version and return updated model instance', function(done) {
      petition.updateAttributes({'$set': {description: 'v1'}, '$inc': {version: 1}}, function(err, petitionUpdated) {
        if (err) return done(err);
        petitionUpdated.description.should.eql('v1');
        petitionUpdated.version.should.eql(1);
        done();
      });
    });

    // Work around:
    // - use $set implicitly;
    // - findById to get updated model instance.
    it('should update description and increment version with workarounds', function(done) {
      petition.updateAttributes({'$set': {description: 'v1'}, '$inc': {version: 1}}, function(err, petitionUpdated) {
        if (err) return done(err);
        Petition.findById(petitionUpdated.id, function(err, petitionFound) {
          if (err) return done(err);
          petitionFound.description.should.eql('v1');
          petitionFound.version.should.eql(1);
          done();
        });
      });
    });
  });

});