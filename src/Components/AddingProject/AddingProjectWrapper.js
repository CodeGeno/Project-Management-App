import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  .app-container {
    width: 100%;
  }

  section {
    margin-top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
  .text-area {
    height: 400px;
    width: 100%;
    resize: none;
  }
  h1 {
    font-size: 2rem;
    font-weight: 700;
  }
  .form-input {
    margin: 0 0 1rem 0;
  }
  .btn {
    display: flex;
    width: 100%;
    font-size: 2.5rem;
    font-weight: 800;
    justify-content: center;
    margin: 1rem 0;
  }

  @media screen and (max-width: 992px) {
    h1 {
      font-size: 1.6rem;
    }
  }
`

export default Wrapper
