import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent';
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";  
import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import apiService from '../services/apiService';

function SummaryPage(){
    const [user] = useContext(UserContext);
    const [data, setData] = useState([]);
    const [workedToday, setWorkedToday] = useState([]);

    const todayDate = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = todayDate.toLocaleDateString('pt-BR', options);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const userLocal = localStorage.getItem("user");
                if (!userLocal) {
                    return navigate("/");
                }
                const day = dateForApi();
                const response = await apiService.getTodayHours(user.token, day);
                if (response.status === 200) {
                    setData(response.data);
                    if (response.data.hourControls){
                        const formattedTime = {};
                        Object.keys(response.data.hourControls).forEach(propriedade => {
                            if (propriedade.slice(-4) === 'time' && response.data.hourControls[propriedade]) {
                                formattedTime[propriedade] = response.data.hourControls[propriedade].slice(11, 16);
                            }
                        });
                        setWorkedToday(formattedTime);
                    }
                }
            } catch (error) {
                console.log(error);
                alert("An error occured, try to reload the page");
            }
        })()
    }, []);

    function dateForApi() {
        const year = todayDate.getFullYear();
        const month = String(todayDate.getMonth() + 1).padStart(2, '0');
        const day = String(todayDate.getDate()).padStart(2, '0');
        const date = `${year}-${month}-${day}`; 
        return date;   
    }
    console.log(data);
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
                        {workedToday.length === 0 &&
                        <Registry>Ainda não há registros de hoje</Registry>}
                        <ul>
                            {workedToday.entry_time && <Registry> {workedToday.entry_time} </Registry>}
                            {workedToday.pause_time && <Registry> {workedToday.pause_time} </Registry>}
                            {workedToday.return_time && <Registry> {workedToday.return_time} </Registry>}
                            {workedToday.exit_time && <Registry> {workedToday.exit_time} </Registry>}
                        </ul>
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
                        {/* <p> {data.hourControls.day ? data.hourControls.day : "00:00"} </p> */}
                    </div>
                    <div>
                        <h2>Total mês</h2>
                        <p> {data.bankHours ? data.bankHours : "00:00"} </p>
                    </div>
                    <div>
                        <h2>Saldo Mês Anterior</h2>
                        <StyledParagraph color={data.bankBalanceLastMonth ? data.bankBalanceLastMonth.hoursBankBalance.slice(0,1) : "0"}> {data.bankBalanceLastMonth ? data.bankBalanceLastMonth.hoursBankBalance : "00:00"} </StyledParagraph>
                    </div>
                    <div> 
                        <h2>Banco de Horas</h2>
                        <StyledParagraph color={data.bankHours ? data.bankHours.slice(0,1) : "0"}> {data.bankHours ? data.bankHours : "00:00"} </StyledParagraph>
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