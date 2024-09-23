import React from 'react';
import PurchaseitemTable from './components/PurchaseitemTable';
import { useAuthContext } from 'hooks/useAuthContext';

const Purchaseitem = () => {

    const { user }=useAuthContext()
    
    return (
        <div className='mt-3 grid'>
            {user && (
            <PurchaseitemTable />
            )}

            {!user && (
                <div className='text-xl'>You Must Login first to view records</div>
            )}
        </div>
    );
}

export default Purchaseitem;
