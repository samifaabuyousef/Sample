import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private datePipe: DatePipe) {

  }

  async generateExcel(title,header,data) {


    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(title);


// Add Row and formatting
    // const titleRow = worksheet.addRow([title]);
    // titleRow.font = { name: 'Comic Sans MS', family: 4, size: 24,  bold: true };

// Blank Row
    // worksheet.addRow([]);

// Add Header Row
    const headerRow = worksheet.addRow(header);

// Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.font = {  family: 4, size: 16,  bold: true };
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
        cell.worksheet.views = [
            // {state: 'split', xSplit: 5000, ySplit: 3000, topLeftCell: 'G10', activeCell: 'A1'}
            { xSplit: 7000, ySplit: 3000}
          ];
  // cell.fill = {
  //   type: 'pattern',
  //   pattern: 'solid',
  //   fgColor: { argb: 'FFFFFF00' },
  //   bgColor: { argb: 'FF0000FF' }
  // };
  cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
});



// Add Data and Conditional Formatting
    data.forEach(d => {
  const row = worksheet.addRow(d);
 
  
});
const mergedCells = 'A2:A'+(data.length+1).toString();

worksheet.mergeCells(mergedCells)
worksheet.columns.forEach(function (column, i) {
 
    var maxLength = 0;
    column["eachCell"]({ includeEmpty: true }, function (cell) {
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
        var columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength ) {
            maxLength = columnLength;
        }
    });
    column.width = maxLength < 10 ? 50 : maxLength+20;
});


// Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  fs.saveAs(blob, title+'.xlsx');
});



  }
}