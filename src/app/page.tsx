"use client";
import { useRef, useState, useEffect } from "react";
import downloadExcelFile from "@/helper/downloadExcel";
import importExcelData from "@/helper/importExcelData";

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: Rating;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // const fetchData = async () => {
  //   const response = await fetch("https://fakestoreapi.com/products");
  //   const data = await response.json();
  //   setProducts(
  //     data.map(({ id, title, category, price, rating }: Product) => ({
  //       id,
  //       title,
  //       category,
  //       price,
  //       rating: rating.rate,
  //     }))
  //   );
  // };

  return (
    <div className="relative overflow-x-auto flex justify-center items-center flex-col p-4 gap-10">
      <div className="flex justify-end w-[90%] gap-4">
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
        <button
          className="bg-slate-600 py-[10px] rounded-lg px-8 text-white uppercase"
          onClick={() => downloadExcelFile(products)}
        >
          Export
        </button>
      </div>
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
    </div>
  );
}
