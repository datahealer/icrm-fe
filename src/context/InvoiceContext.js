import React, { createContext, useState, useContext } from "react";

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [createInvoice, setCreateInvoice] = useState(false);
  const [editInvoice, setEditInvoice] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);
  const [idData, setIdData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleAddNewInvoice = () => {
    setCreateInvoice(true);
  };

  const handleEditInvoice = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/invoices/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      setIdData({
        clientId: data.data.invoice.clientId || "",
        projectId: data.data.invoice.projectId || "",
        number: data.data.invoice.number || "",
        poNumber: data.data.invoice.poNumber || "",
        date: data.data.invoice.date || "",
        serviceFromDate: data.data.invoice.serviceFromDate || "",
        serviceToDate: data.data.invoice.serviceToDate || "",
        mileStones: data.data.invoice.mileStones || "",
        dueDate: data.data.invoice.dueDate || "",
        preparedBy: data.data.invoice.preparedBy || "",
        reviewedBy: data.data.invoice.reviewedBy || "",

        services: [
          {
            name: data.data.invoice.services?.[0]?.name || "",
            description: data.data.invoice.services?.[0]?.description || "",
            hours: data.data.invoice.services?.[0]?.hours || "",
            rate: data.data.invoice.services?.[0]?.rate || "",
            mileStone: data.data.invoice.services?.[0]?.mileStone || "",
            discountPercent:
              data.data.invoice.services?.[0]?.discountPercent || "",
            discountAmount:
              data.data.invoice.services?.[0]?.discountAmount || "",
            SAC: data.data.invoice.services?.[0]?.SAC || "998311",
            timeTrackerReportUrl:
              data.data.invoice.services?.[0]?.timeTrackerReportUrl || "",
            taxableAmount: data.data.invoice.services?.[0]?.taxableAmount || "",
            sgstRate: data.data.invoice.services?.[0]?.sgstRate || "Nil",
            sgstAmount: data.data.invoice.services?.[0]?.sgstAmount || "",
            cgstRate: data.data.invoice.services?.[0]?.cgstRate || "Nil",
            cgstAmount: data.data.invoice.services?.[0]?.cgstAmount || "",
            igstRate: data.data.invoice.services?.[0]?.igstRate || "Nil",
            igstAmount: data.data.invoice.services?.[0]?.igstAmount || "",
          },
        ],
        adjustments: data.adjustments || [
          {
            name: data.data.invoice.adjustments?.[0]?.name || "",
            amount: data.data.invoice.adjustments?.[0]?.amount || "",
          },
        ],
        status: data.data.invoice.status || "DRAFT",
        paidAmount: data.data.invoice.paidAmount || "",
        forgivenAmount: data.data.invoice.forgivenAmount || "",
        paidAmountINR: data.data.invoice.paidAmountINR || "",
        forgivenReason: data.data.invoice.forgivenReason || "",
        cancellationReason: data.data.invoice.cancellationReason || "",
      });
      setSelectedId(id);
      setEditInvoice(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClose = () => {
    setCreateInvoice(false);
    setEditInvoice(false);
    setInvoiceId(null);
    setIdData(null);
    setSelectedId(null);
  };

  return (
    <InvoiceContext.Provider value={{ createInvoice, editInvoice, invoiceId, idData, selectedId, handleAddNewInvoice, handleEditInvoice, handleClose }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => useContext(InvoiceContext);
