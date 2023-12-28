import ImagemInicial from '../assets/imagem-pag1.jpg';
import { GoArrowRight } from "react-icons/go";
import styled from 'styled-components';

function HomePage(){
    return(
        <PageContainer>
            <button> 
                <p>Acessar</p>
                <GoArrowRight  size={24} />
            </button>
        </PageContainer>
    )
}

export default HomePage;

const PageContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    background: url(${ImagemInicial}) center/cover no-repeat;
    button {
        position: absolute;
        width: 12%; 
        top: 82%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        display: flex;
        padding: 10px 15px;
        justify-content: space-between;
      }
`