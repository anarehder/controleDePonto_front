import styled from 'styled-components';
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

export default function ReturnComponent() {

    return (
        <Link to={'/summary'} >
            <ReturnButton>
                Voltar ao menu principal
                <GoArrowRight size={24} />
            </ReturnButton>
        </Link>
    );
}

const ReturnButton = styled.button`
    width: 300px;
`

