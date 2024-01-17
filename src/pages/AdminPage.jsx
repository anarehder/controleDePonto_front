import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent';
import { useContext, useEffect, useState } from 'react';
import { GoArrowRight } from "react-icons/go";
import apiService from '../services/apiService';
import { UserContext } from '../contexts/UserContext';
import Logout from '../components/LogoutComponent';
import ExportToExcel from '../services/ExportToExcel';
import ReturnComponent from '../components/ReturnSummaryComponent';

function AdminPage(){
    const [user, setUser] = useContext(UserContext);
    const [form, setForm] = useState({ month: "", employeeId: 0});
    const [data, setData] = useState([]);
    const [hours, setHours] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [employeeInfo, setEmployeeInfo] = useState({ month: "", name: ""});

    useEffect(() => {
        (async () => {
            try {
                const response = await apiService.getUsers(user.token)
                if (response.status === 200) {
                    setEmployees(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);

    const handleForm = (e) => {
        e.preventDefault();
        setForm((prevForm) => ({ ...prevForm, [e.target.id]: e.target.value }));
        setData([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.month === "") {
            alert ("Selecione o mês desejado.");
            return;
        } else if (form.employeeId === 0) {
            alert ("Selecione um funcionário.");
            return;
        } else if (new Date(form.month) > new Date()) {
            alert ("Selecione um mês válido.");
            return;
        } else {
            try {
                form.employeeId = Number(form.employeeId);
                const findEmployee = employees.find(e => e.id === form.employeeId);
                setEmployeeInfo({name: findEmployee.name, month:form.month});
                const response = await apiService.getUserReport(user.token, form);
                if (response.status === 200) {
                    setData(response.data);
                    setHours(response.data.hourControls);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return(
        <PageContainer onSubmit={handleSubmit}>
            <HeaderComponent text={"Olá, João"} />
            <MainContainer>
                <InputArea>
                    <h1>Selecione um funcionário:</h1>
                    <select onChange={handleForm} id="employeeId" value={form.employeeId}>
                        <option value="">Nome do Funcionário</option>
                        {employees.map(employee => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
                            </option>
                        ))}
                    </select>
                </InputArea>
                <InputArea>
                    <h1> Selecione um mês</h1>
                    <input
                        placeholder='Mês'
                        type="month"
                        id="month"
                        value={form.month}
                        onChange={handleForm}
                    />
                </InputArea>
                <button type="submit">
                    <p>Exibir dados</p>
                    <GoArrowRight size={24} />
                </button>   
            </MainContainer>
            {data.length !== 0 ?
                <DataArea>
                    <TableHeader>
                        <h1>Data</h1>
                        <h1>Entrada</h1>
                        <h1>Pausa</h1>
                        <h1>Retorno</h1>
                        <h1>Saída</h1>
                        <h1>Horas/Dia</h1>
                    </TableHeader>
                    <Daily>
                        {hours.map((d, i) => (
                            <div key={i}>
                                <h2>
                                    {d.day && `${today.slice(8,10)}-${today.slice(5,7)}-${today.slice(0,4)}`}
                                </h2>
                                <h2>
                                    {d.entry_time ? d.entry_time.slice(11, 16) : "-"}
                                </h2>
                                <h2>
                                    {d.pause_time ? d.pause_time.slice(11, 16) : "-"}
                                </h2>
                                <h2>
                                    {d.return_time ? d.return_time.slice(11, 16) : "-"}
                                </h2>
                                <h2>
                                    {d.exit_time ? d.exit_time.slice(11, 16) : "-"}
                                </h2>
                                <h2>
                                    {d?.totalWorkedByDay.slice(11, 16)}
                                </h2>
                            </div>
                        ))}
                    </Daily>
                    <TableFooter>
                        <div>
                            <h1>
                                Total Horas no Mês
                            </h1>
                            <h2>
                                {data.bankHours?.workedHoursByMonth ? data.bankHours.workedHoursByMonth : "00:00"}
                            </h2>
                        </div>
                        <div>
                            <h1>
                                Saldo Horas no Mês

                            </h1>

                            <StyledParagraph color={data?.bankHours?.totalHoursByMonth.slice(0, 1)}>
                                {data.bankHours?.totalHoursByMonth ? data.bankHours.totalHoursByMonth : "00:00"}
                            </StyledParagraph>

                        </div>
                        <div>
                            <h1>
                                Saldo Mês Anterior
                            </h1>
                            <StyledParagraph color={data?.bankBalanceLastMonth?.hoursBankBalance.slice(0, 1)}>
                                {data?.bankBalanceLastMonth?.hoursBankBalance}
                            </StyledParagraph>
                        </div>
                        <div>
                            <h1>
                                Banco de Horas
                            </h1>
                            <StyledParagraph color={data?.bankHours?.hoursBankBalance.slice(0, 1)}>
                                {data.bankHours?.hoursBankBalance ? data.bankHours.hoursBankBalance : "00:00"}
                            </StyledParagraph>
                        </div>

                    </TableFooter>
                    <h3>
                        *o saldo do mês é calculado considerando as 176 horas de cada mês que devem ser cumpridas ( Saldo Mês = Total Horas no Mês - 176 ).
                    </h3>
                    <h3>
                        *o banco de horas considera o saldo do mês anterios e o saldo do mês atual ( Banco de Horas = Saldo Mês Atual + Saldo Mês Anterior ).
                    </h3>
                </DataArea>
                :
                <AlertView> Selecione os dados para visualizar </AlertView>
            }
            {data !== 0 && <ExportToExcel name={employeeInfo.name} month={employeeInfo.month} data={data} />}
            <Logout />
            <ReturnComponent name={user.name} />
        </PageContainer>
    )
}

export default AdminPage;

const PageContainer = styled.div`
width: 100%;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 20px;
margin-bottom: 30px;
`

const MainContainer = styled.form`
    width: 70%;
    display:flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    button {
        height: 70px;
    }
`

const InputArea = styled.div`
    flex-direction: column;
    width: 500px;
    height: 115px;
    align-items: center;
    select {
        width: 80%;
        margin-top: 25px;
    }
    input {
        width: 70%;
        margin-top: 25px;
    }
`

const AlertView = styled.h1`
    margin: 70px;
    background-color: #F0F5F9;
    padding: 15px;
    border-radius: 24px;
`


const DataArea = styled.div`
    flex-direction: column;
    justify-content: center;
    border-radius: 24px;
    background-color:#F0F5F9;
    div {
        margin: 10px 0;
    }
    h2 {
        font-weight: 400;
        font-size: 25px;
        width: 125px;
    }
    h1 {
        width: 125px;
    }
    h3 {
        text-align: center;
        margin: 5px 0;
    }
`

const TableHeader = styled.div`
    margin: 0 10px;
    padding: 10px;
    border-bottom: 2px solid #E6E6E6;
    gap: 25px;
    text-align: center;
`

const Daily = styled.div`
    flex-direction: column;
    justify-content: center;
    margin: 0;
    padding: 10px;
    gap: 25px;
    text-align: center;
`

const TableFooter = styled.div`
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 10px;
    padding: 10px;
    border-top: 2px solid #E6E6E6;
    div {
        padding: 0 25px;
        text-align: center;
        align-items: center;
        gap: 20px;
    }
`

const StyledParagraph = styled.h2`
    color: ${(props) => (props.color === '+' ? '#1C8E09' : props.color === '-' ? '#C91313' : '#021121')}; 
`