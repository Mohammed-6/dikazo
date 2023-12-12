import React, {useEffect, useState} from 'react'

import Header from './header'
import Footer from './footer'

import {indexProp} from '../types/layout'

const Layout = ({children}: indexProp) => {
    return(<>
        <Header />
        {children}
        <Footer />
    </>)
}

export default Layout