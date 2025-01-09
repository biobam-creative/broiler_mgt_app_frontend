import jsPDF from "jspdf";
import "jspdf-autotable";
import { primaryColor } from "./constants";

// const formatThousands = (amount) = {

// }

const generatePDF = (data, imgData, farmName) => {
  const doc = new jsPDF();

  // Table headers
  const headers = [["Date", "Particulars", "Income", "Expenditure"]];

  // const filteredData = data.filter((item) => {
  //   if (item === "active") return !flock.sold_out;
  //   if (item === "sold") return flock.sold_out;
  // });

  if (imgData) {
    doc.addImage(imgData, "JPG", 90, 10, 15, 15); // Adjust position and size as needed
  } else {
    doc.text("No logo uploaded", 90, 10); // Display message if no logo is selected
  }

  doc.setFontSize(16);
  // console.log(farmName);
  doc.text(farmName, 95, 30, { align: "center" });
  // Add title
  doc.setFontSize(12);
  doc.text("Financial Report", 95, 37, { align: "center" });

  // Table data
  const rows = data.map((item) => [
    item.date,
    item.description,
    item.income_expenditure === "Income" ? item.amount.toLocaleString() : null,
    item.income_expenditure === "Expenditure"
      ? item.amount.toLocaleString()
      : null,
  ]);

  const incomeTotal = data
    .filter((item) => {
      return item.income_expenditure === "Income";
    })
    .reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
    );

  const expenditureTotal = data
    .filter((item) => {
      return item.income_expenditure === "Expenditure";
    })
    .reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
    );

  const netProfit = incomeTotal - expenditureTotal;

  rows.push(
    [
      null,
      "Total",
      incomeTotal.toLocaleString(),
      expenditureTotal.toLocaleString(),
    ],
    [null, "Net Profit", null, netProfit.toLocaleString()]
  );

  // Add table to PDF
  doc.autoTable({
    head: headers,
    body: rows,

    startY: 45, // Start Y position for the table
    theme: "grid",
    styles: {
      fontSize: 10,
    },
    headStyles: {
      fillColor: primaryColor, // Dark header background
      textColor: 255,
      fontStyle: "bold",
    },
    didDrawCell: (data) => {
      data.cell.styles.textColor = primaryColor;
      if (data.row.index === rows.length - 2) {
        // Total row
        console.log(data.row.index);
        data.cell.styles.fontStyle = "bold";
      }
      if (data.row.index === rows.length - 1) {
        // Net Profit row
        console.log(data.row.index);
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.textColor = data.cell.raw > 0 ? "#008000" : "#FF0000"; // Green for profit, red for loss
      }
    },
  });

  // Save the PDF
  doc.save("financial_report.pdf");
};

export { generatePDF };
