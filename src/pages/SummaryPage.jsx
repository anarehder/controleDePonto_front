import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent';
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";  
import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import apiService from '../services/apiService';
import Logout from '../components/LogoutComponent';

function SummaryPage(){
    const [user] = useContext(UserContext);
    const [data, setData] = useState([]);
    const [workedToday, setWorkedToday] = useState("");
    const [workedTodayHours, setWorkedTodayHours] = useState("00:00");

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
                if (user.name === "admin"){
                    navigate("/adminsummary");
                }
                const day = dateForApi();
                const response = await apiService.getTodayHours(user.token, day);
                if (response.status === 200) {
                    setData(response.data);
                    setWorkedToday(response.data.hourControls)
                    calculateTodayWorkedHours(response.data.hourControls);
                }
            } catch (error) {
                const userLocal = localStorage.getItem("user");
                if (!userLocal) {
                    return navigate("/");
                }
                alert("Ocorreu um erro, tente novamente");
            }
        })()
    }, []);
    
    function calculateTodayWorkedHours(hourControlsData) {
        let totalMinutes = 0;
        hourControlsData.forEach(item => {
            const horaMinuto = item.totalWorkedByDay.slice(11, 16); // Extrai apenas a hora e o minuto
            const [horas, minutos] = horaMinuto.split(":").map(Number); // Separa as horas e os minutos
            totalMinutes += horas * 60 + minutos; // Converte as horas para minutos e soma os minuto
        });
        
        const hours = Math.floor(totalMinutes / 60).toString().padStart(2, '0'); // Calcula as horas totais
        const minutes = (totalMinutes % 60).toString().padStart(2, '0'); // Calcula os minutos restantes
        setWorkedTodayHours(`${hours}:${minutes}`)
    }

    function dateForApi() {
        const year = todayDate.getFullYear();
        const month = String(todayDate.getMonth() + 1).padStart(2, '0');
        const day = String(todayDate.getDate()).padStart(2, '0');
        const date = `${year}-${month}-${day}`; 
        return date;   
    }

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
                        <FaRegClock size={40} />
                        {workedToday.length === 0 &&
                            <Registry>Ainda não há registros de hoje</Registry>}
                        {workedToday.length !== 0 &&
                            <ul>
                                {workedToday.map((item, index) => (
                                    <div key={index}>
                                        {item.entry_time && <li><Registry>{item.entry_time.slice(11, 16)}</Registry></li>}
                                        {item.exit_time && <li><Registry>{item.exit_time.slice(11, 16)}</Registry></li>}
                                    </div>
                                ))}
                            </ul>
                        }
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
                        <Link to={'/password'} >
                            <button>
                                <p>Alterar senha</p>
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
                        <p> {workedTodayHours} </p>
                    </div>
                    <div>
                        <h3>*calculado sempre que o turno estiver completo</h3>
                    </div>
                    <div>
                        <p>Total mês</p>
                        <p> {data.bankHours ? data.bankHours.workedHoursByMonth : "00:00"} </p>
                    </div>
                    <div>
                        <h3>*não considerados dias não finalizados</h3>
                    </div>
                    <div>
                        <p>Saldo Mês Anterior</p>
                        <StyledParagraph color={data.bankBalanceLastMonth ? data.bankBalanceLastMonth.hoursBankBalance.slice(0,1) : "0"}> {data.bankBalanceLastMonth ? data.bankBalanceLastMonth.hoursBankBalance : "00:00"} </StyledParagraph>
                    </div>
                    <div> 
                        <p>Banco de Horas</p>
                        <StyledParagraph color={data.bankHours ? data.bankHours.hoursBankBalance.slice(0,1) : "0"}> {data.bankHours ? data.bankHours.hoursBankBalance : "00:00"} </StyledParagraph>
                    </div>
            </SummaryReport>
            <Logout />
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
    @media (max-width: 900px) {
        flex-wrap: wrap;
        justify-content: center;
    }
`

const MainInfo = styled.div`
    flex-direction: column;
    gap: 25px;
    flex-wrap: wrap;
    div {
        justify-content: flex-start;
        align-items: center;
        gap: 15px;
        font-size: 20px;

    }
    ul {
        border: 2px solid rgba(2, 17, 33, 0.25);
        border-radius: 20px;
        width: 230px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    button {
        max-width: 280px;
        gap: 15px;
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
    flex-direction: column;
    background-color: #F0F5F9;
    border-radius: 16px;
    padding: 20px;
    margin-top: 15px;
    div {
        align-items: center;
    }
    h1,h2 {
        margin-top: 0;
    }
    p {
        margin-top: 20px;
    }
    h3 {
        font-style: italic;
        font-size: 13px;
        margin-top: 5px;
    }
`

const StyledParagraph = styled.p`
color: ${(props) => (props.color === '+' ? '#1C8E09' : props.color === '-' ? '#C91313' : '#021121')}; 
`