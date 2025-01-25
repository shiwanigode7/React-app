/**TSX file defining the context for Innovation Application to store details like
 * Esko Cloud Account, logged in user detail
 */

import { createContext } from "react";
import { CurrentUserInfo, EskoCloudAccount } from "../interfaces/IAMInterface";
import { UserPermissionModel } from "../interfaces/InnovationInterface";

/**Place Holder values - These are only used for initializing the context variable and will not be used 
 * anywhere else
 */
/**Place holder for Account Detail */
const defaultAccountDetail: EskoCloudAccount = {
    "organizationID": "",
    "readableName": "",
    "repoid": ""
}

/**Place holder for User Info */
const currentUserInfo: CurrentUserInfo = {
    "displayName": "",
    "email": "",
    "userId": "",
    "groupMembership": []
}

/**Place holder for the function that updates the account detail */
const defaultAccountUpdateFunction = (inDefault: EskoCloudAccount) => {
    console.log(inDefault);
}

/**Note: For now this variable is used for triggering the re-rendering of the component
 * that are using the context variable.
 */
/**Place holder value for re-render trigger variable */
const reRender: boolean = false;
/**Place holder value for re-render trigger function */
const updateRenderVariable = () => {
    console.log("");
}
/********************************************************************************************** */
const userPermission: UserPermissionModel = {
    leftNav: {
        isSettingEnabled: true
    },
    businessGoal: {
        isPriorityChangeable: false,
        isStatusChangeable: true,
        isBGCreatable: true,
        isAllBGEditable: false
    },
    rrmView: {
        isFTEEditable: false,
        isNotesEditable: false
    },
    releaseView: {
        isProductEditable: false,
        isRAEditable: false
    },
    meetingModel: {
        isMeetingEditable: true,
        isSIRViewable: true,
        isActionEditable: false,
        isOldMeetingEditable: false
    },
    otdModel: {
        isCurrentStatusEditable: false
    }
};

const setUserPermission = (inUserPermission: UserPermissionModel) => {
    console.log(inUserPermission);
}
/**define context variable */
export const InnovationAppContext = createContext(
    {
        "eskoAccountDetail": defaultAccountDetail,
        "accountUpdateFunction": defaultAccountUpdateFunction,
        "renderTriggerVariable": reRender,
        "renderVarUpdateFunction": updateRenderVariable,
        "currentUserInfo": currentUserInfo,
        "userPermission": userPermission,
        "setUserPermission": setUserPermission
    }
);

