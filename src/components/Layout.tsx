import React, { PropsWithChildren, Props } from 'react'
import Navbar from './Navbar';

const Layout = (props: PropsWithChildren<unknown>) => {
  return (<>
    <div className='page'>
        <Navbar/>
        <div className='page__wrapper'>
            <div className='page__backdrop' />
            <div className='page__content'>
                {props.children}
            </div>
        </div>
    </div>
    </>)
}

export default Layout;
