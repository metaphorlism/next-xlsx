---
title: "Import xlsx file to your website"
disqus: JBeanny
---

By: Yim Sotharoth

docs: https://hackmd.io/@JBeanny/BJ9l9Zfjh

Import data from xlsx file to web application
<img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/.xlsx_icon.svg/2048px-.xlsx_icon.svg.png"   
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

_I create `helper` folder and then create a `importExcelData.ts` file with following code_:

```typescript!
import { read, utils } from "xlsx";

interface RowIndex {
  [key: string]: any;
}

const importExcelData = (e: any, setTableData: any) => {
  const file = e.target?.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    if (!e.target) return;
    const data = new Uint8Array(e.target.result as any);
    const workbook = read(data, { type: "array" });

    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];

    // get data from xlsx file and filter out the empty row
    const jsonData = utils
      .sheet_to_json(worksheet, { header: 1 })
      .filter((data: any) => {
        if (data.length != 0) {
          if (data !== undefined) {
            console.log(data);
            return data;
          }
        }
      });

    // to return the array object dynamically
    const headers = jsonData[0] as [];

    const formattedData = jsonData.slice(1).map((row: any) => {
      const rowData = {} as RowIndex;
      headers.forEach((header: any, index: any) => {
        rowData[header] = row[index];
      });
      return rowData;
    });
    setTableData(formattedData);
  };

  reader.readAsArrayBuffer(file);
};

export default importExcelData;
```

**_Implementing button to open File Explorer_**

_Create this useRef for the input element_

```typescript!
const inputRef = useRef<HTMLInputElement>(null);
```

_button and input element_

```typescript!
<button
  className="bg-slate-400 rounded-lg px-8 py-[10px] text-white uppercase"
  onClick={() => inputRef.current?.click()}
>
  Import
  <input
    type="file"
    accept=".xlsx"
    className="hidden"
    onChange={(e) => importExcelData(e, setProducts)}
    ref={inputRef}
  />
</button>
```

**_Table for storing the data getting from the xlsx file (using tailwindcss)_**

_Create a state to store the data_

```typescript!
const [products, setProducts] = useState<Product[]>([]);
```

_Table element and styling_

```typescript!
   <table className="w-[90%] mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {Object.keys(products[0] || {}).map((header) => (
          <th key={header} className="p-2">
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {products?.map((product: Product, key: number) => {
        return (
          <tr
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            key={key}
          >
            <td className="px-6 py-4 text-white">{product.id}</td>
            <td
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {product.title}
            </td>
            <td className="px-6 py-4 text-white">{product.category}</td>
            <td className="px-6 py-4 text-white">${product.price}</td>
            <td className="px-6 py-4 text-white">
              {product.rating as any}⭐
            </td>
          </tr>
        );
      })}
    </tbody>
</table>
```

**_after creating this function you can just invoke the function within your button onClick action_**

## Example

`Excel file data`

![](https://hackmd.io/_uploads/rJ-oEpkc2.png)

`Table data on the web application after importing`
![](https://hackmd.io/_uploads/S1KOEay93.png)

Project Repository: https://github.com/metaphorlism/next-xlsx

## Contact Us

- :mailbox: yimsotharoth999@gmail.com
- [GitHub](https://github.com/metaphorlism)
- [Facebook Page](https://www.facebook.com/Metaphorlism)
- [Instagram: Metaphorlism](https://www.instagram.com/metaphorlism/)
