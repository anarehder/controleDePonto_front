import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import HeaderComponent from "../components/HeaderComponent";
import Logout from "../components/LogoutComponent";

function SummaryPageAdmin(){
    const navigate = useNavigate();
    const [,setUser] = useContext(UserContext);
    
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);
    
    return(
        <PageContainer>
            <HeaderComponent />
            <div>
                <Link to={'/admin'} >
                    <button>
                        <p>Relatórios funcionários</p>
                        <GoArrowRight size={24} />
                    </button>
                </Link>
                <Link to={'/admin'} >
                    <button>
                        <p>Criar usuário</p>
                        <GoArrowRight size={24} />
                    </button>
                </Link>
                <Logout />
            </div>
            
        </PageContainer>
    )
}

export default SummaryPageAdmin;

const PageContainer = styled.div`
    width: 100%;
    flex-direction: column;
    align-items: center;
    button {
        height: 75px;
        margin: 50px 40px;
    }
`