import { GoArrowRight } from "react-icons/go";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import HeaderComponent from "../components/HeaderComponent";
import ReturnComponent from "../components/ReturnSummaryComponent";
import apiService from "../services/apiService";

function CreateUserPage(){
    const navigate = useNavigate();
    const [user ,setUser] = useContext(UserContext);
    const [form, setForm] = useState({name:"", username: "", password: "" , checkPassword:""});
    
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
            navigate("/");
        }
        if (user.name !== "admin"){
            navigate("/summary");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);
    
    const handleForm = (e) => {
        e.preventDefault();     setForm((prevForm) => ({ ...prevForm, [e.target.id]: e.target.value }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.username || !form.password || !form.name || !form.checkPassword) return alert("Todos os campos devem ser preenchidos");
        if (form.password !== form.checkPassword) return alert ("As senhas não coincidem");
        try {
            const body = {name: form.name, username: form.username, password: form.password};
            const response = await apiService.createUser(user.token, body);
            if (response.status === 200) {
                alert("Usuário criado com sucesso!");
            }
        } catch (error) {
            alert("Ocorreu um erro, tente novamente!");
        } finally {
            setForm({ name:"", username: "", password: "" , checkPassword:""});
        }
    };

    return(
        <PageContainer onSubmit={handleSubmit}>
            <HeaderComponent />
            <FormContainer>
                <SearchBarForm>
                    <input
                        placeholder='Nome'
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={handleForm}
                    />
                </SearchBarForm>
                <SearchBarForm>
                    <input
                        placeholder='Usuário'
                        type="text"
                        id="username"
                        value={form.username}
                        onChange={handleForm}
                    />
                </SearchBarForm>
                <SearchBarForm>
                    <input
                        placeholder='Senha'
                        type="password"
                        id="password"
                        value={form.password}
                        onChange={handleForm}
                    />
                </SearchBarForm>
                <SearchBarForm>
                    <input
                        placeholder='Confirme a senha'
                        type="password"
                        id="checkPassword"
                        value={form.checkPassword}
                        onChange={handleForm}
                    />
                </SearchBarForm>
                <button type="submit">
                    <p>Criar usuário</p>
                    <GoArrowRight size={24} />
                </button>
                <ReturnComponent name={user.name} />
            </FormContainer>
        </PageContainer>
    )
}

export default CreateUserPage;

const PageContainer = styled.div`
    width: 100%;
    flex-direction: column;
    align-items: center;
`


const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
    margin: 3% 15%;
    input {
        width: 100%;
    }
    button {
        padding: 10px 15px;
        justify-content: space-between;
        gap: 20px;
    }
`

const SearchBarForm = styled.div`
    justify-content: flex-start;    
    background-color: #F0F5F9;
    color:#021121;
    border: 0.5px solid #E6E6E6;
    border-radius: 16px;
    display: flex;
    align-items: center;
    padding: 10px;
    width: 725px;
    gap: 15px;
`