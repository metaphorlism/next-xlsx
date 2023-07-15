---
title: "Export xlsx file from your website"
disqus: JBeanny
---

By: Yim Sotharoth

docs: https://hackmd.io/@JBeanny/Hyp3qc8Kn

Real time communication of Nodejs Application with Kafkajs
<img
    src="https://kafka.js.org/img/kafkajs_circle.png"   
    alt="kafka-png"
    width="30"
/>
===

## Table of Contents

[TOC]

## Installation

:::info
_firstly your next project_

```bash=
$ npx create-next-app
```

_I named my project as `next-xlsx` ( or anything you want ) so I cd in my the project's directory_

> Install xlsx library

```bash=
$ npm install xlsx
```

:::

## Create Method to generate xlsx (Excel) data

_I create `helper` folder and then create a file with following code_:

```typescript!
import { utils, writeFile } from "xlsx";

function generateExcelData(data: any) {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelData = writeFile(workbook, "products.xlsx", {
    compression: true,
  });
  return excelData;
}

export default generateExcelData;
```

**_This function to generate the javascript object into excel data_**

_After done creating the `generateExcelData` function we need to create a function to handle the download action:_

```typescript!
import generateExcelData from "./ExcelDataGenerator";

function downloadExcelFile(data: any) {
  const excelData = generateExcelData(data);
  const blob = new Blob([excelData], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "data.xlsx");
  document.body.appendChild(link);
  link.click();
}

export default downloadExcelFile;
```

**_after creating this function you can just invoke the function within your button onClick action_**

## Example

`Table data on the website`

![](https://hackmd.io/_uploads/S1KOEay93.png)

`Exported excel file data`

![](https://hackmd.io/_uploads/rJ-oEpkc2.png)

Project Repository: https://github.com/metaphorlism/next-xlsx

## Contact Us

- :mailbox: yimsotharoth999@gmail.com
- [GitHub](https://github.com/metaphorlism)
- [Facebook Page](https://www.facebook.com/Metaphorlism)
- [Instagram: Metaphorlism](https://www.instagram.com/metaphorlism/)
