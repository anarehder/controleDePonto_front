import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent';

function RegistryPage(){

    return(
        <PageContainer>
            <HeaderComponent text={"Olá, João"} />
            <p> New Registry</p>
        </PageContainer>
    )
}

export default RegistryPage;

const PageContainer = styled.div`
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`