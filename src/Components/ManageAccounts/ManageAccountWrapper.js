import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  .search-section {
    display: flex;
    gap: 10px;
  }
  .return-section {
    width: 100%;
    a {
      width: 100%;
      margin: 1rem 0;
    }
  }
  .user {
    border-top-style: solid;
    border-top-color: var(--primary-500);
    border-top-width: 5px;
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-1);
    margin: 0.5rem 0;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
  .btn-container {
    display: flex;
    gap: 1rem;
    margin: 0.5rem 0;
  }
  .unselected {
    background-color: lightgrey;
  }
`

export default Wrapper
