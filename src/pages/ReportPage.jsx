import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent';
import { GoArrowRight } from "react-icons/go";
import { useState } from 'react';

function ReportPage(){
    const todayDate = new Date();
    const [form, setForm] = useState({ month: ""});

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
        if (form.month.slice(-2) > todayDate.getMonth()+1) {
            alert ("Selecione um mês válido.");
            return;
        }
        alert(form.month);        
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
    flex-direction: column;
    width: 300px;
    gap: 50px;
    align-items: center;
    button{ 
        margin-top: 30px;
        gap: 15px;
    }
`