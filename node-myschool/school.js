const request = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs-extra')
const path = require('path')



let url = 'http://www.sdju.edu.cn/'
// sleep函数
function sleep(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve()
        }, time)
    })
  };
  
function random(min,max){
    let range = max - min
    let rand = Math.random()
    let num = min + Math.round(rand * range)
    return num
};
async function getUrl() {
    let linkArr = []
    const res = await request.get(url)
    const $ = cheerio.load(res.text)
    $('.menu_nav ul li').each(function (i, elem) {
    let link = $(this).find('a').text()
    linkArr.push(link)
    })
    console.log(linkArr)
    return linkArr
  }
  getUrl()
// function download(imgUrl){
//     console.log(`正在下载${imgUrl}`)
//     const filename = imgUrl.split('/').pop()  
//     const req = request.get(imgUrl).set({ 'Referer': 'http://www.mmjpg.com' })
//     req.pipe(fs.createWriteStream(path.join(__dirname, 'mm', filename)))
// }

//   async function init(){
//     let urls = await getUrl();
//     for(let i = 0; i < urls.length; i++ )
//     {
//         download(urls[i])
//         await sleep(random(1000, 5000)) 
//     }
// }

//   init()