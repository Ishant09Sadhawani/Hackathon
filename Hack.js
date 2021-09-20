let url = "https://www.91mobiles.com/compare-mobile-phones.html?utm_source=google&utm_medium=cpc&utm_campaign=userCampaigns_compare-gams&gclid=CjwKCAjw4qCKBhAVEiwAkTYsPHnKACFk5KPjUfWJW9Z03l8M2ISpX7y_LM8ihjp5Af8VhhNd2d5n1BoC_GoQAvD_BwE";
let url1="https://www.91mobiles.com/search_page.php?q=samsung%20galaxy%20f62&type=all&utm_source=autosuggest";
let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let mobile=require("./MobilePhone.js")
let path = require("path");
let xlsx = require("xlsx");
const loginLink = url;
const puppeteer = require("puppeteer")
let browserStartPromise = puppeteer.launch({
    // visible 
    headless: false,
    // type 1sec // slowMo: 1000,
    defaultViewport: null,
    // browser setting 
    args: ["--start-maximized", "--disable-notifications"]
});
let page, browser;
browserStartPromise
    .then(function (browserObj) {
        console.log("Browser opened");
        // new tab 
        browser = browserObj
        let browserTabOpenPromise = browserObj.newPage();
        return browserTabOpenPromise;
    }).then(function (newTab) {
        page = newTab
        console.log("new tab opened ")
        let gPageOpenPromise = newTab.goto(loginLink);
        return gPageOpenPromise;
    }).then(function () {
        let emailWillBeEnteredPromise = page.type(".search_wrap.selection-container", mobile.MobileName , { delay: 10 });
        return emailWillBeEnteredPromise;
    }).then(function () {
        let loginWillBeDOnepromise =
            page.click(".search_bttn", { delay: 100 });
        return loginWillBeDOnepromise;
    }).then(function () {
        let loginWillBeDOnepromise =
            waitAndClick(".compare-button.gaclick", page);
        return loginWillBeDOnepromise;
    }).then(function () {
        let waitFor3SecondsPromise = page.waitFor(3000);
        return waitFor3SecondsPromise;
    }).then(function () {
        let emailWillBeEnteredPromise = page.type(".autosuggest.ui-autocomplete-input", mobile.compareName , { delay: 10 });
        return emailWillBeEnteredPromise;
    }).then(function () {
        let loginWillBeDOnepromise =
            waitAndClick(".addcomp_btn", page);
        return loginWillBeDOnepromise;
    }).then(function () {
        let loginWillBeDOnepromise =
            waitAndClick(".comp_btn", page);
        return loginWillBeDOnepromise;
    })
    .then(function () {
        let waitFor3SecondsPromise = page.waitFor(3000);
        return waitFor3SecondsPromise;
    }).then(function () {
        let ctrlIsPressedP = page.keyboard.down("Control");
        return ctrlIsPressedP;
    }).then(function () {
        let waitFor3SecondsPromise = page.waitFor(3000);
        return waitFor3SecondsPromise;
    })
    .then(function () {
        let AIsPressedP = page.keyboard.press("-" );
        return AIsPressedP;
    }).then(function () {
        let AIsPressedP = page.keyboard.press("-");
        return AIsPressedP;
    }).then(function () {
        let AIsPressedP = page.keyboard.press("-");
        return AIsPressedP;
    }).then(function () {
        let ctrlIsPressedP = page.keyboard.up("Control");
        return ctrlIsPressedP;
    }).then(function(){
        let ScreenShot= page.screenshot({path: `screenshot.png`, fullPage: true});
    })

function waitAndClick(selector, cPage) {
        return new Promise(function (resolve, reject) {
            let waitForModalPromise = cPage.waitForSelector(selector, { visible: true });
            waitForModalPromise
                .then(function () {
                    let clickModal =
                        cPage.click(selector, { delay: 100 });
                    return clickModal;
                }).then(function () {
                    resolve();
                }).catch(function (err) {
                    reject(err)
                })
        }
        )
    }

    // function cb(error, response, html) {

    //     if (error) {
    //         console.log(error); // Print the error if one occurred
    //     } else if (response.statusCode == 404) {
    //         console.log("Page Not Found")
    //     }
    //     else {
    //         // console.log(html); // Print the HTML for the request made 
    //         fs.writeFileSync("d.html",html)
    //         dataExtracter(html);
    //     }
    // }
    // function dataExtracter(html) {
    //     let searchTool = cheerio.load(html)
    //     // team name

    //     let TableContent = searchTool(".content-table");
    //     console.log(TableContent.length)
    // }
