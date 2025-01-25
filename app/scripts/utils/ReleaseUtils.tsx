import ReleaseModel from "../components/settings/InnovationCadenceView/ReleaseModel";
import { getTimeAndDate } from "./MeetingUtils";

// TODO: remove useFiveReleases custom Hook component, once useFiveReleases is
//       replaced with prepareAndSetFiveUnarchivedReleases in all places
export const getEmptyReleaseObject = () => {
    const emptyReleaseData: ReleaseModel = {
        nodeId: "",
        date: "",
        name: "",
        description: "",
        isArchived: false
    };
    return emptyReleaseData;
};

export const getFiveEmptyReleasesArray = () => {
    const fiveEmptyReleases: ReleaseModel[] = [getEmptyReleaseObject(), getEmptyReleaseObject(), getEmptyReleaseObject(),
    getEmptyReleaseObject(), getEmptyReleaseObject()];
    return fiveEmptyReleases;
};

export const prepareAndSetFiveUnarchivedReleases = (releasesResponse: ReleaseModel[]) => {
    let fiveReleasesList: ReleaseModel[] = getFiveEmptyReleasesArray();
    if (releasesResponse.length > 0) {
        const unarchivedReleases = releasesResponse;
        const todaysDate = getTimeAndDate()[0];
        const previousReleases: ReleaseModel[] = unarchivedReleases.filter(release => release.date < todaysDate);
        const nextReleases = unarchivedReleases.filter(release => release.date >= todaysDate);

        fiveReleasesList[0] = previousReleases.length > 0 ? previousReleases[previousReleases.length - 1] : getEmptyReleaseObject();
        fiveReleasesList[1] = nextReleases.length > 0 ? nextReleases[0] : getEmptyReleaseObject();
        fiveReleasesList[2] = nextReleases.length > 1 ? nextReleases[1] : getEmptyReleaseObject();
        fiveReleasesList[3] = nextReleases.length > 2 ? nextReleases[2] : getEmptyReleaseObject();
        fiveReleasesList[4] = nextReleases.length > 3 ? nextReleases[3] : getEmptyReleaseObject();
    }
    return fiveReleasesList;
}