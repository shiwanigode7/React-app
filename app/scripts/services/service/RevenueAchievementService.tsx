import Service from "../../utils/util/Service";
import { RevenueAchievementModel } from "../../components/ReleaseView/RevenueAchievements/RevenueAchievementModel";

export default class RevenueAchievementService extends Service {

    public static createRevenueAchievement(raData: RevenueAchievementModel, repoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationPOSTCall(["api", "v0", "revenueAchievement", "update", repoId, ""], raData)
                .then((createRAResponse: any) => {
                    resolve(createRAResponse);
                })
                .catch((createRAError: any) => {
                    reject(createRAError);
                });
        });
    }

    public static getRevenueAchievements(repoId: string) {
        return new Promise<any>((resolve, reject) => {
            this.InnovationGETCall(["api", "v0", "revenueAchievement", "get", repoId, ""])
                .then((revenueAchievementsResponse: any) => {
                    const rasList: RevenueAchievementModel[] = [];
                    const revenueAchievementsList: any[] = revenueAchievementsResponse.result.items;
                    revenueAchievementsList.forEach((ra: any) => {
                        const revenueAchievementData: RevenueAchievementModel = {
                            blNodeId: ra["ec_s@blNodeId"],
                            productList: ra["ec_nio@productList"],
                            bgList: ra["ec_nio@bgList"],
                            jop: ra["ec_s@jop"],
                            goal: ra["ec_s@goal"],
                            Q1: ra["ec_nio@Q1"],
                            Q2: ra["ec_nio@Q2"],
                            Q3: ra["ec_nio@Q3"],
                            Q4: ra["ec_nio@Q4"],
                            year: ra["ec_s@year"]
                        };
                        rasList.push(revenueAchievementData);
                    });
                    resolve(rasList);
                })
                .catch((getRunwayServiceError: any) => {
                    reject(getRunwayServiceError);
                });
        });
    }
}