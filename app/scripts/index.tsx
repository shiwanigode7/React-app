import "core-js/stable";
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "regenerator-runtime/runtime";
import { App } from "./App";
import { InnovationAppContext } from "./context/InnovationAppContext";
import './index.css';
import { CurrentUserInfo, EskoCloudAccount } from "./interfaces/IAMInterface";
import { UserPermissionModel } from "./interfaces/InnovationInterface";
import IAMService from "./services/IAMService";
import { readSavedAccountDetails } from "./services/InnovationService";
import UserService from "./services/UserService";
import { saveDataToLocalStorage } from "./utils/LocalStorageManagement";
import { ZeroOrganizationView } from "./view/customViews/ZeroOrganizationView";
import LoadingIcon from "./components/utils/LoadingIcon/LoadingIcon";
function Index() {
  /**The following three lines of code just read the url path 
   * and save the last string value (which is repo-id in our case).
   * The variables where declared separately to avoid the typing error 
   * thrown by typescript. Since window.location.pathname.split("/") has
   * a chance of returning undefined. 
   * (Note: at the beginning when user enter the base url of innovation the value assigned to repo will be "")
   */
  const holdPathName: string = window.location.pathname;
  const holdPathArray: string[] = holdPathName.split("/");
  /**Pick the last element in the holdPathArray */
  const holdRepoId: string = holdPathArray[(holdPathArray.length - 1)];
  const [userPermission, setUserPermission] = useState<UserPermissionModel>({
    leftNav: {
      isSettingEnabled: true
    },
    businessGoal: {
      isPriorityChangeable: true,
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
      isOldMeetingEditable: false,
      isActionEditable: false
    },
    otdModel: {
      isCurrentStatusEditable: false
    }
  });
  /**Value to hold the value of Esko Cloud Account Detail */
  const [accountDetail, setAccountDetail] = useState<EskoCloudAccount>(
    {
      "organizationID": "",
      "readableName": "",
      "repoid": holdRepoId
    }
  )
  /**function to update the value of the accountDetail.
   * This is the function that is actually called for update not the one defined in the context file.
   */
  const updateAccountDetail = (details: EskoCloudAccount) => {
    /**Update the site details in the cookie */
    saveDataToLocalStorage("defaultInnovationAccountDetail", details.organizationID.toString());
    /**Setup the account detail in the context state*/
    setAccountDetail(details);
    /**Making the setup call */
    UserService.innovationApplicationSetup(details.repoid, details.organizationID)
      .then((setupResponse: UserPermissionModel) => {
        setUserPermission(setupResponse);
      });
  }

  /**Defining the variable for re-render trigger */
  const [reRenderVariable, setReRenderVariable] = useState<boolean>(false)

  const [loadApplication, setLoadApplication] = useState<boolean>(false);
  /**Defining the function to change the re-render variable */
  const updateRenderVariable = () => {
    setReRenderVariable(!reRenderVariable);
  }

  /**State to hold the value of User Information */
  const [userInfo, setUserInfo] = useState<CurrentUserInfo>({
    "displayName": "",
    "email": "",
    "userId": "",
    groupMembership: []
  });

  /**Setting All the fields of the context variable */
  const contextSettings = {
    eskoAccountDetail: accountDetail,
    accountUpdateFunction: updateAccountDetail,
    renderTriggerVariable: reRenderVariable,
    renderVarUpdateFunction: updateRenderVariable,
    currentUserInfo: userInfo,
    userPermission: userPermission,
    setUserPermission: setUserPermission
  }

  /**Variable to check if user has cloud accout  */
  const [organizationPresent, setOrganizationPresent] = useState<boolean>(true);

  /**Initializing the repo-id based on the Esko Cloud Account */
  useEffect(() => {
    /**Get the Esko Cloud Account List */
    IAMService.iamGetECAList().then((data: EskoCloudAccount[]) => {
      /**If user has no organization under his account */
      if (data.length > 0) {
        setOrganizationPresent(true);
        /**Read the saved account data, if present. Set the account detail */
        const lSelectedAccount: EskoCloudAccount = readSavedAccountDetails(data);
        // Note: a constant is used to set the value and pass it to the function in 
        // iamGetCurrentUserInfo since using a state variable will cause a delay
        setAccountDetail(lSelectedAccount);
        /**Get the User Info */
        IAMService.iamGetCurrentUserInfo(lSelectedAccount.repoid)
          .then((response: CurrentUserInfo) => {
            /**Set the User Information */
            setUserInfo(response);
            // Update the context value for a given user
            UserService.innovationApplicationSetup(lSelectedAccount.repoid, lSelectedAccount.organizationID)
              .then((setupResponse: UserPermissionModel) => {
                setUserPermission(setupResponse);
                setLoadApplication(true);
              });
          })
          .catch((error: any[]) => {
            console.log(error);
          });
      }
      else {
        setOrganizationPresent(false);
        setLoadApplication(true);
      }
    })


  }, [])

  return (
    loadApplication ?
      <InnovationAppContext.Provider value={contextSettings}>
        {
          organizationPresent ? <App /> : <ZeroOrganizationView />
        }
      </InnovationAppContext.Provider> : <LoadingIcon />
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
