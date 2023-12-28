import styled from 'styled-components'

function App() {

  return (
    <AppContainer>
      <p>
        TESTE ACCERTE
      </p>
    </AppContainer >
  )
}

export default App

const AppContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: calc(100vw - 15px);
  padding: 10px;
`