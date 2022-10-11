
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const { dirname } = require("path");
const PDFDocument = require('pdfkit');

function getIssuesPage(url , repotopic , topic){
    request(url, function(err, response, html){
        if(err){
            console.log(err);
        }else{
            // console.log(html);
            getIssues(html, repotopic,topic);
        }
    });

}

function getIssues(html, repoTopic,topic){
    let $ = cheerio.load(html);
    let issueElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let issues = [];
    for(let i=0;i<issueElemArr.length;i++){
        let link = $(issueElemArr[i]).attr("href");
        // console.log(link);
        issues.push(link);
     }
    // console.log(`${topic} : 
    // ${repoTopic}:
    //      ${issues}`);
    // console.log("````````````````````````````");
    let folderPath = path.join(__dirname, topic);
    dirCreator(folderPath);
    let filePath = path.join(folderPath, repoTopic + ".pdf");


    let text = JSON.stringify(issues);

    //making pdf
    let pdfkit = new PDFDocument;
    pdfkit.pipe(fs.createWriteStream(filePath));
    pdfkit.text(text);
    pdfkit.end();


}


function dirCreator(folderPath){
    if(fs.existsSync(folderPath) == false){
        fs.mkdirSync(folderPath);
    }
}
module.exports = getIssuesPage;