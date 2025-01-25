import { Card, CardContent, Divider, Grid, Typography } from "@material-ui/core";
import React, { ReactElement } from "react";
import { CardWidgetStyles } from "../../themes/CardWidgetTheme";

/**Interface class to define the type of props*/
export interface CardWidgetProps {
    cardHeading: string;
    cardContent: ReactElement;
    cardSideHeadingComponent?: ReactElement;
}

export default function CardWidget(props: CardWidgetProps) {

    /**Get the Styles */
    const CardWidgetStyleClass = CardWidgetStyles();

    const CARD_SIDE_HEADING_COMPONENT = undefined !== props.cardSideHeadingComponent ? props.cardSideHeadingComponent : null;

    return (
        <Card className={CardWidgetStyleClass.CardClass}>
            <CardContent className={CardWidgetStyleClass.cardContent}>
                <Grid container direction="column" spacing={2} className={CardWidgetStyleClass.cardContentGrid}>
                    <Grid item className={CardWidgetStyleClass.headingRootGrid}>
                        <Typography className={CardWidgetStyleClass.HeadingClass}>
                            {props.cardHeading}
                        </Typography>
                        <div>
                            {CARD_SIDE_HEADING_COMPONENT}
                        </div>
                    </Grid>
                    <Grid item >
                        <Divider light className={CardWidgetStyleClass.DividerClass} />
                    </Grid>
                    <Grid item className={CardWidgetStyleClass.contentGrid}>
                        {props.cardContent}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}