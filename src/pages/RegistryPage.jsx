import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent';
import { GiEntryDoor } from "react-icons/gi";
import { GiExitDoor } from "react-icons/gi";
import { RxCountdownTimer } from "react-icons/rx";
import { PiCoffeeLight } from "react-icons/pi";
import { GoArrowRight } from "react-icons/go";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReturnComponent from '../components/ReturnSummaryComponent';
import { UserContext } from '../contexts/UserContext';
import apiService from '../services/apiService';
// import apiService from '../services/apiService';

function RegistryPage() {
    const types = ['entry_time', 'pause_time', 'return_time', 'exit_time'];
    const formatted = {entry_time: 'entrada', pause_time:'pausa', return_time:'retorno', exit_time:'saída'};
    const [user] = useContext(UserContext);
    const [form, setForm] = useState({ date: "", time: "" });
    const [selectedType, setSelectedType] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user){
            return navigate("/");
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    const handleForm = (e) => {
        e.preventDefault();
        setForm((prevForm) => ({ ...prevForm, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.date === "" || form.time === "" || selectedType === "") return alert("Todos os campos devem ser preenchidos");
        try {
            const fullDate = new Date(`${form.date}T${form.time}:00`);
            const todayDate = new Date();
            if (fullDate > todayDate) {
                alert("Data inválida!");
                return;
            }
            const body = {"day": form.date, "time": `${form.time}:00`, type: selectedType}
            const [ano, mes, dia] = form.date.split('-');
            const confirm = window.confirm(`Confirme os dados:\nData ${dia}/${mes}/${ano}, Hora: ${form.time}, Tipo: ${formatted[selectedType]}`);
            if (confirm) {
                const response = await apiService.postHours(body, user.token);
                if (response.status === 200) {
                    console.log(response);
                }
            } else {
                console.log('Usuário cancelou. Ação cancelada.');
            }
            setForm({ date: '', time: '' });
            setSelectedType("");
        } catch (error) {
            alert("Data inválida!");
            console.error("Ocorreu um erro:", error.message);
        }
        
    };
    console.log(selectedType);
    const selectType = (type) => {
        selectedType === type ? setSelectedType("") : setSelectedType(type);
    }

    return (
        <PageContainer onSubmit={handleSubmit}>
            <HeaderComponent />
            <MainContainer>
                <h1> Registre aqui seu ponto!</h1>
                <SubContainer>
                    <Categories>
                        <Category type={types[0]} selected={selectedType === types[0] ? "yes" : "no"} onClick={() => selectType(types[0])}>
                            <div>
                                <GiExitDoor size={60} />
                            </div>
                            <p> ENTRADA </p>
                        </Category>
                        <Category type={types[1]} selected={selectedType === types[1] ? "yes" : "no"} onClick={() => selectType(types[1])}>
                            <div>
                                <PiCoffeeLight size={60} />
                            </div>
                            <p> PAUSA </p>
                        </Category>
                        <Category type={types[2]} selected={selectedType === types[2] ? "yes" : "no"} onClick={() => selectType(types[2])}>
                            <div>
                                <RxCountdownTimer size={60} />
                            </div>
                            <p> RETORNO </p>
                        </Category>
                        <Category type={types[3]} selected={selectedType === types[3] ? "yes" : "no"} onClick={() => selectType(types[3])}>
                            <div>
                                <GiEntryDoor size={60} />
                            </div>
                            <p> SAÍDA </p>
                        </Category>
                    </Categories>
                    <InputArea>
                        <h1> Selecione a data e horário </h1>
                        <input
                            placeholder='Horário'
                            type="time"
                            id="time"
                            value={form.time}
                            onChange={handleForm}
                        />
                        <input
                            placeholder='Data'
                            type="date"
                            id="date"
                            value={form.date}
                            onChange={handleForm}
                        />
                        <button type="submit" disabled={form.date === "" || form.time === "" || selectedType === ""}>
                            <p>Registrar ponto</p>
                            <GoArrowRight size={24} />
                        </button>
                    </InputArea>
                </SubContainer>
                <ReturnComponent />
            </MainContainer>
        </PageContainer>
    )
}

export default RegistryPage;

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
    align-items: flex-start;
    gap: 40px;
`

const SubContainer = styled.div`
    align-items: flex-start;
`

const Categories = styled.div`
    flex-wrap: wrap;
    width: 400px;
    gap: 10px;
    justify-content: flex-start;
`

const Category = styled.div`
    flex-direction: column;
    width: 110px;
    height: 110px;
    color: #FFFFFF;
    padding: 20px;
    align-items: flex-start;
    border-radius: 16px;
    background-color: ${(props) => (props.type === 'entry_time' ? '#58B696' : props.type === 'pause_time' ? '#65D5E1' :  props.type === 'return_time' ? '#F5C84B' : '#F87266')}; 
    border: 2px solid ${(props) => (props.selected === 'yes' ? '#021121' : '#FFFFFF')}; 
    div {
        width: 110px;
        justify-content: flex-end;
    }
    p {
        font-size: 22px;
    }
`

const InputArea = styled.form`
    flex-direction: column;
    gap: 50px;
    align-items: center;
    h1{
        font-weight: 400;
        margin-bottom: 20px;
    }
    input{
        margin: 15px 0;
    }
    button{ 
        margin-top: 30px;
    }
`