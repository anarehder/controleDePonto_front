import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent';
import { useState } from 'react';
import { GoArrowRight } from "react-icons/go";

function AdminPage(){
    const [form, setForm] = useState({ month: "", employeeID: ""});
    const employees = [
        { id: 1, name: 'João' },
        { id: 2, name: 'Maria' },
        { id: 3, name: 'Pedro' },
    ];
    console.log(form);

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
        if (form.employeeID === "") {
            alert ("Selecione um funcionário.");
            return;
        }
        if (new Date(form.month) > new Date()) {
            alert ("Selecione um mês válido.");
            return;
        }
        alert('DATA E NOME OK!');        
    };

    return(
        <PageContainer onSubmit={handleSubmit}>
            <HeaderComponent text={"Olá, João"} />
            <MainContainer>
                <InputArea>
                    <h1>Selecione um funcionário:</h1>
                    <select onChange={handleForm} id="employeeID" value={form.employeeID}>
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
            {(form.employeeID && form.month !== "") && (
                <div>
                    <h2>Detalhes do Funcionário:</h2>
                    <p>ID: {form.employeeID}</p>
                </div>
            )}
        </PageContainer>
    )
}

export default AdminPage;

const PageContainer = styled.div`
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`

const MainContainer = styled.form`
    width: 70%;
    display:flex;
    justify-content: space-between;
    align-items: center;
    button {
        height: 70px;
    }
`

const InputArea = styled.form`
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