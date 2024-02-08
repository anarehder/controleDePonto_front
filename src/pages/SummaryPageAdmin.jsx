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
    const [user, setUser] = useContext(UserContext);
    
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
            navigate("/");
        }
        if (user.name !== "admin"){
            navigate("/summary");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);
    
    return(
        <PageContainer>
            <HeaderComponent />
            <MainContainer>
                <Link to={'/excelList'} >
                    <button>
                        <p>Relatório completo por mês</p>
                        <GoArrowRight size={24} />
                    </button>
                </Link>
                <Link to={'/admin'} >
                    <button>
                        <p>Relatório funcionário/mês</p>
                        <GoArrowRight size={24} />
                    </button>
                </Link>
                <Link to={'/createuser'} >
                    <button>
                        <p>Criar usuário</p>
                        <GoArrowRight size={24} />
                    </button>
                </Link>
                <Logout />
            </MainContainer>
        </PageContainer>
    )
}

export default SummaryPageAdmin;

const PageContainer = styled.div`
    width: 100%;
    flex-direction: column;
    align-items: center;
    button {
        height: 65px;
        gap: 20px;
    }
    a {
        height: 65px;
    }
`

const MainContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    margin-top: 40px;
    button {
        margin: 0;
    }
`