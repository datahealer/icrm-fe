import React from 'react';
import AccountTable from './components/AccountTable';
import { useAuthContext } from 'hooks/useAuthContext';

const Accounts = () => {

    const { user }=useAuthContext()
    
    return (
        <div className='mt-3 grid'>
            {user && (
            <AccountTable />
            )}

            {!user && (
                <div className='text-xl'>You Must Login first to view records</div>
            )}
        </div>
    );
}

export default Accounts;
