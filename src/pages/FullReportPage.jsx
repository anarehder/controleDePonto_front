import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent';
import { GoArrowRight } from "react-icons/go";
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ReturnComponent from '../components/ReturnSummaryComponent';
import apiService from '../services/apiService';
import { UserContext } from '../contexts/UserContext';
import ExportToExcelLists from '../services/ExportToExcelLists';

function FullReportPage(){
    const [user] = useContext(UserContext);
    const [form, setForm] = useState({ month: ""});
    const [data, setData] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const userLocal = localStorage.getItem("user");
        if (!userLocal) {
            return navigate("/");
        }
    }, []);

    const handleForm = (e) => {
        e.preventDefault();
        setForm((prevForm) => ({ ...prevForm, [e.target.id]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.month === "") {
            alert ("Selecione o mês desejado.");
            return;
        } else if (new Date(form.month) > new Date()) {
            alert ("Selecione um mês válido.");
            return;
        } else {
            getMonthData();
        }              
    };

    async function getMonthData(){
        try {
            const body = { month: form.month, employeeId: user.id}
            setCarregando(true);
            const response = await apiService.getFullReport(user.token, body);
            if (response.status === 200) {
                console.log(data);
                setData(response.data);
                setCarregando(false);
            }
        } catch (error) {
            alert("Ocorreu um erro, tente novamente");
            setCarregando(false);
        }
    }

    return(
        <PageContainer onSubmit={handleSubmit}>
            <HeaderComponent />
            <MainContainer>
                <h1> Selecione um mês</h1>
                <div>
                    <InputArea>
                        <input
                            placeholder='Mês'
                            type="month"
                            id="month"
                            value={form.month}
                            onChange={handleForm}
                        />
                        <button type="submit">
                            <p>Carregar dados</p>
                            <GoArrowRight size={24} />
                        </button>
                    </InputArea>
                </div>
                <div>
                    <ReturnComponent name={user.name} />
                    {(form.month !== "" && data.length !== 0) && <ExportToExcelLists data={data} month={form.month} />}
                </div>
            </MainContainer>
        </PageContainer>
    )
}

export default FullReportPage;

const PageContainer = styled.div`
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
`

const MainContainer = styled.div`
    width: 70%;
    flex-direction: column;
    justify-content: flex-start;
    gap: 40px;
    button {
        height: 50px;
    }
`

const InputArea = styled.form`
    display: flex;
    width: 500px;
    gap: 50px;
    align-items: center;
`