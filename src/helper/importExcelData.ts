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
