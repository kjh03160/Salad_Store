import React from 'react'
import  styled from 'styled-components'
import CompletedMenuContainer from '../container/CompletedMenuContainer'
import SoldOutMenuContainer from '../container/SoldOutMenuContainer'
const KitchenSection = styled.div`
width:95%;
height:95vh;
display:flex;
margin:auto;
margin-top:2.5vh;
font-family: 'Do Hyeon', sans-serif;
`
export default function Kitchen() {
    return (
        
        <KitchenSection>
            <CompletedMenuContainer/>
            <SoldOutMenuContainer/>
        </KitchenSection>
        
    )
}
