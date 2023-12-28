import styled from 'styled-components';
import logo from '../assets/logo.svg';

export default function HeaderComponent(text) {

    return (
        <Header>
            <h1>{text}</h1>
            <img src={logo} alt={"logo"} />
        </Header>
    );
}

const Header = styled.div`
    border-bottom: 2px solid gray;
    padding: 10px 25px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    img {
        width: 125px;
    }
`