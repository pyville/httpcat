const http = require('http')
const fs = require('fs')
const axios = require('axios');
const parser = require('node-html-parser');

const hostname = '127.0.0.1'
const port = 7777

const getDescription = (code) => {

    return axios.get(`https://developer.mozilla.org/ko/docs/Web/HTTP/Status/${code}`)
        .then((res)=>res.data)
        .then((html)=>parser.parse(html))
        .then((doc)=>{
            const desc = doc.querySelector("article.main-page-content").querySelector("p").innerText
            return desc
        })
        .catch((e)=>{
            console.error(e)
            return "Error"
        })
}

const server = http.createServer((req, res) => {
    const code = req.url === '/' ? '200' : req.url.slice(1, req.url.length)
    getDescription(code).then((data)=>{
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.write(data)
        res.end()
    })
})

server.listen(port, hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}/`)
})
