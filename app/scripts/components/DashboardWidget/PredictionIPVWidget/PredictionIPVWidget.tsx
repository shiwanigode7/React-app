import { CircularProgress, Grid, Typography } from "@material-ui/core";
import {
    BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { COLOR_AZURE_2, COLOR_AZURE_3, COLOR_BLACK, COLOR_WHITE } from "../../../constant/Colors";
import { InnovationAppContext } from "../../../context/InnovationAppContext";
import { NodeEventContext } from "../../../context/NodeEventContext";
import BusinessGoalService from "../../../services/service/BusinessGoalService";
import CardWidget from "../../../view/DashboardWidgets/CardWidget";
import { PredictionIPVModel } from "./PredictionIPVModel";
import { PredictionIPVWidgetStyles } from "./PredictionIPVWidgetStyles";

export function PredictionIPVWidget() {

    const predictionIPVWidgetStyleClasses = PredictionIPVWidgetStyles();

    const lInnovationData = useContext(InnovationAppContext);
    const lNodeEventData = useContext(NodeEventContext);

    const CURRENT_ACTIVE: string = "Current Active";
    const NEW_ACTIVE: string = "New Active";

    const [showLoadingIcon, setShowLoadingIcon] = useState<boolean>(false);
    const [ipvArray, setIPVArray] = useState<PredictionIPVModel[]>([]);
    const [resized, setResized] = useState<boolean>(window.innerWidth < 1300);
    const [graphLabel, setGraphLabel] = useState<string[]>([]);
    const [currentActiveArray, setCurrentActiveArray] = useState<number[]>([]);
    const [newActiveArray, setNewActiveArray] = useState<number[]>([]);

    ChartJS.register(
        CategoryScale,
        ChartDataLabels,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        indexAxis: "y" as const,
        devicePixelRatio: 6,
        layout: {
            padding: {
                // String cannot be passed here. By default the number is converted to px internally by chartjs
                right: 100,
                left: 10
            }
        },
        elements: {
            bar: {
                borderWidth: 0
            }
        },
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true, //if true the value will be
                //displayed as 0-28 and 28 -36 if not both will new and current will start from 0
                display: false,
                ticks: {
                    color: COLOR_WHITE,
                    font: {
                        size: 17,
                        family: "sans-serif"
                    }
                },
            },
            y: {
                stacked: true, // similar to x with few minor changes where the stack will be split if index axis is "y"
                //if the index axis is reversed then the roles will be exchanged
                display: true,
                offset: true,
                ticks: {
                    color: COLOR_WHITE,
                    font: {
                        size: 17,
                        family: "sans-serif"
                    }
                },
                grid: {
                    drawBorder: false,
                    drawOnChartArea: false,
                    drawTicks: false
                },
            }
        },
        plugins: {
            legend: {
                position: "none" as const,
            },
            title: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            datalabels: {
                formatter: (inDataValue: any, inCanvasContext: any): string => {
                    let lDataSets: any[] = inCanvasContext.chart.data.datasets;
                    let outLabelString: string = "";
                    if (inCanvasContext.datasetIndex === lDataSets.length - 1) {
                        let sum: number = 0;
                        lDataSets.forEach((dataset: any) => {
                            sum += dataset.data[inCanvasContext.dataIndex];
                        });
                        outLabelString = "total: " + (Math.round((sum + Number.EPSILON) * 100) / 100).toString() + " M$";
                    }
                    // If the canvas is at new Active bar and if the value is not within the new active array
                    else if (1 === inCanvasContext.datasetIndex && -1 === newActiveArray.indexOf(inDataValue)) {
                        outLabelString = newActiveArray[inCanvasContext.dataIndex].toString();
                    }
                    // If we do not define this else, the chartJs will fall back to default else
                    // where it will display the stack value if dataLabels is set to true 
                    else {
                        outLabelString = 0 !== inDataValue ? inDataValue.toString() : "";
                    }
                    return outLabelString;
                },
                font: {
                    size: 14,
                    family: "Helvetica"
                }
            }
        }
    };

    // Aim of this function is to get the modified IPV value just to 
    // make sure that the label doesn't overflow in the graph due to major variation in the value.
    const getAlteredNewIPVValues = (): number[] => {
        const outNewIPVValues: number[] = [];

        graphLabel.forEach((_value: string, inIndex: number) => {
            // Check if the new active ipv value is in the range of 0.x 
            if (ipvArray[inIndex].newActiveIPV > 0 && ipvArray[inIndex].newActiveIPV < 1) {
                // Check if the currentActice IPV values are more than hundered
                if (ipvArray.map((inIPVValue: PredictionIPVModel) => inIPVValue.currentActiveIPV > 100).indexOf(true) > -1) {
                    outNewIPVValues.push(10);
                }
                // Check if the ipv values are less than 10, if yes display the new active values as they are 
                else if (ipvArray.map((inIPVValue: PredictionIPVModel) => inIPVValue.currentActiveIPV < 10).indexOf(true) > -1) {
                    outNewIPVValues.push(ipvArray[inIndex].newActiveIPV);
                } else {
                    outNewIPVValues.push(1);
                }
            } else {
                // if not, Save the values as they are
                outNewIPVValues.push(ipvArray[inIndex].newActiveIPV);
            }

        });

        return outNewIPVValues;
    }

    const data = {
        labels: graphLabel,
        datasets: [
            {
                label: CURRENT_ACTIVE,
                data: currentActiveArray,
                backgroundColor: COLOR_AZURE_2,
                datalabels: {
                    display: true,
                    color: COLOR_WHITE
                }
            },
            {
                label: NEW_ACTIVE,
                data: getAlteredNewIPVValues(),
                backgroundColor: COLOR_AZURE_3,
                datalabels: {
                    display: true,
                    color: COLOR_BLACK
                }
            },
            // Dummy label to display the total of current active and new active
            {
                label: "",
                data: graphLabel.map(() => 0),
                datalabels: {
                    display: true,
                    color: COLOR_WHITE,
                    anchor: "end",
                    align: "end"
                }
            }
        ]
    };

    /**Graph Component*/
    const IPV_COMPONENT: JSX.Element = <Bar options={options} data={data} className={predictionIPVWidgetStyleClasses.graphCanvas} />;

    /**Loading icon component */
    const CIRCULAR_LOADING_COMPONENT: JSX.Element = <div className={predictionIPVWidgetStyleClasses.loadingIconDivClass}>
        <CircularProgress className={predictionIPVWidgetStyleClasses.loadingIconClass} />
    </div>;

    /**Component to be displayed in Card */
    const CARD_DISPLAY_CONTENT: JSX.Element = showLoadingIcon ? CIRCULAR_LOADING_COMPONENT : IPV_COMPONENT;

    const CARD_SIDE_HEADING: JSX.Element = <Grid container className={predictionIPVWidgetStyleClasses.sideHeadingRootGrid}>
        <Grid item className={predictionIPVWidgetStyleClasses.sideHeadingLegendItemGrid}>
            <Grid item className={predictionIPVWidgetStyleClasses.sideHeadingLegendCurrentActiveColor}>
            </Grid>
            <Typography className={predictionIPVWidgetStyleClasses.sideHeadingLegendCurrentActiveText}>
                {CURRENT_ACTIVE}
            </Typography>
        </Grid>
        <Grid item className={predictionIPVWidgetStyleClasses.sideHeadingLegendItemGrid}>
            <Grid item className={predictionIPVWidgetStyleClasses.sideHeadingLegendNewActiveColor}>
            </Grid>
            <Typography className={predictionIPVWidgetStyleClasses.sideHeadingLegendNewActiveText}>
                {NEW_ACTIVE}
            </Typography>
        </Grid>
    </Grid>;

    useEffect(() => {
        setShowLoadingIcon(true);
        BusinessGoalService.innovationGetPredictionIPV(lInnovationData.eskoAccountDetail.repoid)
            .then((getIPVResponse: PredictionIPVModel[]) => {
                setIPVArray(getIPVResponse);
                setShowLoadingIcon(false);
            })
            .catch(() => {
                setIPVArray([]);
                setShowLoadingIcon(false);
            });
    }, [lInnovationData.eskoAccountDetail, lNodeEventData.businessGoalsUpdated]);

    useEffect(() => {
        const lLabelList: string[] = [];
        const lCurrentIPVList: number[] = [];
        const lNewActiveIPVList: number[] = [];
        ipvArray.forEach((ipvData: PredictionIPVModel) => {
            // Space is required to move the axis, no alternative was found in chartjs
            lLabelList.push(ipvData.quarterName.slice(0, ipvData.quarterName.indexOf("'")) + " " + ipvData.quarterName.slice(ipvData.quarterName.indexOf("'"), ipvData.quarterName.length) + "  ");
            lCurrentIPVList.push(ipvData.currentActiveIPV);
            lNewActiveIPVList.push(ipvData.newActiveIPV);
        });
        setGraphLabel(lLabelList);
        setCurrentActiveArray(lCurrentIPVList);
        setNewActiveArray(lNewActiveIPVList);
    }, [ipvArray]);

    window.addEventListener("resize", () => {
        setResized(window.innerWidth < 1300);
    });

    return (
        <CardWidget
            cardHeading={resized ? "IPV Prediction" : "Incremental Pipeline Value Prediction"}
            cardSideHeadingComponent={CARD_SIDE_HEADING}
            cardContent={CARD_DISPLAY_CONTENT}
        />
    );
}