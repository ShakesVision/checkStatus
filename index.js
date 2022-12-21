const http = require("http");

const websiteUrl = "http://live.bazm.org:9002/live";
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write(`You are checking status for: ${websiteUrl}`)
    try {
        http.get(websiteUrl, (res) => {
            const statusCode = res.statusCode;
            console.log({ statusCode });
            if (req.url == 'status') res.write("Status: " + statusCode);
            res.sendStatus(statusCode)
            res.send(JSON.stringify({ statusCode }));
        })
            .on("error", (error) => {
                console.log({ statusCode: 500 });
                res.sendStatus(500)
                res.send(JSON.stringify({ statusCode: 500 }));
            });
    } catch (error) {
        console.log(error);
        res.sendStatus(statusCode);
        res.send(JSON.stringify({
            statusCode: 500,
            body: JSON.stringify({ error: "Failed fetching the link." }),
        }));
    }
}).listen(process.env.PORT || 3000);