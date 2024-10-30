
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Discovery } from '../features/discovery'
import { Navigation } from '../components/Navigation/Navigation'

import './LayoutPage.css'

export const LayoutPage: React.FC = () => {
    return (
        <div className='layout-page'>
            <div className='layout-layout'>
                <div className="layout-navigation-section">
                    <Navigation />
                </div>
                <div className="layout-content-section">
                    <Outlet />
                </div>
                <div className="layout-info-section">
                    <Discovery />
                </div>
            </div>
        </div>
    )
}
