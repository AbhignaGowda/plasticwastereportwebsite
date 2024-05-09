import React from 'react'
import Header from './_components/header1'

function Provider({children}: {children: React.ReactNode}) {
    return (
        <div>
                <Header />
                <div className='mt-28'>
                {children}
                </div>
                </div>
    )
}

export default Provider