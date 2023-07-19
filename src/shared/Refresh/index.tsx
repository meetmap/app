import React from 'react'
import { RefreshControl } from 'react-native'
import styled from 'styled-components'

const Refresh = ({ refreshing, onRefresh }: { refreshing: boolean, onRefresh: () => void }) => {
    return (
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        //     <StyledRefreshContent>
        //         <Logo />
        //     </StyledRefreshContent>
        // </IonRefresher>
    )
}

export default Refresh

const StyledRefreshContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`