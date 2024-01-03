import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent';
import { GiEntryDoor } from "react-icons/gi";
import { GiExitDoor } from "react-icons/gi";
import { RxCountdownTimer } from "react-icons/rx";
import { PiCoffeeLight } from "react-icons/pi";
import { GoArrowRight } from "react-icons/go";
import { useState } from "react";

function RegistryPage() {
    const todayDate = new Date();
    const types = ['entry', 'pause', 'return', 'exit'];
    const [form, setForm] = useState({ date: "", time: "" });

    const handleForm = (e) => {
        e.preventDefault();
        setForm((prevForm) => ({ ...prevForm, [e.target.id]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.date === "" || form.time === "") return alert("Todos os campos devem ser preenchidos");
        console.log(form);
        try {
            const fullDate = new Date(`${form.date}T${form.time}:00`);
            if (fullDate > todayDate) {
                alert("Data inválida!");
                return;
            }
            const ISODate = fullDate.toISOString();
            const [ano, mes, dia] = form.date.split('-');
            const confirm = window.confirm(`Confirme os dados:\nData ${dia}/${mes}/${ano} e Hora: ${form.time}`);
            if (confirm) {
                console.log('Usuário confirmou. Prossiga com a ação.', ISODate);
            } else {
                console.log('Usuário cancelou. Ação cancelada.');
            }
            setForm({ date: '', time: '' });
        } catch (error) {
            alert("Data inválida!");
            console.error("Ocorreu um erro:", error.message);
        }
        
    };

    return (
        <PageContainer onSubmit={handleSubmit}>
            <HeaderComponent text={"Olá, João"} />
            <MainContainer>
                <h1> Registre aqui seu ponto!</h1>
                <SubContainer>
                    <Categories>
                        <Category type={types[0]}>
                            <div>
                                <GiExitDoor size={60} />
                            </div>
                            <p> ENTRADA </p>
                        </Category>
                        <Category type={types[1]}>
                            <div>
                                <PiCoffeeLight size={60} />
                            </div>
                            <p> PAUSA </p>
                        </Category>
                        <Category type={types[2]}>
                            <div>
                                <RxCountdownTimer size={60} />
                            </div>
                            <p> RETORNO </p>
                        </Category>
                        <Category type={types[3]}>
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
                        <button type="submit" disabled={form.date === "" || form.time === ""}>
                            <p>Registrar ponto</p>
                            <GoArrowRight size={24} />
                        </button>
                    </InputArea>
                </SubContainer>
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
    background-color: ${(props) => (props.type === 'entry' ? '#58B696' : props.type === 'pause' ? '#65D5E1' :  props.type === 'return' ? '#F5C84B' : '#F87266')}; 
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