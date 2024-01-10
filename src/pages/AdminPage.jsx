import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent';
import { useContext, useEffect, useState } from 'react';
import { GoArrowRight } from "react-icons/go";
import apiService from '../services/apiService';
import { UserContext } from '../contexts/UserContext';
import Logout from '../components/LogoutComponent';

function AdminPage(){
    const [user, setUser] = useContext(UserContext);
    const [form, setForm] = useState({ month: "", employeeId: ""});
    const [data, setData] = useState([]);
    const [employees, setEmployees] = useState([]);
    // [
    //     { id: 1, name: 'João' },
    //     { id: 2, name: 'Maria' },
    //     { id: 3, name: 'Pedro' },
    // ];
    console.log(form);
    console.log(data);
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.month === "") {
            alert ("Selecione o mês desejado.");
            return;
        } else if (form.employeeId === "") {
            alert ("Selecione um funcionário.");
            return;
        } else if (new Date(form.month) > new Date()) {
            alert ("Selecione um mês válido.");
            return;
        } else {
            alert('DATA E NOME OK!');   
            try {
                const response = await apiService.getUserReport(form, user.token);
                if (response.status === 200) {
                    setData(response.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setForm({ month: '', employeeId: '' });
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
            {(form.employeeId && form.month !== "") && (
                <div>
                    <h2>Detalhes do Funcionário:</h2>
                    <p>ID: {form.employeeId}</p>
                </div>
            )}
            <Logout />
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