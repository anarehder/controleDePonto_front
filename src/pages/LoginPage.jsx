import { useState, useContext } from "react";
import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent';
import { GoArrowRight } from "react-icons/go";
import { LuUserCircle2 } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import apiService from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function LoginPage(){
    const [form, setForm] = useState({ username: "", password: "" });
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    const handleForm = (e) => {
        e.preventDefault();     setForm((prevForm) => ({ ...prevForm, [e.target.id]: e.target.value }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.username || !form.password) return alert("Todos os campos devem ser preenchidos");
        try {
            const response = await apiService.signIn(form)
            if (response.status === 200) {
                const { id, name, token } = response.data;
                const userData = {
                    id,
                    token: `Bearer ${token}`,
                    name,
                };
                localStorage.setItem("user", JSON.stringify({id, token: `Bearer ${token}`, name}));
                setUser(userData);
                if (userData.name === "admin" ){
                    navigate("/adminsummary");
                } else {
                    navigate('/summary');
                }
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 401 || error.response.status === 400 ) alert("Incorrect email or password, please try again.")
        } finally {
            setForm({ username: '', password: '' });
        }
    };

    return (
        <PageContainer onSubmit={handleSubmit}>
            <HeaderComponent/>
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
    align-items: center;
    gap: 25px;
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
        width: 270px;
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