import { useEffect, useState } from "react";
import ReleaseModel from "../../components/settings/InnovationCadenceView/ReleaseModel";
import ReleaseService from "../../services/service/ReleaseService";
import { getTimeAndDate } from "../MeetingUtils";

export default function useFiveReleases(repoId: string) {
  const [fiveReleases, setFiveReleases] = useState<ReleaseModel[]>(getFiveEmptyReleasesArray());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    ReleaseService.getReleases(repoId, 99, false)
      .then((releasesResponse: ReleaseModel[]) => {
          prepareAndSetFiveUnarchivedReleases(releasesResponse);
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);

  function prepareAndSetFiveUnarchivedReleases(releasesResponse: ReleaseModel[]) {
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
    setFiveReleases(fiveReleasesList);
    setIsLoading(false);
  }

  function getFiveEmptyReleasesArray() {
    const fiveEmptyReleases: ReleaseModel[] = [getEmptyReleaseObject(), getEmptyReleaseObject(), getEmptyReleaseObject(),
    getEmptyReleaseObject(), getEmptyReleaseObject()];
    return fiveEmptyReleases;
  }

  function getEmptyReleaseObject() {
    const emptyReleaseData: ReleaseModel = {
      nodeId: "",
      date: "",
      name: "",
      description: "",
      isArchived: false
    };
    return emptyReleaseData;
  }

  return [fiveReleases, isLoading, isError] as const;
}