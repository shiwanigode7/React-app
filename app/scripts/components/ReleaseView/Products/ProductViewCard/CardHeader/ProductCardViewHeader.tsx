import { Avatar, Grid, Tooltip } from "@material-ui/core";
import { COLOR_GRAPHITE_5, COLOR_WHITE } from "../../../../../constant/Colors";
import React from "react";
import ProductCardViewHeaderModel from "./ProductCardViewHeaderModel";
import { ProductCardViewHeaderStyle } from "./ProductCardViewHeaderStyle";
import { UserAvatar } from "../../../../utils/UserAvatar/UserAvatar";

export function ProductCardViewHeader(productCardViewHeaderProps: ProductCardViewHeaderModel) {

    const CardHeaderStyleClasses = ProductCardViewHeaderStyle();
    const MAX_USER_AVATARS: number = productCardViewHeaderProps.userAvatars.length > 4 ? 3 : 4;
    const TOOL_TIP_AVATAR_SIZE: string = "30px";
    const PM_TOOLTIP_COMPONENT: React.ReactNode = <Grid container direction="column">
        {
            productCardViewHeaderProps.userAvatars.map((userAvatar: string, index: number) => {
                return ((index >= MAX_USER_AVATARS) && (
                    <Grid item className={CardHeaderStyleClasses.productManagersGrid}>
                        <UserAvatar
                            displayText={true}
                            avatarSize={TOOL_TIP_AVATAR_SIZE}
                            userName={userAvatar}
                        />
                    </Grid>
                ))
            })
        }
    </Grid>

    const getProductNameGridStyle = () => {
        const numberOfAvatars: number = productCardViewHeaderProps.userAvatars.length < 4 ? productCardViewHeaderProps.userAvatars.length : 4;
        switch (numberOfAvatars) {
            case 1:
                return CardHeaderStyleClasses.productNameGridForOneUserAvatars;
            case 2:
                return CardHeaderStyleClasses.productNameGridForTwoUserAvatars;
            case 3:
                return CardHeaderStyleClasses.productNameGridForThreeUserAvatars;
            case 4:
                return CardHeaderStyleClasses.productNameGridForFourUserAvatars;
        }
    }

    const getUserAvatarGridStyle = () => {
        const numberOfAvatars: number = productCardViewHeaderProps.userAvatars.length < 4 ? productCardViewHeaderProps.userAvatars.length : 4;
        switch (numberOfAvatars) {
            case 1:
                return CardHeaderStyleClasses.userAvatarGridForOneUserAvatars;
            case 2:
                return CardHeaderStyleClasses.userAvatarGridForTwoUserAvatars;
            case 3:
                return CardHeaderStyleClasses.userAvatarGridForThreeUserAvatars;
            case 4:
                return CardHeaderStyleClasses.userAvatarGridForFourUserAvatars;
        }
    }

    return (
        <Grid container className={CardHeaderStyleClasses.cardHeader}>
            <Grid item className={getProductNameGridStyle()}>
                <Grid container className={CardHeaderStyleClasses.cardHeader}>
                    <Grid item className={CardHeaderStyleClasses.avatar}>
                        <Avatar src={productCardViewHeaderProps.productThumbnail} />
                    </Grid>
                    <Grid item className={CardHeaderStyleClasses.productNameItem}>
                        <Tooltip title={productCardViewHeaderProps.productName} arrow placement="right-start">
                            <div className={CardHeaderStyleClasses.productName}>
                                {productCardViewHeaderProps.productName}
                            </div>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={getUserAvatarGridStyle()}>
                <Grid spacing={1} container className={CardHeaderStyleClasses.avatarGrid}>
                    {
                        (productCardViewHeaderProps.userAvatars.length > 4) ? (<Grid item className={CardHeaderStyleClasses.avatar}>
                            <Tooltip
                                arrow
                                placement="bottom"
                                title={PM_TOOLTIP_COMPONENT}
                            >
                                <Avatar
                                    style={{
                                        color: COLOR_WHITE,
                                        backgroundColor: COLOR_GRAPHITE_5
                                    }}
                                >
                                    ...
                                </Avatar>
                            </Tooltip>
                        </Grid>) : null
                    }
                    {
                        productCardViewHeaderProps.userAvatars.map((userAvatar: string, index: number) => {
                            return ((index < MAX_USER_AVATARS) && (<Grid item>
                                <UserAvatar userName={userAvatar}
                                displayText={false}
                                smallFont={false}
                                avatarSize={"40px"}/>
                            </Grid>))
                        })
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}