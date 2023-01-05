
const http = require("http");
const config = require("config");
const fs = require("fs").promises;
const url = require("url");

const host = config.get("server.host");
const port = config.get("server.port");
/*
    Quotes
*/
let quotes = [
    {id: 1, author: "Alan Watts", quote: "The meaning of life is just to be alive." +  
                                        "It is so plain and so obvious and so simple. " +
                                        "And yet, everybody rushes around in a great panic " +
                                        "as if it were necessary to achieve something beyond themselves."},
    {id: 2, author: "Mooji", quote: "Feelings are just visitors, let them come and go."}  
]
const requestListener = function (req, res){
    let {pathname} = url.parse(req.url, true);
    console.log("url path= " + pathname );
    if ( pathname !== "/quotes"){
        (pathname === "/") ? pathname = "/meditationstimer.html": pathname;
        if (pathname === "/favicon.ico"){ // Request nach favicon.ico ignorieren
            console.log ("favicon");
            return;
        } 
        fs.readFile(__dirname + pathname)
            .then(contents => {
                //res.setHeader("Content-Type", "text/html"); noch net so doll hier
                res.writeHead(200);
                res.end(contents);
            })
            .catch(err => {
                res.writeHead(500);
                res.end(err);
                console.log("Bad Request " + pathname);
                return;
        });
    }else {
        res.setHeader('Content-Type', 'application/json;charset=utf-8');
        return res.end(JSON.stringify(quotes));
    }
}

const server = http.createServer(requestListener);
server.listen(port,host, ()=>{
    console.log("myWebServer is running ...");
});