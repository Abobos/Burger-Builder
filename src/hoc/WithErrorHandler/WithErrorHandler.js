import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

import useHttpErrorHandler from "../../hooks/httpError";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal show={error} removeModal={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
