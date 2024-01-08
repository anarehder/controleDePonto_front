import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent';
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";  
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import apiService from '../services/apiService';

function SummaryPage(){
    const [bank, setBank] = useState({totalHours:'16:30',previousMonthBalance:'+ 10:15', bankHours:'- 16:30'});
    const [workedToday, setWorkedToday] = useState(["08:05","14:10"]);
    //const [workedToday, setWorkedToday] = useState([]);
    const todayDate = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = todayDate.toLocaleDateString('pt-BR', options);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const response = await apiService.getTodayHours();
    //             if (response.status === 200) {
    //                 console.log(response.data);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //             // alert("An error occured, try to reload the page");
    //         }
    //     })()
    // }, []);

    return(
        <PageContainer>
            <HeaderComponent />
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
                        <Link to={'/registry'} >
                            <button>
                                <p>Novo Registro</p>
                                <GoArrowRight size={24} />
                            </button>
                        </Link>
                        <Link to={'/report'} >
                            <button>
                                <p>Relatório Completo</p>
                                <GoArrowRight size={24} />
                            </button>
                        </Link>
                    </div>
                </MainInfo>
            </MainContainer>
            <SummaryReport>
                <h1> Relatório Resumido</h1>
                    <div>
                        <p>Trabalhado hoje</p>
                        <p> 08:00 </p>
                    </div>
                    <div>
                        <h2>Total mês</h2>
                        <p> {bank.totalHours} </p>
                    </div>
                    <div>
                        <h2>Saldo Mês Anterior</h2>
                        <StyledParagraph color={bank.previousMonthBalance.slice(0,1)}> {bank.previousMonthBalance} </StyledParagraph>
                    </div>
                    <div> 
                        <h2>Banco de Horas</h2>
                        <StyledParagraph color={bank.bankHours.slice(0,1)}> {bank.bankHours} </StyledParagraph>
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
color: ${(props) => (props.color === '+' ? '#1C8E09' : props.color === '-' ? '#C91313' : '#021121')}; 
`