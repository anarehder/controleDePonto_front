import { useState } from "react";
import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent';
import { GoArrowRight } from "react-icons/go";
import { LuUserCircle2 } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";

function LoginPage(){
    const [form, setForm] = useState({ username: "", password: "" });
    console.log(form);
    
    const handleForm = (e) => {
        e.preventDefault();
        setForm((prevForm) => ({ ...prevForm, [e.target.id]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.username || !form.password) return alert("Todos os campos devem ser preenchidos");
        setForm({ username: '', password: '' });
    };

    return (
        <PageContainer onSubmit={handleSubmit}>
            <HeaderComponent text={"Login"} />
            <FormContainer>
                <SearchBarForm>
                    <LuUserCircle2 size={30} />
                    <input
                        placeholder='Usuário'
                        type="text"
                        id="username"
                        autoComplete="username"
                        value={form.username}
                        onChange={handleForm}
                    />
                </SearchBarForm>
                <SearchBarForm>
                    <RiLockPasswordLine size={30} />
                    <input
                        placeholder='Senha'
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={form.password}
                        onChange={handleForm}
                    />
                </SearchBarForm>
                <button type="submit">
                    <p>Entrar</p>
                    <GoArrowRight size={24} />
                </button>
            </FormContainer>

        </PageContainer>
    )
}

export default LoginPage;

const PageContainer = styled.div`
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
`

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
    margin: 3% 15%;
    button {
        padding: 10px 15px;
        justify-content: space-between;
        width: 270px;
    }
`

const SearchBarForm = styled.div`
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