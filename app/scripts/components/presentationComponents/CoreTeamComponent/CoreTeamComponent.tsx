import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from "@material-ui/core";
import React from "react";
import { InnovationStatus } from "../../../constant/InnovationEnums";
import { userAvatarBackgroundColor, userAvatarTextColor } from "../../../utils/UserAvatarColorFunction";
import CoreTeamModel from "./CoreTeamModel";
import { CoreTeamStyles } from "./CoreTeamStyles";

export function CoreTeamComponent(CoreTeamComponentProps: CoreTeamModel) {
    const coreTeamStyleClasses = CoreTeamStyles();
    const getFirstName = (userName: string) => {
        const firstName: string = undefined !== userName.split(", ")[1] ? userName.split(", ")[1] : "";
        return firstName;
    }
    const getLastName = (userName: string) => {
        const lastName: string = undefined !== userName.split(", ")[0] ? userName.split(", ")[0] : "";
        return lastName;
    }
    return (
        <Card className={coreTeamStyleClasses.cardRoot}>
            <CardHeader
                title={"Core Team"}
                classes={{ title: coreTeamStyleClasses.cardHeaderStyles }}
            />
            <CardContent className={coreTeamStyleClasses.cardcontent}>
                <Grid container className={coreTeamStyleClasses.rootGrid} >
                    <Grid item className={coreTeamStyleClasses.columnFlex}>
                        {
                            (CoreTeamComponentProps.coreTeamDetails.productManager && InnovationStatus.IDEATION !== CoreTeamComponentProps.businessGoal.status) ?
                                <Grid className={coreTeamStyleClasses.rowFlex}>
                                    <Grid className={coreTeamStyleClasses.avatarStyles}>
                                        <Avatar style={{
                                            color: userAvatarTextColor(CoreTeamComponentProps.coreTeamDetails.productManager),
                                            backgroundColor: userAvatarBackgroundColor(CoreTeamComponentProps.coreTeamDetails.productManager)
                                        }}>
                                            {getFirstName(CoreTeamComponentProps.coreTeamDetails.productManager).charAt(0) + getLastName(CoreTeamComponentProps.coreTeamDetails.productManager).charAt(0)}
                                        </Avatar>
                                    </Grid>

                                    <Grid className={coreTeamStyleClasses.textGrid}>
                                        <Typography className={coreTeamStyleClasses.typographyNames}>
                                            {getFirstName(CoreTeamComponentProps.coreTeamDetails.productManager) + " " + getLastName(CoreTeamComponentProps.coreTeamDetails.productManager)}
                                        </Typography>
                                        <Typography className={coreTeamStyleClasses.typographyTeam}>
                                            Product Manager
                                        </Typography>
                                    </Grid>
                                </Grid>
                                :
                                <Grid className={coreTeamStyleClasses.rowFlex}>
                                    <Grid className={coreTeamStyleClasses.avatarStyles}>
                                        <Avatar>-</Avatar>
                                    </Grid>
                                    <Grid className={coreTeamStyleClasses.textGrid}>
                                        <Typography className={coreTeamStyleClasses.typographyUnassigned}>
                                            Unassigned
                                        </Typography>
                                        <Typography className={coreTeamStyleClasses.typographyTeam}>
                                            Product Manager
                                        </Typography>
                                    </Grid>
                                </Grid>
                        }
                        {
                            (CoreTeamComponentProps.coreTeamDetails.marketing && InnovationStatus.IDEATION !== CoreTeamComponentProps.businessGoal.status) ?
                                <Grid className={coreTeamStyleClasses.marketingGrid}>
                                    <Grid className={coreTeamStyleClasses.avatarStyles}>
                                        <Avatar style={{
                                            color: userAvatarTextColor(CoreTeamComponentProps.coreTeamDetails.marketing),
                                            backgroundColor: userAvatarBackgroundColor(CoreTeamComponentProps.coreTeamDetails.marketing)
                                        }}>
                                            {getFirstName(CoreTeamComponentProps.coreTeamDetails.marketing).charAt(0) + getLastName(CoreTeamComponentProps.coreTeamDetails.marketing).charAt(0)}
                                        </Avatar>
                                    </Grid>
                                    <Grid className={coreTeamStyleClasses.textGrid}>
                                        <Typography className={coreTeamStyleClasses.typographyNames}>
                                            {getFirstName(CoreTeamComponentProps.coreTeamDetails.marketing) + " " + getLastName(CoreTeamComponentProps.coreTeamDetails.marketing)}
                                        </Typography>
                                        <Typography className={coreTeamStyleClasses.typographyTeam}>
                                            Marketing
                                        </Typography>
                                    </Grid>
                                </Grid>
                                :
                                <Grid className={coreTeamStyleClasses.marketingGrid}>
                                    <Grid className={coreTeamStyleClasses.avatarStyles}>
                                        <Avatar>-</Avatar>
                                    </Grid>
                                    <Grid className={coreTeamStyleClasses.textGrid}>
                                        <Typography className={coreTeamStyleClasses.typographyUnassigned}>
                                            Unassigned
                                        </Typography>
                                        <Typography className={coreTeamStyleClasses.typographyTeam}>
                                            Marketing
                                        </Typography>
                                    </Grid>
                                </Grid>
                        }
                        {
                            (CoreTeamComponentProps.coreTeamDetails.sales && InnovationStatus.IDEATION !== CoreTeamComponentProps.businessGoal.status) ?
                                <Grid className={coreTeamStyleClasses.marketingGrid}>
                                    <Grid className={coreTeamStyleClasses.avatarStyles}>
                                        <Avatar style={{
                                            color: userAvatarTextColor(CoreTeamComponentProps.coreTeamDetails.sales),
                                            backgroundColor: userAvatarBackgroundColor(CoreTeamComponentProps.coreTeamDetails.sales)
                                        }}>
                                            {getFirstName(CoreTeamComponentProps.coreTeamDetails.sales).charAt(0) + getLastName(CoreTeamComponentProps.coreTeamDetails.sales).charAt(0)}
                                        </Avatar>
                                    </Grid>
                                    <Grid className={coreTeamStyleClasses.textGrid}>
                                        <Typography className={coreTeamStyleClasses.typographyNames}>
                                            {getFirstName(CoreTeamComponentProps.coreTeamDetails.sales) + " " + getLastName(CoreTeamComponentProps.coreTeamDetails.sales)}
                                        </Typography>
                                        <Typography className={coreTeamStyleClasses.typographyTeam}>
                                            Sales
                                        </Typography>
                                    </Grid>
                                </Grid>
                                :
                                <Grid className={coreTeamStyleClasses.marketingGrid}>
                                    <Grid className={coreTeamStyleClasses.avatarStyles}>
                                        <Avatar>-</Avatar>
                                    </Grid>
                                    <Grid className={coreTeamStyleClasses.textGrid}>
                                        <Typography className={coreTeamStyleClasses.typographyUnassigned}>
                                            Unassigned
                                        </Typography>
                                        <Typography className={coreTeamStyleClasses.typographyTeam}>
                                            Sales
                                        </Typography>
                                    </Grid>
                                </Grid>
                        }
                    </Grid>
                    <Grid item className={coreTeamStyleClasses.secondColumnGrid}>
                        {
                            (CoreTeamComponentProps.coreTeamDetails.projectManager && InnovationStatus.IDEATION !== CoreTeamComponentProps.businessGoal.status) ?
                                <Grid className={coreTeamStyleClasses.rowFlex}>
                                    <Grid className={coreTeamStyleClasses.avatarStyles}>
                                        <Avatar style={{
                                            color: userAvatarTextColor(CoreTeamComponentProps.coreTeamDetails.projectManager),
                                            backgroundColor: userAvatarBackgroundColor(CoreTeamComponentProps.coreTeamDetails.projectManager)
                                        }}>
                                            {getFirstName(CoreTeamComponentProps.coreTeamDetails.projectManager).charAt(0) + getLastName(CoreTeamComponentProps.coreTeamDetails.projectManager).charAt(0)}
                                        </Avatar>
                                    </Grid>
                                    <Grid className={coreTeamStyleClasses.textGrid}>
                                        <Typography className={coreTeamStyleClasses.typographyNames}>
                                            {getFirstName(CoreTeamComponentProps.coreTeamDetails.projectManager) + " " + getLastName(CoreTeamComponentProps.coreTeamDetails.projectManager)}
                                        </Typography>
                                        <Typography className={coreTeamStyleClasses.typographyTeam}>
                                            Project Manager
                                        </Typography>
                                    </Grid>
                                </Grid>
                                :
                                <Grid className={coreTeamStyleClasses.rowFlex}>
                                    <Grid className={coreTeamStyleClasses.avatarStyles}>
                                        <Avatar>-</Avatar>
                                    </Grid>
                                    <Grid className={coreTeamStyleClasses.textGrid}>
                                        <Typography className={coreTeamStyleClasses.typographyUnassigned}>
                                            Unassigned
                                        </Typography>
                                        <Typography className={coreTeamStyleClasses.typographyTeam}>
                                            Project Manager
                                        </Typography>
                                    </Grid>
                                </Grid>
                        }
                        {
                            (CoreTeamComponentProps.coreTeamDetails.researchAndDevelopment && InnovationStatus.IDEATION !== CoreTeamComponentProps.businessGoal.status) ?
                                <Grid className={coreTeamStyleClasses.marketingGrid}>
                                    <Grid className={coreTeamStyleClasses.avatarStyles}>
                                        <Avatar style={{
                                            color: userAvatarTextColor(CoreTeamComponentProps.coreTeamDetails.researchAndDevelopment),
                                            backgroundColor: userAvatarBackgroundColor(CoreTeamComponentProps.coreTeamDetails.researchAndDevelopment)
                                        }}>
                                            {getFirstName(CoreTeamComponentProps.coreTeamDetails.researchAndDevelopment).charAt(0) + getLastName(CoreTeamComponentProps.coreTeamDetails.researchAndDevelopment).charAt(0)}
                                        </Avatar>
                                    </Grid>
                                    <Grid className={coreTeamStyleClasses.textGrid}>
                                        <Typography className={coreTeamStyleClasses.typographyNames}>
                                            {getFirstName(CoreTeamComponentProps.coreTeamDetails.researchAndDevelopment) + " " + getLastName(CoreTeamComponentProps.coreTeamDetails.researchAndDevelopment)}
                                        </Typography>
                                        <Typography className={coreTeamStyleClasses.typographyTeam}>
                                            R&D
                                        </Typography>
                                    </Grid>
                                </Grid>
                                :
                                <Grid className={coreTeamStyleClasses.marketingGrid}>
                                    <Grid className={coreTeamStyleClasses.avatarStyles}>
                                        <Avatar>-</Avatar>
                                    </Grid>
                                    <Grid className={coreTeamStyleClasses.textGrid}>
                                        <Typography className={coreTeamStyleClasses.typographyUnassigned}>
                                            Unassigned
                                        </Typography>
                                        <Typography className={coreTeamStyleClasses.typographyTeam}>
                                            R&D
                                        </Typography>
                                    </Grid>
                                </Grid>
                        }
                        <Grid className={coreTeamStyleClasses.marketingGrid}></Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card >

    )
}
