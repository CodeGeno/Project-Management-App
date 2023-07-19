import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  .app-container {
    a {
      margin: 1rem 0;
      font-size: 2rem;
      font-weight: 600;
    }
    h1 {
      font-size: 2rem;
      font-weight: 600;
      margin: 0;
    }
    width: auto;
  }
  .form {
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .project-top-section {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .title-container {
    display: flex;
    justify-content: center;
  }
  h1 {
    margin: 1rem 0 0 0;
  }
  .proj-text {
    margin: 0 0 0.5rem 0;
  }
  .banner {
    display: flex;
    justify-content: center;
    font-size: 2rem;
    width: 100%;
    margin: 0 1rem;
  }
  p {
    margin: 0 0 1rem 0;
  }

  .pending {
    color: var(--black);
    background: var(--grey-100);
    padding: 0.5rem;
    border-radius: 1rem;
  }
  .valide {
    color: var(--green-dark);
    background: var(--green-light);
  }
  .refus {
    color: var(--red-dark);
    background: var(--red-light);
  }
  .validation {
    .btn {
      margin: 0.5rem 0;
      font-size: 2rem;
      width: 100%;
    }
  }
  textarea {
    margin: 0.5rem 0;
    height: 200px;
    width: 100%;
    resize: none;
  }
  .btn-container {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 1rem;

    margin: 1rem 0;
    padding: 0 2rem;
    .btn {
      font-size: 1.5rem;
    }
  }
  .project-img-box {
  }
  .project-img {
  }
  .img {
  }

  @media screen and (max-width: 992px) {
    .validation {
      .btn {
        margin: 0.5rem 0;
        font-size: 1.6rem;
        width: 100%;
      }
    }
  }
`

export default Wrapper
