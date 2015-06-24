module.exports = function(Event) {

  Event.afterCreate = function(next) {
    var push = Event.app.models.push;
    var notification = Event.app.models.notification;

    var createdEvent = this;

    push.notifyByQuery({}, new notification({title: createdEvent.title}), function (err) {
      if (err) return next(err);
      next();
    });
  };
};
