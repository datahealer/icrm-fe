import React from 'react';
import { useAuthContext } from 'hooks/useAuthContext';
import PurchaseItemList from './components/PurchaseItemList';

const Item = () => {

    const { user }=useAuthContext()
    
    return (
        <div className='mt-3 grid'>
            {user && (
            <PurchaseItemList />
            )}

            {!user && (
                <div className='text-xl'>You Must Login first to view records</div>
            )}
        </div>
    );
}

export default Item;
