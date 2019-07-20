var express=require('express');
var fs=require('fs');
var path=require('path');
var app=express();
app.use(express.static('static'));
app.get('/name1',(req,res)=>{
	res.end(fs.readFileSync(path.join(__dirname,'static','name1'),'utf8'))
})
app.post('/name1',(req,res)=>{
	var data='';
	req.on('data',(chunk)=>{
		data+=chunk
	})
	req.on('end',()=>{
		fs.writeFileSync(path.join(__dirname,'static','name1'),data)
	})
	res.send('l')
})
app.listen(8000);