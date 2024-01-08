import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { useContext } from 'react';
import { UserContext } from "../contexts/UserContext";

export default function HeaderComponent() {
    const [user] = useContext(UserContext);

    return (
        <Header>
            {
                user.name ?
                <h1>Olá, {user.name.charAt(0).toUpperCase() + user.name.slice(1)}</h1> :
                <h1>Login</h1>
            }
            
            <img src={logo} alt={"logo"} />
        </Header>
    );
}

const Header = styled.div`
    margin-top: 3%;
    width: 70%;
    border-bottom: 2px solid #E6E6E6;
    padding: 10px 25px;
    display: flex;
    align-items: flex-end;
    justify-content: space-betwwen;
    text-align: center;
    h1{
        font-size: 50px;
        font-weigth: 400;
    }
    img {
        width: 100px;
    }
`