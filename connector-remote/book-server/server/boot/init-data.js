module.exports = function(app, cb) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */
  //process.nextTick(cb); // Remove if you pass `cb` to an async function yourself

  var Book = app.models.Book;
  var Chapter = app.models.Chapter;

  Book.create({name: 'Book A'}, function(err, book) {
    book.chapters.create([{name: 'Chapter 1'}, {name: 'Chapter 2'}], function(err, chapters) {
      console.log(chapters);
      cb();
    });
  })
};
