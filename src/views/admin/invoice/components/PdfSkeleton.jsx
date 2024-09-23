import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { MdOutlineQrCode2 } from "react-icons/md";
import Spinner from "views/admin/client/components/Spinner";

export default function PdfSkeleton({ onPrintComplete, data }) {
  const componentRef = useRef();
  const [readyToPrint, setReadyToPrint] = useState(false);

  useEffect(() => {
    if (data) {
      console.log("Pdf Skeleton", data);
      setReadyToPrint(true);
    }
  }, [data]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      if (onPrintComplete) {
        onPrintComplete(true);
      }
      setReadyToPrint(false);
    },
  });

  if (!data) {
    return <Spinner />;
  }

  const writeDate = (dateString) => {
    if (!dateString) return null; // Return null if dateString is empty or null
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div
        ref={componentRef}
        className="mx-auto my-6 max-w-3xl rounded bg-white p-6 shadow-sm"
        id="invoice"
      >
        <h1 className="flex justify-center text-xl font-bold">Tax Invoice</h1>

        {/* Client info */}
        <div className="mt-8">
          <table className="min-w-full ">
            <tbody>
              {/* First Row */}
              <tr className="border-b border-gray-200 ">
                <td className="p-4 text-left text-sm font-normal text-gray-700">
                  <h1 className="text-3xl font-bold">{data.companyName}</h1>
                  <p className="text-gray-500">
                    {data.companyAddress}
                    <br />
                    {/* B-111, Sector 65, Noida, India, 201301 */}
                  </p>
                  <p className="text-gray-500">{data.companyGSTIN}</p>
                </td>
                <td className="border-l border-gray-200 p-4 text-right text-sm font-normal text-gray-700">
                  <p>
                    Invoice number:
                    <span className="px-2 text-gray-500">
                      {data.invoiceNumber}
                    </span>
                  </p>
                  <p>
                    Invoice date:
                    <span className="px-2 text-gray-500">
                      {data.invoiceDate}
                    </span>
                    <br />
                    Due date:
                    <span className="px-2 text-gray-500">{data.dueDate}</span>
                  </p>
                </td>
              </tr>
              {/* Second Row */}
              <tr className="border-b border-gray-200">
                <td className="p-4 text-left text-sm font-normal text-gray-700">
                  <p className="text-gray-500">
                    <div>{data.billedTo.businessName}</div>

                    {data.billedTo.placeOfSupply}
                  </p>
                  <p className="text-gray-500">{data.billedTo.email}</p>
                </td>
                <td className="border-l border-gray-200 p-4 text-right text-sm font-normal text-gray-700">
                  <MdOutlineQrCode2 className="ml-60 text-6xl" />
                </td>
              </tr>
              {/* Third Row */}
              <tr>
                <td className="p-4 text-left text-sm font-normal text-gray-700">
                  <p className="text-gray-500">
                    Project: {data.projectName}
                    <br />
                    Service Period: {data.servicePeriod}
                  </p>
                  <p className="text-gray-500">Milestones: {data.milestones}</p>
                  <p className="text-sm text-gray-400">
                    (whichever of the above is applicable)
                  </p>
                </td>
                <td className="border-l border-gray-200 p-4 text-right text-sm font-normal text-gray-700">
                  <p>PO# : {data.poNumber}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Invoice Items */}
        <div className="flow-root">
          <div className="mt-2 flex flex-col">
            <table className="divide-slate-200 min-w-full divide-y border border-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="text-slate-700 border-r border-gray-200 py-3.5 pl-6 pr-3 text-left text-sm font-normal"
                  >
                    Services
                  </th>
                  <th
                    scope="col"
                    className="text-slate-700 hidden border-r border-gray-200 py-3.5 px-3 text-right text-sm font-normal sm:table-cell"
                  >
                    SAC
                  </th>
                  <th
                    scope="col"
                    className="text-slate-700 hidden border-r border-gray-200 py-3.5 px-3 text-right text-sm font-normal sm:table-cell"
                  >
                    Hrs
                  </th>
                  <th
                    scope="col"
                    className="text-slate-700 border-r border-gray-200 py-3.5 px-3 text-right text-sm font-normal"
                  >
                    Rate
                  </th>
                  <th
                    scope="col"
                    className="text-slate-700 border-r border-gray-200 py-3.5 px-3 text-right text-sm font-normal"
                  >
                    Dis.
                  </th>
                  <th
                    scope="col"
                    className="text-slate-700 border-r border-gray-200 py-1 px-2 text-center text-sm font-normal"
                  >
                    Taxable
                    <br /> Value
                  </th>
                  <th
                    scope="col"
                    className="text-slate-700 border-r border-gray-200 py-3.5 px-3 text-right text-sm font-normal"
                  >
                    SGST
                  </th>
                  <th
                    scope="col"
                    className="text-slate-700 border-r border-gray-200 py-3.5 px-3 text-right text-sm font-normal"
                  >
                    CGST
                  </th>
                  <th
                    scope="col"
                    className="text-slate-700 border-r border-gray-200 py-3.5 px-3 text-right text-sm font-normal"
                  >
                    IGST
                  </th>
                  <th
                    scope="col"
                    className="text-slate-700 py-3.5 px-3 text-right text-sm font-normal"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.services.map((service, index) => (
                  <tr key={index} className="border-slate-200 border-b">
                    <td className="border-r border-gray-200 py-4 pl-6 pr-3 text-sm">
                      <div className="text-slate-700 font-medium">
                        {service.name}
                      </div>
                      <div className="text-slate-500 mt-0.5 sm:hidden">
                        1 unit at ${service.rate}
                      </div>
                    </td>
                    <td className="text-slate-500 hidden border-r border-gray-200 px-3 py-4 text-right text-sm sm:table-cell">
                      {service.SAC}
                    </td>
                    <td className="text-slate-500 hidden border-r border-gray-200 px-3 py-4 text-right text-sm sm:table-cell">
                      {service.hours}
                    </td>
                    <td className="text-slate-500 hidden border-r border-gray-200 px-3 py-4 text-right text-sm sm:table-cell">
                      ${service.rate}
                    </td>
                    <td className="text-slate-500 border-r border-gray-200 py-4 px-3 text-right text-sm">
                      ${service.discount}
                    </td>
                    <td className="text-slate-500 border-r border-gray-200 py-4 px-3 text-right text-sm">
                      ${service.taxableValue}
                    </td>
                    <td className="text-slate-500 border-r border-gray-200 py-4 px-3 text-right text-sm">
                      ${service.sgst}
                    </td>
                    <td className="text-slate-500 border-r border-gray-200 py-4 px-3 text-right text-sm">
                      ${service.cgst}
                    </td>
                    <td className="text-slate-500 border-r border-gray-200 py-4 px-3 text-right text-sm">
                      ${service.igst}
                    </td>
                    <td className="text-slate-500 border-r border-gray-200 py-4 px-3 text-right text-sm">
                      ${service.amount}
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* Invoice Total */}
              <tfoot>
                <tr className="border-slate-200 border-b">
                  <td
                    colSpan="8"
                    className="border-r border-gray-200 py-2 px-6 text-right font-semibold text-gray-800"
                  >
                    Subtotal:
                  </td>
                  <td
                    colSpan="4"
                    className="py-2 px-6 text-right text-gray-500"
                  >
                    ${data.totalAmountDueUSD.toFixed(2)}
                  </td>
                </tr>
                <tr className="border-slate-200 border-b">
                  <td
                    colSpan="1"
                    className="border-r py-2 text-center text-gray-500"
                  >
                    Prepared By
                  </td>
                  <td
                    colSpan="4"
                    className="border-r py-2 text-center text-gray-500"
                  >
                    {data.preparedBy} on
                    <br /> {writeDate(data.preparedByDate)}
                  </td>
                  <td
                    colSpan="3"
                    className="border-r border-gray-200 py-2 px-6 text-right font-semibold text-gray-800"
                  >
                    Tax:
                  </td>
                  <td
                    colSpan="4"
                    className="py-2 px-6 text-right text-gray-500"
                  >
                    ${data.totalAmountDueUSD.toFixed(2)}
                  </td>
                </tr>
                <tr className="border-slate-200 border-b">
                  <td
                    colSpan="1"
                    className="border-r py-2 px-1 text-center text-gray-500"
                  >
                    Reviewed&nbsp;By
                  </td>
                  <td
                    colSpan="4"
                    className="border-r py-2 text-center text-gray-500"
                  >
                    {data.reviewedBy}
                  </td>
                  <td
                    colSpan="3"
                    className="border-r border-gray-200 py-2 px-6 text-right font-semibold text-gray-800"
                  >
                    Tax:
                  </td>
                  <td
                    colSpan="4"
                    className="py-2 px-6 text-right text-gray-500"
                  >
                    ${data.totalAmountDueUSD.toFixed(2)}
                  </td>
                </tr>
                <tr className="border-slate-200 border-b">
                  <td
                    colSpan="8"
                    className="border-r border-gray-200 py-2 px-6 text-right font-semibold text-gray-800"
                  >
                    Total:
                  </td>
                  <td
                    colSpan="4"
                    className="py-2 px-6 text-right text-gray-500"
                  >
                    ${data.totalAmountDueUSD.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="8"
                    className="border-r border-gray-200 py-2 px-6 text-right font-semibold text-gray-800"
                  >
                    Due balance:
                  </td>
                  <td
                    colSpan="4"
                    className="py-4 px-6 text-right text-gray-500"
                  >
                    ${data.totalAmountDueUSD.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
            <h1 className="my-2 mx-6">Signature</h1>
          </div>
        </div>
      </div>
      {readyToPrint && (
        <button
          onClick={handlePrint}
          className="mx-auto mb-2 block w-auto rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Print Invoice
        </button>
      )}
    </>
  );
}
