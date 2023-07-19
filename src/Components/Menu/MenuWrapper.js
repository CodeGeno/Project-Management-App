import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 0 2rem;
  max-width: 100vw;
  .menu-title {
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: 2rem;
    font-weight: 900;
  }
  .menu-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .nav-link-container {
    display: flex;
    flex-basis: 50%;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
  }
  .button-container {
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    margin: 1rem;
    color: black;
    padding: 2rem 0;
  }
  a {
  }
  .img-box {
    display: flex;
    height: auto;
    width: auto;
    justify-content: center;
    align-items: center;
    object-fit: contain;
  }

  .img {
    width: 100%;
    height: auto;
  }
  .btn-text {
    width: 100%;
    height: 100%;
    display: flex;

    justify-content: center;
    font-size: 2rem;
    align-items: center;
    p {
      padding: 0;
      margin: 0;
    }
  }
  @media screen and (max-width: 992px) {
    .menu-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
    }
    .nav-link-container {
      margin: 0;
    }
    .btn-text {
      font-size: 1.6rem;
    }
  }
  .return {
    margin: 2rem 0;
  }
`

export default Wrapper
