import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/download', (req, res) => {
    const { fileName } = req.body;
    console.log('fileName:::', fileName);
    // const filePath = path.resolve(__dirname, 'static', fileName);
    const filePath = path.join(process.cwd(), 'static', fileName);
    const content = fs.readFileSync(filePath);
    console.log('File uploaded successfully');
    // 两个相应头很重要
    // 1、Content-Type application/json 说明返回的是json对象；application/octet-stream 说明返回的是二进制文件
    // 2、Content-Disposition 我们在网页里面打开图片 直接去预览而不是下载 默认是inline内链模式；
    //  attachment 表示把文件当作附件下载模式；
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('content-Disposition', 'attachment;filename='+fileName);
    res.send(content);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});