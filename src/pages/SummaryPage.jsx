import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent';
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";  
import { useState } from "react";

function SummaryPage(){
    const [workedToday, setWorkedToday] = useState(["08:05","14:10"]);
    //const [workedToday, setWorkedToday] = useState([]);
    const todayDate = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = todayDate.toLocaleDateString('pt-BR', options);

    return(
        <PageContainer>
            <HeaderComponent text={"Olá, João"} />
            <MainContainer>
                <div>
                    <FaCalendarAlt size={75}/>
                </div>
                <MainInfo>
                    <h1> Registros de hoje, {formattedDate}</h1>
                    <div>
                        <FaRegClock size={40}/>
                        {workedToday.length === 0 ? 
                        <Registry>Ainda não há registros de hoje</Registry> :
                        <ul>
                        {workedToday.map((hour, i) => (
                        <Registry key={i}>{hour}</Registry>
                        ))}
                        </ul>}
                    </div>
                    <div>
                        <button>
                            <p>Novo Registro</p>
                            <GoArrowRight size={24} />
                        </button>
                        <button>
                            <p>Relatório Completo</p>
                            <GoArrowRight size={24} />
                        </button>
                    </div>
                </MainInfo>
            </MainContainer>
            <SummaryReport>
                <h1> Relatório Resumido</h1>
                    <div>
                        <p>Trabalhado hoje</p>
                        <StyledParagraph color={'positive'}> 08:00 </StyledParagraph>
                    </div>
                    <div>
                        <h2>Total mês</h2>
                        <StyledParagraph color={'negative'}> 08:00 </StyledParagraph>
                    </div>
                    <div> 
                        <h2>Banco de Horas</h2>
                        <StyledParagraph color={'neutral'}> 08:00 </StyledParagraph>
                    </div>
            </SummaryReport>
        </PageContainer>
    )
}

export default SummaryPage;

const PageContainer = styled.div`
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`

const MainContainer = styled.div`
    width: 70%;
    justify-content: flex-start;
    gap: 40px;
`

const MainInfo = styled.div`
    flex-direction: column;
    gap: 25px;
    div {
        justify-content: flex-start;
        align-items: center;
        gap: 15px;
        font-size: 20px;
    }
    ul {
        display: flex;
        flex-direction: row;
    }
    button {
        width: 280px;
    }
`

const Registry = styled.div`
    background-color: #F0F5F9;
    border-radius: 16px;
    padding: 10px 20px;
    margin: 10px;
    font-weight: 600;
`

const SummaryReport = styled.div`
    width: 300px;
    gap: 15px;
    flex-direction: column;
    background-color: #F0F5F9;
    border-radius: 16px;
    padding: 10px 20px;
    margin-top: 15px;
    div {
        align-items: center;
    }
    h1 {
        margin-bottom: 10px;
    }
`

const StyledParagraph = styled.p`
    color: ${(props) => (props.color === 'positive' ? '#1C8E09' : props.color === 'negative' ? '#C91313' : '#021121')}; 
`