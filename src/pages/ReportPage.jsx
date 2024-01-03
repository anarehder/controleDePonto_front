import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent';
import { GoArrowRight } from "react-icons/go";
import { useState } from 'react';

function ReportPage(){
    const todayDate = new Date();
    const [form, setForm] = useState({ month: ""});
    //const [data, setData] = useState([]);
    const [data, setData] = useState([{data: '01/01/2023', entrada: '08:00', pausa: '12:00', retorno:'14:00', saida:'18:00', horasDia:'8:00' },
                                    {data: '02/01/2023', entrada: '08:00', pausa: '12:00', retorno:'14:00', saida:'18:00', horasDia:'8:00' }])
    const handleForm = (e) => {
        e.preventDefault();
        setForm((prevForm) => ({ ...prevForm, [e.target.id]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.month === "") {
            alert ("Selecione o mês desejado.");
            return;
        }
        if (new Date(form.month) > new Date()) {
            alert ("Selecione um mês válido.");
            return;
        }
        alert('DATA VALIDA');        
    };

    return(
        <PageContainer onSubmit={handleSubmit}>
            <HeaderComponent text={"Olá, João"} />
            <MainContainer>
                <h1> Selecione um mês</h1>
                <InputArea>
                        <input
                            placeholder='Mês'
                            type="month"
                            id="month"
                            value={form.month}
                            onChange={handleForm}
                        />
                        <button type="submit">
                            <p>Exibir dados</p>
                            <GoArrowRight size={24} />
                        </button>
                </InputArea>
                { data.length !== 0 && 
                    <DataArea>
                        <TableHeader>
                            <h1>Dia</h1>
                            <h1>Entrada</h1>
                            <h1>Pausa</h1>
                            <h1>Retorno</h1>
                            <h1>Saída</h1>
                            <h1>Horas/Dia</h1>
                        </TableHeader>
                        <Daily>
                        {data.map((d,i)=> (
                            <div key={i}>
                                <h2>
                                    {d.data.slice(0, 2)}
                                </h2>
                                <h2>
                                    {d.entrada}
                                </h2>
                                <h2>
                                    {d.pausa}
                                </h2>
                                <h2>
                                    {d.retorno}
                                </h2>
                                <h2>
                                    {d.saida}
                                </h2>
                                <h2>
                                    {d.horasDia}
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
                                    16:30
                                </h2>
                            </div>
                            <div>
                                <h1>
                                    Saldo Mês Anterior
                                </h1>
                                <h2>
                                    + 10:15
                                </h2>
                            </div>
                            <div>
                                <h1>
                                    Banco de Horas
                                </h1>
                                <h2>
                                    16:30
                                </h2>
                            </div>
                        </TableFooter>
                    </DataArea>
                }
            </MainContainer>
        </PageContainer>
    )
}

export default ReportPage;

const PageContainer = styled.div`
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`

const MainContainer = styled.div`
    width: 70%;
    flex-direction: column;
    justify-content: flex-start;
    gap: 40px;
`

const InputArea = styled.form`
    display: flex;
    width: 500px;
    gap: 50px;
    align-items: center;
    button{ 
        gap: 15px;
        width: 300px;
    }
`

const DataArea = styled.div`
    flex-direction: column;
    justify-content: center;
    gap: 20px; 
    border-radius: 24px;
    background-color:#F0F5F9;
    margin-bottom: 25px;
    h2 {
        font-weight: 400;
        font-size: 25px;
        width: 125px;
    }
    h1 {
        width: 125px;
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
    margin: 0 10px;
    padding: 10px;
    gap: 25px;
    text-align: center;
`

const TableFooter = styled.div`
    margin: 0 10px;
    padding: 10px;
    border-top: 2px solid #E6E6E6;
    div {
        text-align: center;
        align-items: center;
        gap: 20px;
    }
`
