var http = require('http');
var fs = require('fs');
var url = require('url');
var html = '';
var port = process.env.PORT || 5000;
http.createServer(function (req, res) {
  console.log('request url', req.url);
  var request = url.parse(req.url, true);
  if(req.url == '/'){
    fs.readFile('index.html', 'utf8', function(err, data) {
      if (err) throw err;
      html = data;
    });
    console.log('render HTML: 200');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  } else {
    try {
      console.log('reading ',request.pathname);
      var bin = fs.readFileSync('.'+request.pathname);
      res.writeHead('200', {'Content-Length': bin.length});
      res.end(bin, 'binary');
    } catch (err) {
      console.log(err);
    }
  }
}).listen(port);
console.log('listening to http://127.0.0.1:'+port);
console.log("   _____                              ____            _ __     ______");
console.log("  / ___/___  ______   _____  _____   / __ \____  ____( ) /_   / ____/___ _________");
console.log("  \__ \/ _ \/ ___/ | / / _ \/ ___/  / / / / __ \/ __ \/ __/  / /   / __ `/ ___/__/");
console.log(" ___/ /  __/ /   | |/ /  __/ /     / /_/ / /_/ / / / / / /_ / /___/ /_/ / //  __/");
console.log("/____/\___/_/    |___/\___/_/     /_____/\____/_/ /_/ \__/  \____/\___//_/  \___/");
