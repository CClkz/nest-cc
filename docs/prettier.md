

## 最佳实践
#### 项目里crlf文档怎么全部转换成lf

prettier.config 配置
```json
{
  "endOfLine": "lf"
}
```
再用prettier格式化所有文件
prettier --write "**/*.{js,jsx,ts,tsx,json,css,scss,md}"
