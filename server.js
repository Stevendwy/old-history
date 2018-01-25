const superagent = require('superagent')
const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

let mycookie = '_uab_collina=149824469948016525451018; _umdata=A502B1276E6D5FEF5FC9DDAD4246D0BFF95B26D38A7C1CE7BF1FB888E89919EBDD494F2D5A0E8C52CD43AD3E795C914C9E34E8FEC958F0A68B71608A32EA8B67; user_id=34f417a74f79348a03db0907c5bd469e; gt_server_status=1; language="languageCode=zh-CN"; real_ip="2|1:0|10:1508123642|7:real_ip|16:NTkuNjMuMjQ4LjQy|4c303ba9029f20cb2d7d5c6155be714b68ed6d9a86fadfd2f7ca477a56c9baed"; JSESSIONID=34f417a74f79348a03db0907c5bd469e; SessionId="2|1:0|10:1508123642|9:SessionId|20:IjE1MDgxMjM2NDIuMjEi|e964b04b78d14a340a493fc48ed1b5a228c42c7c0f23622fe0cf386956e279fc"; Authorization="2|1:0|10:1508123642|13:Authorization|20:IjE1NjAxODQzNzU1Ig==|b80892ed0245f9f37c67990383afd76a340f010c971c82a8683e6704375000a8"' // 自行添加 Cookie
// app.use(express.static(__dirname)) // 使用本地资源
let myurl = "https://test.007vin.com"
let url = myurl + "/login?username=15727575790&password=111111"
superagent.post(url)
.set('Content-Type', 'application/json;charset=UTF-8')
.set('Cookie', "")
.end(function(err, response) {
    if (err || !response.ok) {
        console.log(err)
    } else {
        let cookie = response.header['set-cookie']             //从response中得到cookie
        if(cookie){
            mycookie = cookie.toString().replace(/Path=\/,/g,"")
        }
    }
})

// 桥接线上路径到本地
app.get("*.*", (req, res) => {
  let path = req.path

  fs.readFile(__dirname + path, (err, data) => {
    if(!data) {res.end(data); return}
    data = data.toString()
    if(req.path.includes('.html')) data = data.replace(/https:\/\/cdns.007vin.com\//g, '')
    res.end(data)
  })
})

app.get('/*', (req, res) => {
  let ServerCookie = req.headers.cookie + ";" + mycookie

  superagent
    .get(`https://test.007vin.com${req.url}`)
    .send(req.query)
    .set('Content-Type', 'application/json;charset=UTF-8')
    .set('Cookie', ServerCookie)
    .end((err, resRequest) => {
        if(err) console.log(err)
        else res.end(JSON.stringify(resRequest.body))
    })
})

app.post('/*', (req, res) => {
  let ServerCookie = req.headers.cookie + ";" + mycookie

  superagent
    .post(`https://test.007vin.com${req.url}`)
    .send(req.query)
    .set('Content-Type', 'application/json;charset=UTF-8')
    .set('Cookie', ServerCookie)
    .end((err, resRequest) => {
        if(err) console.log(err)
        else res.end(JSON.stringify(resRequest.body))
    })
})

app.listen(8080, "127.0.0.1", () => {
  console.log("run in http://localhost:8080")
})
