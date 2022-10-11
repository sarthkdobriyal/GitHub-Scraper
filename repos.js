
const request = require("request");
const cheerio = require("cheerio");
const getIssuesPage = require("./Issues.js");

function getReposHTML(url , topic){
    request(url, function(err, response, html){
        if(err){
            console.log(err);
        }else{
            // console.log(html);
            getReposLink(html , topic);
        }
    });

}

function getReposLink(html , topic){
    let $ = cheerio.load(html);
    let reposElem = $(".text-bold.wb-break-word");
    // console.log(reposElem);
    // for(let i=0;i<reposElem.length;i++){
    //     console.log(reposElem[i]);
    // }
    // console.log(topic);
    // console.log("\n");
    for(let i =0;i<8;i++){
        // let anchors = $(reposElem[i]).find("a");
        let link = $(reposElem[i]).attr("href");
        let repoTopic = link.split("/").pop();
        let fullLink = "https://github.com/" + link + "/issues";
        getIssuesPage(fullLink, repoTopic, topic);
        
        // console.log(`${repoTopic} Link --> ${fullLink} `);
    }
    // console.log("`````````````````````````````````````");
}

module.exports = getReposHTML;