import React from "react";
import { useAuthContext } from "hooks/useAuthContext";
import InvoiceTable from "./components/InvoiceTable";
import { useInvoiceContext } from "context/InvoiceContext";
import CreateInvoice from "./components/CreateInvoice";
import UpdateInvoice from "./components/UpdateInvoice";

const Invoice = () => {
  const { user } = useAuthContext();
  const { createInvoice, editInvoice, idData } = useInvoiceContext();

  return (
    <div className="mt-3 grid">
      {user && (
        <>
        {createInvoice && <CreateInvoice />}
        {editInvoice && <UpdateInvoice invoiceData={idData} />}
        {!createInvoice && !editInvoice && <InvoiceTable />}
      </>
      )}

      {!user && (
        <div className="text-xl">You Must Login first to view records</div>
      )}
    </div>
  );
};

export default Invoice;
