import { Avatar, Chip, Grid, Tooltip, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import images from "../../../../../Icons/images";
import { InnovationAppContext } from "../../../../context/InnovationAppContext";
import { MilestoneModel, UserListWithEmailModel } from "../../../../interfaces/InnovationInterface";
import UserService from "../../../../services/UserService";
import CheckIcon from '@material-ui/icons/Check';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { userAvatarTextColor, userAvatarBackgroundColor } from "../../../../utils/UserAvatarColorFunction";
import { ColumnFieldData, TableWrapper } from "../../../../view/tables/TableWrapper";
import ThumbnailWithName from "../../../utils/ThumbnailWithName/ThumbnailWithName";
import { BusinessGoalForOTDModel, HeroFeatureListForOTDModel, HeroFeatureTableModel, HeroFeatureTableProps, ProductForOTDModel } from "./HeroFeatureTableModel";
import { HeroFeatureTableStyle } from "./HeroFeatureTableStyles";
import { HeroFeatureStatusButton } from "./HeroFeatureStatusButton";
import { AvatarGroup } from "@material-ui/lab";
import { UserAvatar } from "../../../utils/UserAvatar/UserAvatar";
import TextWithTooltip from "../../../utils/TextWithTooltip/TextWithTooltip";

export function HeroFeaturesTable(props: HeroFeatureTableProps) {

    const HeroFeatureTableStylesClass = HeroFeatureTableStyle();
    /**Importing the context data */
    const lInnovationData = useContext(InnovationAppContext);

    const [OTDFreezeDate, setOTDFreezeDate] = useState<Date>();

    const [disableStatusChange, setDisableStatusChange] = useState<boolean>(false);

    const [heroFeatureTableData, setHeroFeatureTableData] = useState<HeroFeatureTableModel[]>([]);

    const [heroFeatureListForTableData, setHeroFeatureListForTableData] = useState<any[]>([]);

    const [usersListWithName, setUsersListWithName] = useState<UserListWithEmailModel[]>([]);

    const [businessGoalListForOTD, setBusinessGoalListForOTD] = useState<BusinessGoalForOTDModel[]>([]);

    const [productListForOTD, setProductListForOTD] = useState<ProductForOTDModel[]>([]);

    const [mileStoneList, setMileStoneList] = useState<MilestoneModel[]>([]);

    const [columnData, setColumnData] = useState<ColumnFieldData[]>([]);

    const [heroFeatureCount, setHeroFeatureCount] = useState<number>(0);

    useEffect(() => {
        UserService.getAdminAndProjectManagerUsers(lInnovationData.eskoAccountDetail.organizationID.toString())
            .then((getUsersResponse: UserListWithEmailModel[]) => {
                setUsersListWithName(getUsersResponse);
            })
            .catch((getUsersError: any) => {
                console.log(getUsersError)
            });
    }, [lInnovationData.eskoAccountDetail.organizationID]);

    useEffect(() => {
        if (undefined !== props.heroFeatureData) {
            setHeroFeatureTableData(props.heroFeatureData.heroFeatures);
            setBusinessGoalListForOTD(props.heroFeatureData.activeBusinessGoals);
            setProductListForOTD(props.heroFeatureData.products);
            setOTDFreezeDate(new Date(props.heroFeatureData.freezeDate));
        }
    }, [props.heroFeatureData]);

    useEffect(() => {
        if (undefined !== OTDFreezeDate) {
            const lFinalStatusChangeableDate = OTDFreezeDate;
            const currentDate = new Date();
            lFinalStatusChangeableDate.setDate(lFinalStatusChangeableDate.getDate() + 5);
            if (lFinalStatusChangeableDate.getTime() < currentDate.getTime())
                setDisableStatusChange(true);
            else
                setDisableStatusChange(false);
        }
    }, [OTDFreezeDate]);

    useEffect(() => {
        tableColumnBuilder();
    }, [heroFeatureCount]);

    useEffect(() => {
        if (undefined !== heroFeatureTableData) {
            tableColumnBuilder();
            tableComponentsBuilder(heroFeatureTableData);
        }
    }, [heroFeatureTableData, usersListWithName, mileStoneList, props.selectedStatusValue, props.selectedProductValue, props.showOnlyMyProducts]);

    useEffect(() => {
        if (undefined !== businessGoalListForOTD) {
            let tempMilestoneList: MilestoneModel[] = [];
            businessGoalListForOTD.forEach((businessGoal: BusinessGoalForOTDModel) => {
                tempMilestoneList = tempMilestoneList.concat(businessGoal.milestones);
            })
            setMileStoneList(tempMilestoneList);
        }
    }, [businessGoalListForOTD]);

    const tableColumnBuilder = () => {

        const heroFeatureComponent = <div style={{ display: "flex", alignItems: "center" }}>
            <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>{"Hero Feature"}</Typography>
            <Chip label={heroFeatureCount} style={{ backgroundColor: "#0079D1", height: "16px", marginLeft: "5px", color: "#FFFFFF" }} />
        </div>
        const tempColumnData: ColumnFieldData[] = [
            { dataKey: "heroFeature", label: heroFeatureComponent, isSortable: true, isComponentColumn: true, alignment: "left", returnsRowData: false, cellWidth: "25%" },
            { dataKey: "product", label: "Product", isSortable: true, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "5%" },
            { dataKey: "productManager", label: "Product Manager", isSortable: false, isComponentColumn: true, alignment: "inherit", returnsRowData: false, cellWidth: "2%" },
            { dataKey: "milestone", label: "Milestone", isSortable: true, isComponentColumn: true, alignment: "left", returnsRowData: false, cellWidth: "25%" },
            { dataKey: "businessGoal", label: "Business Goal", isSortable: true, isComponentColumn: true, alignment: "left", returnsRowData: false, cellWidth: "23%" },
            { dataKey: "currentStatus", label: "Current Status", isSortable: true, isComponentColumn: true, alignment: "center", returnsRowData: false, cellWidth: "20%" }
        ];

        setColumnData(tempColumnData);
    }

    const tableComponentsBuilder = (inHeroFeatureTableData: HeroFeatureTableModel[]) => {
        let lRowNumbering = 0;
        /**array for hero features table row*/
        const lHeroFeatureTableData: any[] = [];
        /**Iterate over each hero feature data */
        inHeroFeatureTableData.forEach((heroFeatureData: HeroFeatureTableModel) => {

            let lMilestoneName: string = "";
            let lBusinessGoalName: string = "";
            let lMilestoneStatus: string = heroFeatureData.milestoneStatus;
            let lBusinessGoalThumbnail: string = "";
            let lThumbnailImage: any = images.EskoStarPng;
            mileStoneList.forEach((milestone: MilestoneModel) => {
                if (heroFeatureData.milestoneId === milestone.milestoneId) {
                    lMilestoneName = milestone.milestoneName;
                }
            })
            businessGoalListForOTD.forEach((businessGoal: BusinessGoalForOTDModel) => {
                if (heroFeatureData.businessGoalId === businessGoal.businessGoalId) {
                    lBusinessGoalName = businessGoal.businessGoalName;
                    lBusinessGoalThumbnail = businessGoal.thumbnail;
                }
            })
            if (undefined !== lBusinessGoalThumbnail) {
                lThumbnailImage = lBusinessGoalThumbnail;
            }

            const lthumbnail = <div className={HeroFeatureTableStylesClass.typographyStyle}>
                <ThumbnailWithName
                    thumbnailAltText="Business Goal Thumbnail"
                    src={lThumbnailImage}
                    name={lBusinessGoalName}
                    isNameBold={false}
                    tooltipText={lBusinessGoalName}
                    tooltipPlacement="bottom"
                    nameGridItemMaxWidth="160px" />
            </div>;

            const lBusinessGoalNameDetail = {
                "displayComponent": lthumbnail,
                "componentValue": lBusinessGoalName
            }

            const milestoneData = <div style={{ display: "flex", alignItems: "center" }}>
                {"Completed" === lMilestoneStatus ?
                    <CheckIcon style={{ color: "#18C852", fontSize: "20px", marginRight: "2px" }} /> :
                    <PriorityHighIcon style={{ color: "#FA2426", fontSize: "20px", marginRight: "2px" }} />
                }
                <Grid container className={HeroFeatureTableStylesClass.textToolTip}>
                    <Grid item>
                        <TextWithTooltip
                            isTextBold={false}
                            text={lMilestoneName}
                            tooltipText={lMilestoneName}
                            tooltipPlacement="bottom"
                        />
                    </Grid>
                </Grid>
            </div>

            const lMilestoneDetail = {
                "displayComponent": milestoneData,
                "componentValue": lMilestoneName
            }

            heroFeatureData.heroFeatureList.forEach((heroFeature: HeroFeatureListForOTDModel) => {
                let lHeroFeatureRow: any = ({});
                let lProductName: string = "";
                let lProductThumbnail: string = "";
                let lFirstProductManager: string = "";
                let lProductManagers: string[] = [];
                productListForOTD.forEach((product: ProductForOTDModel) => {
                    if (heroFeature.productId === product.productId) {
                        lProductName = product.productName;
                        lProductManagers = product.managers;
                        lFirstProductManager = product.managers[0];
                        lProductThumbnail = product.thumbnail;
                    }
                })
                const lIsMyProduct: boolean = props.showOnlyMyProducts && -1 !== lProductManagers.indexOf(lInnovationData.currentUserInfo.displayName);
                if ((!props.showOnlyMyProducts || lIsMyProduct) && -1 !== props.selectedStatusValue.indexOf(heroFeature.currentStatus) && -1 !== props.selectedProductValue.indexOf(heroFeature.productId)) {
                    const lHeroFeatureComponent = <Grid container className={HeroFeatureTableStylesClass.textToolTip}>
                        <Grid item>
                            <TextWithTooltip
                                isTextBold={false}
                                text={heroFeature.heroFeatureName}
                                tooltipText={heroFeature.heroFeatureName}
                                tooltipPlacement="bottom"
                                textAlign="left"
                            />
                        </Grid>
                    </Grid>

                    const lHeroFeatureDetail = {
                        "displayComponent": lHeroFeatureComponent,
                        "componentValue": heroFeature.heroFeatureName
                    }
                    lHeroFeatureRow["heroFeature"] = lHeroFeatureDetail;
                    lHeroFeatureRow["product"] = {
                        "displayComponent": <Tooltip
                            title={lProductName}
                            placement="bottom"
                            arrow>
                            <Avatar
                                src={lProductThumbnail.toString()}
                                className={HeroFeatureTableStylesClass.avatarSmall} />
                        </Tooltip>,
                        "componentValue": lProductName

                    }
                    /**Defining the user badge */
                    const TOOL_TIP_AVATAR_SIZE: string = "30px";
                    let PM_TOOLTIP_COMPONENT: React.ReactNode = lFirstProductManager;
                    if (1 < lProductManagers.length) {
                        PM_TOOLTIP_COMPONENT = <Grid container direction="column">
                            {
                                lProductManagers.map((userName: string) => {
                                    return (
                                        <Grid item className={HeroFeatureTableStylesClass.productManagersGrid}>
                                            <UserAvatar
                                                displayText={true}
                                                avatarSize={TOOL_TIP_AVATAR_SIZE}
                                                userName={userName}
                                            />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>;
                    }
                    const lProductManagerBadge = <Tooltip
                        title={PM_TOOLTIP_COMPONENT}
                        placement="bottom"
                        arrow>
                        <AvatarGroup spacing={33}>
                            <Avatar
                                style={{
                                    height: "40px",
                                    width: "40px",
                                    marginTop: "-1px",
                                    fontSize: "16px",
                                    marginLeft: "30px",
                                    color: userAvatarTextColor(lFirstProductManager),
                                    backgroundColor: userAvatarBackgroundColor(lFirstProductManager)
                                }}
                            >
                                {
                                    (
                                        lFirstProductManager.split(", ")[1] !== undefined ?
                                            lFirstProductManager.split(", ")[1].charAt(0) :
                                            ""
                                    ) +
                                    (
                                        lFirstProductManager.split(", ")[0] !== undefined ?
                                            lFirstProductManager.split(", ")[0].charAt(0) :
                                            ""
                                    )
                                }
                            </Avatar>
                            {1 < lProductManagers.length ?
                                <Avatar style={{ backgroundColor: "#E3E4E5" }}>{""}</Avatar> : null
                            }
                            {2 < lProductManagers.length ?
                                <Avatar style={{ backgroundColor: "#E3E4E5" }}>{""}</Avatar> : null
                            }
                        </AvatarGroup>
                    </Tooltip>;
                    /**Create an object to hold both the component and the value */
                    const holdOwnerDetail = {
                        /**The react component to be displayed */
                        "displayComponent": lProductManagerBadge,
                        /**the value of the string/numerical value of the component */
                        "componentValue": lProductManagers
                    }
                    lHeroFeatureRow["productManager"] = holdOwnerDetail;
                    lHeroFeatureRow["milestone"] = lMilestoneDetail;
                    lHeroFeatureRow["businessGoal"] = lBusinessGoalNameDetail;
                    lHeroFeatureRow["currentStatus"] = {
                        "displayComponent": <HeroFeatureStatusButton
                            defaultValue={heroFeature.currentStatus}
                            disableStatusChange={disableStatusChange}
                            heroFeatureId={heroFeature.heroFeatureId}
                            heroFeatureNodeId={heroFeatureData.heroFeatureNodeId}
                            updateCallback={props.updateStatusCallback} />,
                        "componentValue": heroFeature.currentStatus
                    }
                    lHeroFeatureTableData.push(lHeroFeatureRow);
                    lRowNumbering = lRowNumbering + 1;
                }
            })
        })
        setHeroFeatureCount(lRowNumbering);
        setHeroFeatureListForTableData(lHeroFeatureTableData);
    }

    return (
        <div className={HeroFeatureTableStylesClass.tableDiv}>
            <TableWrapper
                borderedRow={false}
                tableHeight={"65%"}
                zIndexValue={4}
                inputData={heroFeatureListForTableData}
                onRowClickCallBack={() => { }}
                inputColumn={columnData}
                styleTableClasses={HeroFeatureTableStylesClass}
                customMessageOnEmpty={"No Hero Features added yet"}
                tableWidth={"auto"}
            />
        </div>
    )
}