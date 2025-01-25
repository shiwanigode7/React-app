/**Dropdown index and label value for Target Market field
 * This can be used to map the index and get the corresponding label value
*/
export const targetMarkets = [
    {
        index: 0,
        label: 'Core',
    },
    {
        index: 1,
        label: 'Adjacent',
    },
    {
        index: 2,
        label: 'New',
    }
];

/**Dropdown index and label value for Channel Partner field
 * This can be used to map the index and get the corresponding label value
*/
export const channelPartners = [
    {
        index: 0,
        label: 'Core',
    },
    {
        index: 1,
        label: 'Adjacent',
    },
    {
        index: 2,
        label: 'New',
    }
];

/**Dropdown index and label for Positioning field
 * This can be used to map the index and get the corresponding label value
*/
export const positioning = [
    {
        index: 0,
        label: 'Existing',
    },
    {
        index: 1,
        label: 'Rarely Used',
    },
    {
        index: 2,
        label: 'Unfamiliar',
    }
];

/**Dropdown index and label for Idea Type field
 * This can be used to map the index and get the corresponding label value
*/
export const ideaTypes = [
    {
        index: 0,
        label: 'Incremental',
    },
    {
        index: 1,
        label: 'Architectural',
    },
    {
        index: 2,
        label: 'Discontinuous',
    }
];

/**Array of object which is used to map index to its score
 * For Now Every index of Every fields has the same score so just defined a single array of object which is used for every fields to map and get a score
 * If the index and score vary for different fields we can have individual array of objects for each fields
*/
export const indexToScoreMapping = [
    {
        index: 0,
        score: 1
    },
    {
        index: 1,
        score: 2
    },
    {
        index: 2,
        score: 3
    }
]

/**This contains the Text, Description, Heading values to be displayed in Risk Profile */
export enum DescriptionValues {
    TARGET_MARKET = "Target Market (Who)",
    CHANNEL_PARTNER = "Channel Partner (How)",
    POSITIONING = "Positioning (why)",
    IDEA_TYPE = "Idea Type (what)",
    CORE = "Core: ",
    ADJACENT = "Adjacent/minor: ",
    NEW = "New/unfamiliar: ",
    EXISTING = "Existing/familiar: ",
    RARELY_USED = "Rarely used: ",
    UNFAMILIAR = "Unfamiliar/unheard of: ",
    INCREMENTAL = "Incremental: ",
    ARCHITECTURAL = "Architectural: ",
    DISCONTINUOUS = "Discontinuous: ",
    TARGET_MARKET_CORE = "Customers we predominantly sell to today",
    TARGET_MARKET_ADJACENT = "Customers we infrequently sell to because there are few of them or our competitors dominate with them",
    TARGET_MARKET_NEW = "Customers we almost never sell to and with unfamiliar needs",
    CHANNEL_PARTNER_CORE = "Existing Channel Partner ",
    CHANNEL_PARTNER_ADJACENT = "New Product in existing Channel",
    CHANNEL_PARTNER_NEW = "New Channel Partner",
    POSITIONING_EXISTING = "The message we currently use to market our products",
    POSITIONING_RARELY_USED = "Could be how competitors market their products or an infrequently used sales point by our salespeople",
    POSITIONING_UNFAMILIAR = "Has to be Experienced to be understood",
    IDEA_TYPE_INCREMENTAL = "Change or improvement to a value adding sub-system consistent with historical development, magnitude not a factor",
    IDEA_TYPE_ARCHITECTURAL = "Incorporates a new value adding sub-system or significant rearrangement of traditional sub-systems",
    IDEA_TYPE_DISCONTINUOUS = "Mostly new and unfamiliar value adding sub-systems",
}