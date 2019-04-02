'use strict';

// const rp = require('request-promise');
// const $ = require('cheerio');
const puppeteer = require('puppeteer');
const { url } = require('./config');



const cheerio = {
    dynamicScraper:
        async function f() {
            const browser = await puppeteer.launch();
            const [page] = await browser.pages();

            await page.goto(url, { waitUntil: 'networkidle0' });
            const links = await page.evaluate(async () => {
                const scrollfar = document.body.clientHeight;
                window.scrollBy(0, scrollfar);
                await new Promise(resolve => setTimeout(resolve, 10000)); 
                return [...document.querySelectorAll('.scrollerItem div:nth-of-type(2) article div div:nth-of-type(3) a')]
                    .map((el) => el.href);
            });
            console.log(links, links.length);
           
            await browser.close();
            return (links);
        }
    
    
}

module.exports = cheerio;