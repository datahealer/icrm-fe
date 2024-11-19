import React, { useState } from "react";
import moment from "moment";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import numWords from "num-words";
import axios from "axios";
import { currency } from "constant/currency";
import { toWords } from "number-to-words";
import { useNavigate } from "react-router-dom";
const TaxInvoice = ({ getValues, peopleData, handleSubmit }) => {
  const formData = getValues();

  let sgstRate = 0;
  let cgstRate = 0;
  let igstRate = 0;
  let sgstAmount = 0;
  let cgstAmount = 0;
  let igstAmount = 0;

  if (formData.business.gstTreatment === "OVERSEAS") {
    sgstRate = 0;
    cgstRate = 0;
    igstRate = 0;
  } else if (formData.business.state === "UP") {
    sgstRate = 0.09;
    cgstRate = 0.09;
    igstRate = 0;
  } else {
    sgstRate = 0;
    cgstRate = 0;
    igstRate = 0.18;
  }

  const calculateAmount = (item) => {
    const rate = item.rate || 0;
    const hrs = item.hours || 0;
    const disc = item.discountAmount || 0;

    const taxableValue = Math.max(0, rate * hrs - disc);
    sgstAmount = taxableValue * sgstRate;
    cgstAmount = taxableValue * cgstRate;
    igstAmount = taxableValue * igstRate;

    return taxableValue + sgstAmount + cgstAmount + igstAmount;
  };

  const currentCharges =
    formData.items.reduce((total, item) => {
      return total + calculateAmount(item);
    }, 0) || 0;
  const currentDue = currentCharges - (formData.amountReceived || 0);

  const totalAmountDue = Math.max(0, currentDue + (formData.previousDues || 0));
  const conversionRate = currency.USD[formData.business.invoiceCurrency] || 1;
  const convertedAmount = totalAmountDue * conversionRate;

  const 
  convertAmountToWords = (amount, currency) => {
    const words = toWords(amount);
    const formattedAmount = `${words} ${currency} Only`;
    return formattedAmount;
  };
  const amountInWords = convertAmountToWords(totalAmountDue, "USD") || "N/A";

  const formattedStartDate = moment(formData.project.startDate).format(
    "MMMM Do, YYYY"
  );
  const formattedEndDate = moment(formData.project.endDate).format(
    "MMMM Do, YYYY"
  );

  const navigate = useNavigate();
  const submitForm = async (values) => {
    console.log(peopleData, "sqjwih");
    const preparedBy = {
      id: peopleData._id,
      name: peopleData.displayName,
    };
    const payload = {
      ...values,
      preparedBy,
      status: "IN_REVIEW",
      doc: 1,
      sgstAmount,
      cgstAmount,
      igstAmount,
      cgstRate,
      sgstRate,
      igstRate,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/invoices/`,
        payload,
        {
          withCredentials: true,
        }
      );

      console.log("Invoice created successfully:", response.data);
      navigate("/admin/invoice");
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl border border-gray-300 p-8">
      <div className="mb-8 flex justify-between">
        <div>
          <img
            src="https://inzint-email-attachment.s3.ap-south-1.amazonaws.com/inzint_cover.jpeg"
            alt="INZINT Logo"
            className="mx-auto h-16 w-full"
          />

          <p className="text-sm">Inzint Private Limited</p>
          <p className="text-sm">B-111, Sector 65, Noida, India, 201301</p>
          <p className="text-sm">GSTIN: 09AAFCI7567Q1ZK</p>
        </div>
        <div className="text-right">
          <p className="text-sm">Invoice #: {formData.invoiceNumber}</p>
          <p className="text-sm">Invoice Date: {formData.invoiceDate}</p>
          <p className="text-sm">
            Due Date: {formData.dueDate || "YYYY-MMM-DD"}
          </p>
          <p className="mt-9 text-sm font-bold">
            Currency: {formData.currency || "<currency>"}
          </p>
          <p className="text-sm">Reverse Charge Applicable: No</p>
        </div>
      </div>

      {/* Billing Information */}
      <div className="mb -8 flex justify-between">
        <div className="mb-8">
          <h2 className="mb-2 font-bold">Billed To:</h2>
          <p className="text-sm">
            {formData.business.businessName || "<Business Name>"}
          </p>
          <p className="text-sm">
            Attn:{" "}
            {formData.business.primaryContactNumber ||
              "<Billing Contact Person>"}
          </p>
          <p className="text-sm">{formData.business.address || "<Address>"}</p>
          <p className="text-sm">
            {formData.business.billingToEmail || "<BillingToEmail>"}
          </p>
          {formData.business.gstin && (
            <p className="text-sm">GSTIN/UIN: {formData.business.gstin}</p>
          )}
          <p className="text-sm">
            Place Of Supply:{" "}
            {formData.business.placeOfSupply || "<Place of Supply>"}
          </p>
        </div>

        <div className="text-right">
          {formData.paymentLink ? (
            <QRCodeSVG
              value={formData.paymentLink}
              size={100} // Set the QR code size
              bgColor="#ffffff" // Background color
              fgColor="#000000" // Foreground color
            />
          ) : (
            <p className="text-sm">No payment link available</p>
          )}
        </div>
      </div>

      {/* Project Information */}
      <div className="mb -8 flex justify-between">
        <div className="mb-8">
          <p className="text-sm">
            Project: {formData.project.name || "<Project Name>"}
          </p>
          <p className="text-sm">
            Service Period: {formattedStartDate} - {formattedEndDate}
          </p>
          <p className="text-sm">
            Milestones: {formData.project.milestones || "<Milestones>"}
          </p>
        </div>

        <div className="text-right">Doc #: 1</div>
      </div>

      {/* Invoice Items Table */}
      <div className="mb-8 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">#</th>
              <th className="border p-2 text-left">Service</th>
              <th className="border p-2">SAC</th>
              <th className="border p-2">Hrs</th>
              <th className="border p-2">Rate</th>
              <th className="border p-2">Disc.</th>
              <th className="border p-2">Taxable Value</th>
              <th className="border p-2">SGST</th>
              <th className="border p-2">CGST</th>
              <th className="border p-2">IGST</th>
              <th className="border p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2 text-center">{item.sac}</td>
                <td className="border p-2 text-center">{item.hours}</td>
                <td className="border p-2 text-center">{item.rate}</td>
                <td className="border p-2 text-center">
                  <div> {item.discountAmount} </div>
                  <div>
                    ( {(item.discountAmount / (item.rate * item.hours)) * 100}
                    %)
                  </div>
                </td>
                <td className="border p-2 text-center">
                  {item.rate * item.hours - item.discountAmount}
                </td>
                <td className="border p-2 text-center">
                  {" "}
                  <div>{sgstAmount === 0 ? "-" : sgstAmount}</div>
                  <div>{sgstRate === 0 ? "" : `(${sgstRate * 100}%)`}</div>
                </td>
                <td className="border p-2 text-center">
                  {" "}
                  <div>{cgstAmount === 0 ? "-" : cgstAmount}</div>
                  <div>{cgstRate === 0 ? "" : `(${cgstRate * 100}%)`}</div>
                </td>
                <td className="border p-2 text-center">
                  {" "}
                  <div>{igstAmount === 0 ? "-" : igstAmount}</div>
                  <div>{igstRate === 0 ? "" : `(${igstRate * 100}%)`}</div>
                </td>
                <td className="border p-2 text-center">
                  {calculateAmount(item)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm">Prepared By: {peopleData.displayName}</p>
          <p className="text-sm">
            Date: {moment().utc().format("YYYY-MM-DD HH:mm:ss [UTC]")}
          </p>
      
        </div>
        <div className="text-right">
          <p className="text-sm">Current Charges: {currentCharges}</p>
          <p className="text-sm">
            Amount Received: {formData.amountReceived || 0}
          </p>
          <p className="text-sm">Current Due: {currentDue}</p>
          <p className="text-sm">Previous Dues: {formData.previousDues || 0}</p>
          <p className="font-bold">Total Amount Due in USD {totalAmountDue}</p>
          <p className="text-sm capitalize italic">{amountInWords}</p>
          {formData.business.invoiceCurrency !== "USD" && (
  <>
    <p className="mt-2 font-bold">
      Total Amount Due in {formData.business.invoiceCurrency}: {convertedAmount}
    </p>
    <p className="text-sm capitalize italic">
      {convertAmountToWords(convertedAmount, formData.business.invoiceCurrency)}
    </p>
  </>
)}

        </div>
        <p>signature & seal here</p>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit(submitForm)}
          className="rounded-md bg-blue-500 px-6 py-2 font-semibold text-white hover:bg-blue-600"
        >
          Submit Invoice
        </button>
      </div>
    </div>
  );
};

export default TaxInvoice;
