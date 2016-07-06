var fsevents = require('fsevents');
var watcher = fsevents(__dirname);
//watcher.on('fsevent', function(path, flags, id) {
//    console.log(111);
//}); // RAW Event as emitted by OS-X
watcher.on('change', function(path, info) {
    console.log(info);
}); // Common Event for all changes
watcher.start() // To start observation
//watcher.stop()  // To end observation