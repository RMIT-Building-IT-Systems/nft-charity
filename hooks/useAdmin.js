import { useContext } from "react";

import { AdminContext } from "./AdminContextProvider";

export default () => {
    const { isAdmin } = useContext(AdminContext);
    return { isAdmin };
};
