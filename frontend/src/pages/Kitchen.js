import React from 'react'
import  styled from 'styled-components'
import CompletedMenuContainer from '../container/CompletedMenuContainer'
import SoldOutMenuContainer from '../container/SoldOutMenuContainer'
const KitchenSection = styled.div`
width:1300px;
height:100vh;
display:flex;
margin:auto;
`
export default function Kitchen() {
    return (
        
        <KitchenSection>
            <CompletedMenuContainer/>
            <SoldOutMenuContainer/>
        </KitchenSection>
        
    )
}
