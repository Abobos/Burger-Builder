import React, { useEffect, useState } from "react";
import Spinner from "../../components/UI/Spinner/Spinner";

const asyncComponent = (importComponent) => {
  return (props) => {
    const [Component, SetComponent] = useState(null);

    useEffect(() => {
      importComponent().then((cmp) => {
        SetComponent(cmp.default);
      });
    }, []);

    return Component ? <Component {...props} /> : <Spinner />;
  };
};

export default asyncComponent;
