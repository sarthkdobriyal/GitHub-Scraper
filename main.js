const url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const getReposHTML = require("./repos.js");

request(url, function(err, response, html) {
    if(err){
        console.log(err);
    }else{
        // console.log(html);
        extractLinks(html);
    }
});

function extractLinks(html){
    let $ = cheerio.load(html);
    let topicElem = $(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i=0;i<topicElem.length;i++){
        let link = $(topicElem[i]).attr("href");
        let topic = link.split("/").pop();
        let fullLink = "https://github.com/" + link;
        // console.log(topic);
        getReposHTML(fullLink , topic);
    }
}
