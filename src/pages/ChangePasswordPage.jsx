import { useState, useContext, useEffect } from "react";
import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent';
import { GoArrowRight } from "react-icons/go";
import apiService from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import ReturnComponent from "../components/ReturnSummaryComponent";

function ChangePassword(){
    const navigate = useNavigate();
    const [user ,setUser] = useContext(UserContext);
    const [form, setForm] = useState({password: "" , checkPassword:""});
    
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);
    
    const handleForm = (e) => {
        e.preventDefault();
        setForm((prevForm) => ({ ...prevForm, [e.target.id]: e.target.value }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.password || !form.checkPassword) return alert("Todos os campos devem ser preenchidos");
        if (form.password !== form.checkPassword) return alert ("As senhas não coincidem");
        try {
            const body = {username: user.username, password: form.password};
            const response = await apiService.changePassword(user.token, body);
            if (response.status === 200) {
                alert("Senha alterada com sucesso!");
            }
        } catch (error) {
            alert("Ocorreu um erro, tente novamente!");
        } finally {
            setForm({password: "" , checkPassword:""});
        }
    };

    return(
        <PageContainer onSubmit={handleSubmit}>
            <HeaderComponent />
            <FormContainer>
                <SearchBarForm>
                    <input
                        placeholder='Nova senha'
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
                    <p>Alterar a senha</p>
                    <GoArrowRight size={24} />
                </button>
                <ReturnComponent name={user.name} />
            </FormContainer>
        </PageContainer>
    )
}

export default ChangePassword;

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