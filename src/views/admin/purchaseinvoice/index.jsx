import React from 'react';
import { useAuthContext } from 'hooks/useAuthContext';
import PurchaseInvoiceList from './components/PurchaseInvoiceList';


const PurchaseInvoice = () => {

    const { user }=useAuthContext()
    
    return (
        <div className='mt-3 grid'>
            {user && (
            <PurchaseInvoiceList />
            )}

            {!user && (
                <div className='text-xl'>You Must Login first to view records</div>
            )}
        </div>
    );
}

export default PurchaseInvoice;
