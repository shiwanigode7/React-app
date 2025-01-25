import { useContext } from "react";
import { InnovationAppContext } from "../../context/InnovationAppContext";

export default class AppContext {   

    static getRepoId() {
        return useContext(InnovationAppContext).eskoAccountDetail.repoid;
    }
}