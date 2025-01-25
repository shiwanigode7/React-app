/**TSX files to define all the interfaces to be used for Innovation Application */

import { HeroFeatureModel } from "../components/ReleaseView/Products/HeroFeatureModel";
import { ProductModel } from "../components/settings/ProductView/ProductModel";
import { BG_RELEASE_TYPE } from "../constant/InnovationEnums";
import BusinessCaseModel from "../view/chapters/BusinessCaseChapter/BusinessCaseModel";

/**Interface to hold the data returned by the onChange function of AppSwitcher */
export declare interface AppSwitcherDataChange {
    organization: string;
    orgs: [AppSwitcherAccountArrayElement];
}

/**Interface to hold the array of Esko Cloud Account Detail returned from the AppSwitcher */
export declare interface AppSwitcherAccountArrayElement {
    repoid: string;
    id: string;
    name: string;
}

/**Business Goal interface */
/**Interface class to define the Type for the businessGoalData */
export declare interface BusinessGoalTableType {
    nodeId: string;
    MPLPriority: string;
    PPLPriority: string;
    businessGoalName: string;
    problemDefinition: string;
    briefDescription: string;
    goalType: string;
    owner: string;
    thumbnail: string;
    businessUnit: string;
    status: string;
    businessCaseData: BusinessCaseModel;
    nodePath: string;
    runwaysList: string[];
    productsList: string[];
    runwaysCount: number;
    targetMarketScore: number;
    channelPartnerScore: number;
    positioningScore: number;
    ideaTypeScore: number;
    riskScore: number;
    freedomToOperate: boolean;
    potentialIp: boolean;
    potentialIpDescription: string;
    milestones: MilestoneModel[];
    releaseTimelineData: ReleaseTimelineModel[];
    slides: SlidesModel[];
    coreTeam: BGCoreTeam;
    healthData: HealthModel;
}

/**Runway Interface */
export declare interface RunwayModel {
    runwayName: string;
    isActive: boolean;
    managerName: string;
    thumbnail: string;
    nodeId: string;
}

/**Runway id and name interface */
export declare interface RunwaysWithIdType {
    runwayName: string;
    nodeId: string;
    isActive: boolean;
}

/**Business Goal id and name interface */
export declare interface BusinessGoalWithIdType {
    businessGoalName: string;
    nodeId: string;
}

export declare interface BusinessCaseUpdateType {
    nodeId?: string;
    businessCaseData: BusinessCaseModel;
}

/**Business Goal runwaysList and name interface */
export declare interface RunwaysListType {
    runwaysList: string[];
    businessGoalName: string;
}

/**Meetings List with name and Discussion Topics interface */
export declare interface MeetingsListWithDiscussionType {
    meetingName: string;
    discussionTopics: MeetingTopicInterface[];
}

/** Business Goal Notes interface */
export declare interface NoteInterface {
    /** The name of the actual note */
    noteName: string;
    /** To hold the actual content type in by the user */
    data: string;
    /** Field to hold the information whether the field is Public or private */
    noteView: string;
    /** Field to hold the user information */
    owner: string;
    /** Field to hold the date of addition */
    date: Date;
    /** Field to hold the discussion topic Id for text */
    parentId?: string;
}

/**Interface for action */
export declare interface ActionInterface {
    /**Node Id of the Action */
    nodeId: string;
    /**Name of the action */
    actionName: string;
    /**Status of the action */
    status: string;
    /**Owner of the action */
    owner: string;
    /**Id of the discussion topic */
    discussionTopicId: string;
    /**Name of the topic - business goal id or text topic */
    dueDate: string;
    /**Field with text for the Action */
    text: string;
    /**Field with comment for the Action */
    comment: string;
    /**Meeting Name where this Action is created */
    meetingName: string;
}

/**Interface to define the type of discussion topic Drop Down*/
export declare interface TopicTypeDropDownInterface {
    value: string;
}

/**Interface for a single topic in a given meeting */
export declare interface MeetingTopicInterface {
    /**Name of the topic */
    topic: string;
    /**Topic type, whether a business goal will be discussed or else some other topic i.e text topic */
    topicType: string;
    /**email of the user who is presenter for the discussion topic */
    presenter: string;
    /**Duration of a given topic */
    topicDuration: number;
    /**The nature of the topic i.e., whether the topic is introduced, updated or demonstrated */
    typeOfTopic?: string;
    /**Unique ID for discussion topic */
    discussionTopicId: string;
    /**ID of the slide attached */
    slideId: string;
}

