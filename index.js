const http = require("http");

const websiteUrl = "http://live.bazm.org:9002/live";
try {
    http.get(websiteUrl, (res) => {
        const statusCode = res.statusCode;
        console.log({ statusCode });
        return { statusCode };
    })
        .on("error", (error) => {
            console.log({ statusCode: 500 });
            return { statusCode: 500 };
        });
} catch (error) {
    console.log(error);
    return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed fetching the link." }),
    };
}