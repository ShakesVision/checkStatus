const http = require("http");

const websiteUrl = "http://live.bazm.org:9002/live";
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)

    try {
        http.get(websiteUrl, (res) => {
            const statusCode = res.statusCode;
            console.log({ statusCode });
            res.write({ statusCode });
        })
            .on("error", (error) => {
                console.log({ statusCode: 500 });
                res.write({ statusCode: 500 });
            });
    } catch (error) {
        console.log(error);
        res.write({
            statusCode: 500,
            body: JSON.stringify({ error: "Failed fetching the link." }),
        });
    }
    res.end();
}).listen(process.env.PORT || 3000);