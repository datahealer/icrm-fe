import React, { useState } from "react";
import moment from "moment";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import numWords from "num-words";
import axios from "axios";
import { currency } from "constant/currency";
import { useAuthContext } from "hooks/useAuthContext";

import { toWords } from "number-to-words";
import { useLocation, useNavigate } from "react-router-dom";
const ReviewInvoice = () => {
  const location = useLocation();
  const { formData } = location.state || {};
  const { user } = useAuthContext();

  // console.log(formData.clientId, "hweidhqwidhnw");
  // let sgstRate = 0;
  // let cgstRate = 0;
  // let igstRate = 0;

  // if (formData.clientId.gstTreatment === "OVERSEAS") {
  //   sgstRate = 0;
  //   cgstRate = 0;
  //   igstRate = 0;
  // } else if (formData.clientId.state === "UP") {
  //   sgstRate = 0.09;
  //   cgstRate = 0.09;
  //   igstRate = 0;
  // } else {
  //   sgstRate = 0;
  //   cgstRate = 0;
  //   igstRate = 0.18;
  // }

  const calculateAmount = (item) => {
    const rate = item.rate || 0;
    const hrs = item.hours || 0;
    const disc = item.discountAmount || 0;

    const taxableValue = Math.max(0, rate * hrs - disc);

    return (
      taxableValue +
      item.sgstAmount +
      item.cgstAmount +
      item.igstAmount
    ).toFixed(2);
  };
  const handleAccept = async () => {
    const invoiceId = formData?._id;
    console.log(user, "sqhnisqh");
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/invoices/${invoiceId}`,
        {
          status: "REVIEW_APPROVED",
          reviewedBy: user.user._id,
        },
        {
          withCredentials: true,
        }
      );
      navigate("/admin/invoice");
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  };

  const handleReject = async () => {
    const invoiceId = formData?._id;
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/invoices/${invoiceId}`,
        {
          status: "REVIEWED_CHANGE_REQUESTED",
        },
        {
          withCredentials: true,
        }
      );
      navigate("/admin/invoice");
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  };

  const currentCharges = (
    formData?.services.reduce((total, item) => {
      const serviceAmount =
        item.hours * item.rate + item.igstAmount - item.discountAmount;
      return total + serviceAmount;
    }, 0) || 0
  ).toFixed(2);

  const currentDue = (currentCharges - (formData?.amountReceived || 0)).toFixed(
    2
  );

  const totalAmountDue = Math.max(
    0,
    currentDue + (formData?.previousDues || 0)
  ).toFixed(2);
  console.log(currency.USD[formData?.clientId?.invoiceCurrency], "wcjidwj");
  const conversionRate = currency.USD[formData?.clientId?.invoiceCurrency] || 1;
  const convertedAmount = (totalAmountDue * conversionRate).toFixed(2);

  const convertAmountToWords = (amount, currency) => {
    const words = toWords(amount);
    const formattedAmount = `${words} ${currency} Only`;
    return formattedAmount;
  };
  const amountInWords = convertAmountToWords(totalAmountDue, "USD") || "N/A";

  const formattedStartDate = moment(formData?.projectId?.startDate).format(
    "MMMM Do, YYYY"
  );
  const formattedEndDate = moment(formData?.projectId?.endDate).format(
    "MMMM Do, YYYY"
  );

  const navigate = useNavigate();
  // const submitForm = async (values) => {
  //   console.log(peopleData, "sqjwih");
  //   const preparedBy = {
  //     id: peopleData._id,
  //     name: peopleData.displayName,
  //   };
  //   const payload = {
  //     ...values,
  //     preparedBy,
  //     status: "IN_REVIEW",
  //     doc: 1,
  //     sgstAmount,
  //     cgstAmount,
  //     igstAmount,
  //     cgstRate,
  //     sgstRate,
  //     igstRate,
  //   };
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/invoices/`,
  //       payload,
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     console.log("Invoice created successfully:", response.data);
  //     navigate("/admin/invoice");
  //   } catch (error) {
  //     console.error("Error creating invoice:", error);
  //   }
  // };

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
          <p className="text-sm">Invoice #: {formData?.invoiceNumber}</p>
          <p className="text-sm">
            Invoice Date: {moment(formData?.invoiceDate).format("YYYY-MM-DD")}
          </p>
          <p className="text-sm">
            Due Date: {moment(formData?.dueDate).format("YYYY-MM-DD")}
          </p>
          <p className="mt-9 text-sm font-bold">
            Currency: {formData?.currency || "<currency>"}
          </p>
          <p className="text-sm">Reverse Charge Applicable: No</p>
        </div>
      </div>

      {/* Billing Information */}
      <div className="mb -8 flex justify-between">
        <div className="mb-8">
          <h2 className="mb-2 font-bold">Billed To:</h2>
          <p className="text-sm">
            {formData?.clientId?.businessName || "<Business Name>"}
          </p>
          <p className="text-sm">
            Attn:{" "}
            {formData?.clientId?.primaryContactNumber ||
              "<Billing Contact Person>"}
          </p>
          <p className="text-sm">
            {formData?.clientId?.address || "<Address>"}
          </p>
          <p className="text-sm">
            {formData?.clientId?.billingToEmail || "<BillingToEmail>"}
          </p>
          {formData?.clientId?.gstin && (
            <p className="text-sm">GSTIN/UIN: {formData?.clientId?.gstin}</p>
          )}
          <p className="text-sm">
            Place Of Supply:{" "}
            {formData?.clientId?.placeOfSupply || "<Place of Supply>"}
          </p>
        </div>

        <div className="text-right">
          {formData?.paymentLink ? (
            <QRCodeSVG
              value={formData?.paymentLink}
              size={100}
              bgColor="#ffffff"
              fgColor="#000000"
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
            Project: {formData?.projectId?.name || "<Project Name>"}
          </p>
          <p className="text-sm">
            Service Period: {formattedStartDate} - {formattedEndDate}
          </p>
          <p className="text-sm">
            Milestones: {formData?.milestones || "<Milestones>"}
          </p>
        </div>

        <div className="text-right">Doc #: {formData?.doc}</div>
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
            {formData?.services.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2 text-center">{item.sac}</td>
                <td className="border p-2 text-center">{item.hours}</td>
                <td className="border p-2 text-center">{item.rate}</td>
                <td className="border p-2 text-center">
                  <div>
                    <div>{item.discountAmount} </div>
                    <div>
                      ( {(item.discountAmount / (item.rate * item.hours)) * 100}
                      %)
                    </div>
                  </div>
                </td>
                <td className="border p-2 text-center">{item.taxableAmount}</td>
                <td className="border p-2 text-center">
                  {" "}
                  <div>{item.sgstAmount === 0 ? "-" : item.sgstAmount}</div>
                  <div>
                    {item.sgstRate === 0 ? "" : `(${item.sgstRate * 100}%)`}
                  </div>
                </td>
                <td className="border p-2 text-center">
                  {" "}
                  <div>{item.cgstAmount === 0 ? "-" : item.cgstAmount}</div>
                  <div>
                    {item.cgstRate === 0 ? "" : `(${item.cgstRate * 100}%)`}
                  </div>
                </td>
                <td className="border p-2 text-center">
                  {" "}
                  <div>{item.igstAmount === 0 ? "-" : item.igstAmount}</div>
                  <div>
                    {item.igstRate === 0 ? "" : `(${item.igstRate * 100}%)`}
                  </div>
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
          <p className="text-sm">Prepared By: {formData?.preparedBy?.name}</p>
          <p className="text-sm">Date: {formData?.preparedBy?.createdAt}</p>
          {formData?.reviewedBy && formData?.reviewedBy.length > 0 && (
            <p className="text-sm">
              Reviewed By:{" "}
              {formData?.reviewedBy.map((reviewer, index) => (
                <span key={index}>
                  {reviewer.displayName}
                  {index < formData?.reviewedBy.length - 1 && ", "}{" "}
                  {/* Add comma except for the last name */}
                </span>
              ))}
            </p>
          )}
          {/* <p className="text-sm">
            Reviewed By:{" "}
            {formData.selectedReviewers
              .map((reviewer) => reviewer.displayName)
              .join(", ")}
          </p> */}
        </div>
        <div className="text-right">
          <p className="text-sm">Current Charges: {currentCharges}</p>
          <p className="text-sm">
            Amount Received: {formData?.amountReceived || 0}
          </p>
          <p className="text-sm">Current Due: {currentDue}</p>
          <p className="text-sm">
            Previous Dues: {formData?.previousDues || 0}
          </p>
          <p className="font-bold">Total Amount Due in USD {totalAmountDue}</p>
          <p className="text-sm capitalize italic">{amountInWords}</p>
          {formData?.clientId?.invoiceCurrency !== "USD" && (
            <>
              <p className="mt-2 font-bold">
                Total Amount Due in {formData?.clientId?.invoiceCurrency}:{" "}
                {convertedAmount}
              </p>
              <p className="text-sm capitalize italic">
                {convertAmountToWords(
                  convertedAmount,
                  formData?.clientId?.invoiceCurrency
                )}
              </p>
            </>
          )}
        </div>
        <p>signature & seal here</p>
      </div>

      {formData?.status !== "FINALIZED" && (
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={handleAccept}
            className="rounded-md bg-green-500 px-6 py-2 font-semibold text-white hover:bg-green-600"
          >
            Accept
          </button>

          <button
            onClick={handleReject}
            className="rounded-md bg-red-500 px-6 py-2 font-semibold text-white hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewInvoice;