/**Interface for the meetings */
export declare interface MeetingInterface {
    /**The type of the meeting decided */
    meetingType: string;
    /**the date of the meeting */
    date: string;
    /**the name, randomly generated like in business goal notes */
    meetingName: string;
    /**The start time of the meeting */
    fromTime: string;
    /**The end time of the meeting */
    toTime: string;
    /**List of topics to be discussed in a given meeting */
    discussionTopics: MeetingTopicInterface[];
    /** The slides added to the text topic*/
    textSlides: SlidesModel[];
    /**List of Id of Open actions */
    openActionsFromOlderMeetings: string[];
}

/**Interface for the meeting list drop downs */
export declare interface MeetingViewDropDownInterface {
    dataKey: string;
    displayName: string;
}

/**Interface for Business goal display mode drop down */
//TODO: To replace MeetingViewDropDown with the following drop down interface in respective files.
export declare interface DropDownInterface {
    dataKey: string;
    displayName: string;
}

/**Interface for the IPV value */
export declare interface IPVNodeModel {
    quarterStart: string;
    quarterEnd: string;
    quarterDetails: string;
    activeBusinessGoals: string[];
    inActiveBusinessGoals: string[];
    ipv: number;
}

/**Interface for the Yearly IPV value */
export interface YealryIPVModel {
    softwareIPV: number;
    hardwareIPV: number;
    year: string;
    activeBusinessGoals: IPVBusinessGoalModel[];
}

export interface IPVBusinessGoalModel {
    businessGoalName: string;
    businessGoalId: string;
    thumbnail: string;
    fiveYearIPV: number;
    revenueProjections: any;
}

export interface MilestoneModel {
    milestoneName: string;
    milestoneId: string;
}

export interface ReleaseTimelineModel {
    milestones: string[];
    releaseNodeId: string;
    releaseType: BG_RELEASE_TYPE;
    comment: string;
}

export interface ReleaseProductUpdateRequestModel {
    heroFeaturesList: HeroFeatureModel[];
    productList: ProductModel[];
}

export interface BGCoreTeam {
    productManager: string;
    projectManager: string;
    marketing: string;
    researchAndDevelopment: string;
    sales: string;
}

export interface HealthModel {
    technical: HealthChapterItemModel;
    schedule: HealthChapterItemModel;
    resources: HealthChapterItemModel;
    IP: HealthChapterItemModel;
    businessCase: HealthChapterItemModel;
}

export interface HealthChapterItemModel {
    status: string;
    comment: string;
}

export declare interface UserPermissionResponseModel {
    status: string,
    message: string,
    result: UserPermissionModel

}

/**Model for user permission context used for disabling/hiding UI  */
export declare interface UserPermissionModel {
    leftNav: {
        isSettingEnabled: boolean;
    },
    businessGoal: {
        isPriorityChangeable: boolean;
        isStatusChangeable: boolean;
        isBGCreatable: boolean;
        isAllBGEditable: boolean;
    },
    rrmView: {
        isFTEEditable: boolean;
        isNotesEditable: boolean;
    },
    releaseView: {
        isProductEditable: boolean;
        isRAEditable: boolean;
    },
    meetingModel: {
        isMeetingEditable: boolean;
        isSIRViewable: boolean;
        isOldMeetingEditable: boolean;
        isActionEditable: boolean;
    },
    otdModel: {
        isCurrentStatusEditable: boolean;
    }
}

export interface ReleaseHeroFeatureModelWithMilestone {
    milestoneId: string;
    heroFeaturesList: ReleaseHeroFeature[];
}

export interface ReleaseHeroFeature {
    isCompleted: boolean;
    heroFeatureName: string;
    productId: string;
}

export declare interface UserListWithEmailModel {
    firstName: string,
    surName: string,
    email: string,
    displayName: string
}

export interface SlidesModel {
    contentURI: string,
    slideId: string,
    pptName: string
}

export interface SlidesUploadModel {
    pptName: string,
    slideId: string,
    pptFileBlob: File | null
}
export declare interface QuarterModel {
    quarterStart: string;
    quarterEnd: string;
    quarterDetails: string;
}