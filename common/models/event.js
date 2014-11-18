module.exports = function(Event) {

  Event.afterCreate = function(next) {
    var push = Event.app.models.push;
    var notification = Event.app.models.notification;

    push.notifyByQuery({}, new notification({foo: 'bar'}), function (err) {
      if (err) return next(err);
      next();
    });
  };
};
