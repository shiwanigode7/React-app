export default class Links {

    public static dashboard(repoId: string) {
        return `/home/dashboard/${repoId}`
    }

    public static mplView(repoId: string) {
        return `/home/mpl/${repoId}`
    }

    public static pplView(repoId: string) {
        return `/home/ppl/${repoId}`
    }

    public static sirView(repoId: string) {
        return `/home/sir/${repoId}`
    }

    public static ppgView(repoId: string) {
        return `/home/ppg/${repoId}`
    }

    public static rrmView(repoId: string) {
        return `/home/rrm/${repoId}`
    }

    public static releaseView(repoId: string) {
        return `/home/release/${repoId}`
    }

    public static innovationKPIView(repoId: string) {
        return `/home/innovation-kpi/${repoId}`
    }

    public static setupView(repoId: string) {
        return `/home/settings/setup/${repoId}`
    }

    public static settingsView(repoId: string) {
        return `/home/settings/${repoId}`
    }

    public static navView(repoId?: string) {
        return `home/${repoId}`
    }

    /**setting submenu pathnames */
    public static userRolesView(repoId: string) {
        return `/home/settings/userRoles/${repoId}`
    }
    public static resourceManagementView(repoId: string) {
        return `/home/settings/resource/${repoId}`
    }
    public static meetingView(repoId: string) {
        return `/home/settings/meeting/${repoId}`
    }
    public static innovationCadenceView(repoId: string) {
        return `/home/settings/cadence/${repoId}`
    }
    public static runwayView(repoId: string) {
        return `/home/settings/runway/${repoId}`
    }
    public static productView(repoId: string) {
        return `/home/settings/product/${repoId}`
    }

    public static businessLinesView(repoId: string) {
        return `/home/settings/businesslines/${repoId}`;
    }

    /**release submenu pathnames */
    public static releaseBusinessGoalsView(repoId: string) {
        return `/home/release/businessGoals/${repoId}`;
    }

    public static releaseProductsView(repoId: string) {
        return `/home/release/products/${repoId}`;
    }

    public static innovationKPIOnTimeDeliveryView(repoId: string) {
        return `/home/innovation-kpi/otd/${repoId}`;
    }

    public static innovationKPIRevenueAchivementView(repoId: string) {
        return `/home/innovation-kpi/revenueAchievements/${repoId}`;
    }

    public static innovationKPIIncrementalPipelineValueView(repoId: string) {
        return `/home/innovation-kpi/ipv/${repoId}`;
    }

    public static rrmByBusinessGoalView(repoId: string) {
        return `/home/rrm/businessGoal/${repoId}`;
    }

    public static rrmByRunwayView(repoId: string) {
        return `/home/rrm/runway/${repoId}`;
    }

}