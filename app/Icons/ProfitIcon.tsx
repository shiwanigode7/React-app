import React from "react";
import { COLOR_WHITE } from "../scripts/constant/Colors";

interface ProfitIconPropsModel {
    className?: string;
    fill?: string;
    size?: string;
}

export function ProfitIcon(profitIconProps: ProfitIconPropsModel) {

    return (
        <svg width={undefined !== profitIconProps.size ? profitIconProps.size : "65"} height={undefined !== profitIconProps.size ? profitIconProps.size : "64"} viewBox="0 0 100 81" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M99.9263 5.65788C99.9263 7.06159 99.9628 8.4653 99.9035 9.869C99.8853 10.2543 99.6664 10.8277 99.3838 10.9516C99.0874 11.08 98.5266 10.8736 98.2165 10.6305C97.487 10.0571 96.8305 9.38734 96.1602 8.74053C95.4444 8.05244 95.3806 8.03409 94.6374 8.69466C89.8454 12.9333 85.0717 17.1949 80.2615 21.4106C75.082 25.952 69.8751 30.4659 64.6637 34.9706C63.2731 36.1725 61.4447 36.2 59.9629 35.0899C53.3928 30.1769 46.8317 25.2501 40.2662 20.328C39.5184 19.7683 38.7388 19.2592 38.0092 18.6766C37.4621 18.2454 37.0381 18.2958 36.4955 18.7133C31.5394 22.4978 26.5696 26.2731 21.5862 30.0255C15.4857 34.6174 9.37602 39.1955 3.25726 43.7598C2.10829 44.6176 0.859003 44.4158 0.261717 43.3882C-0.212464 42.5625 -0.0528837 41.7047 0.827087 40.9707C2.0399 39.9615 3.28918 38.9936 4.54302 38.0349C14.4917 30.4659 24.4449 22.8969 34.4027 15.3416C34.8952 14.9655 35.4104 14.5847 35.9712 14.3554C37.143 13.8829 38.2783 13.97 39.3406 14.7636C44.0459 18.2821 48.7604 21.7822 53.4748 25.2868C56.1102 27.2456 58.7455 29.2181 61.3991 31.154C62.3065 31.8191 62.498 31.7733 63.346 31.0255C72.8615 22.6262 82.3725 14.2223 91.888 5.82302C92.5674 5.22209 92.5583 5.14411 91.9245 4.46519C91.0901 3.57526 90.233 2.70826 89.4579 1.77246C88.7466 0.914638 88.9654 0.341228 90.0597 0.148563C90.7664 0.0247063 91.5005 0.020119 92.2209 0.0247063C94.2863 0.0247063 96.3563 0.0292936 98.4217 0.0843409C99.712 0.116452 99.9445 0.373339 99.981 1.68071C100.018 3.00644 99.9902 4.33216 99.9902 5.65788C99.9674 5.65788 99.9446 5.65788 99.9263 5.65788Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M62.2833 49.8379C65.4521 49.8425 68.4978 50.3838 71.2517 52.0719C72.469 52.8151 73.4949 53.7646 73.9691 55.1592C74.5709 56.9253 73.8825 58.3611 72.6788 59.6042C71.4021 60.9254 69.7972 61.719 68.0692 62.2006C63.7195 63.4071 59.3789 63.3612 55.1751 61.6181C53.9669 61.118 52.8042 60.3061 51.8741 59.3841C50.0503 57.5721 50.1278 55.3106 51.8741 53.4114C53.2328 51.9343 54.9654 51.0444 56.8621 50.5765C58.6266 50.1407 60.4504 49.9434 62.2513 49.6453C62.2605 49.7049 62.2741 49.7691 62.2833 49.8379Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M87.288 31.8971C90.1513 31.9568 92.9508 32.2182 95.463 33.6953C96.4706 34.2871 97.4555 35.0256 98.226 35.9018C99.6166 37.4798 99.5528 39.4432 98.2306 41.09C96.7716 42.9112 94.7745 43.8699 92.5951 44.4387C88.5418 45.4938 84.5204 45.347 80.5765 43.8745C79.1083 43.3286 77.7815 42.535 76.742 41.324C75.1508 39.4661 75.2283 37.0899 76.9791 35.3835C78.6022 33.8008 80.6038 32.888 82.7741 32.4292C84.2468 32.1173 85.7788 32.0669 87.288 31.8971Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M12.0935 68.8522C9.20284 69.1045 6.34407 68.5357 3.74976 66.9531C2.90626 66.4393 2.10836 65.7558 1.48828 64.9852C0.0976546 63.2603 0.207081 61.2649 1.65698 59.5905C2.77404 58.3015 4.21938 57.4941 5.79694 56.9482C10.7804 55.2143 15.6863 55.4299 20.4692 57.696C21.1622 58.0217 21.8188 58.4804 22.3933 58.9896C24.714 61.0355 24.673 64.0631 22.2519 65.9806C20.0725 67.7054 17.5785 68.7146 14.7836 68.8476C13.9264 68.8889 13.0692 68.8522 12.0935 68.8522Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M37.4348 56.9528C34.5304 56.9482 31.6899 56.6822 29.1366 55.15C28.3251 54.6638 27.5408 54.0766 26.9025 53.3839C24.7961 51.0995 25.0058 49.0673 27.3904 46.8608C28.7947 45.5626 30.5774 44.7874 32.4285 44.402C37.2798 43.402 42.0398 43.5213 46.4078 46.2461C47.1555 46.714 47.8577 47.3654 48.3546 48.0902C49.613 49.9251 49.4261 51.8243 47.8485 53.3931C45.9928 55.2372 43.6858 56.2602 41.1371 56.6684C39.9197 56.8657 38.6704 56.8657 37.4348 56.9528Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M25.4527 60.4988C28.9589 63.609 32.9667 64.5631 37.3802 64.5815C41.7846 64.5998 45.7239 63.4805 49.1435 60.6135C49.2119 60.6364 49.2803 60.664 49.3532 60.6869C49.3532 61.3429 49.2575 62.0126 49.3715 62.6502C49.6861 64.398 48.7742 65.421 47.4428 66.2604C44.8576 67.8889 42.1129 68.9715 38.9988 68.8798C37.6583 68.8385 36.3133 68.9119 34.9682 68.8614C31.5122 68.733 28.5075 67.4348 25.8722 65.2237C25.7035 65.0815 25.4801 64.8705 25.4755 64.687C25.439 63.3475 25.4527 62.008 25.4527 60.4988Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M50.4836 60.4529C53.9853 63.7053 58.0523 64.5906 62.3928 64.5769C66.7334 64.5677 70.7868 63.6273 74.3021 60.5263C74.3021 62.008 74.3158 63.3154 74.2838 64.6182C74.2793 64.7787 74.0559 64.953 73.9054 65.0906C71.3612 67.4026 68.3794 68.6962 64.9552 68.8568C63.2774 68.9348 61.5949 68.9027 59.9171 68.8568C56.5613 68.7696 53.6524 67.4669 51.0809 65.3659C50.7572 65.0998 50.5383 64.5539 50.5064 64.1181C50.4335 62.9897 50.4836 61.852 50.4836 60.4529Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M24.2761 66.7329C24.2761 67.9394 24.3081 69.0816 24.2533 70.2193C24.2397 70.5037 23.9935 70.8248 23.77 71.0496C21.9645 72.8799 19.7167 73.8845 17.2592 74.435C13.5888 75.2561 9.93218 75.1827 6.30743 74.1552C4.31952 73.5955 2.47295 72.7377 0.972896 71.2789C0.662855 70.9762 0.439443 70.4532 0.407527 70.0174C0.325457 68.9624 0.38017 67.8935 0.38017 66.6595C0.722128 66.8797 0.954659 67.0082 1.16439 67.1641C3.98212 69.3248 7.12357 70.5541 10.7073 70.4532C12.7681 70.3982 14.8564 70.4899 16.8808 70.1642C19.2927 69.7789 21.504 68.733 23.4099 67.1274C23.5694 66.9944 23.7336 66.8706 23.9068 66.7605C23.9615 66.7329 24.0527 66.7513 24.2761 66.7329Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M99.1745 48.7324C99.1745 50.127 99.2018 51.3426 99.1517 52.5582C99.1425 52.8197 98.8963 53.1133 98.6866 53.3197C96.7762 55.2188 94.3779 56.1363 91.811 56.6317C88.127 57.3427 84.4703 57.2143 80.8729 56.0583C79.0856 55.4849 77.426 54.65 76.0764 53.3105C75.8165 53.0536 75.6068 52.6224 75.5885 52.26C75.5247 51.1499 75.5657 50.0306 75.5657 48.7875C75.8302 48.9434 76.008 49.0214 76.1539 49.1361C78.8439 51.3059 81.9125 52.4481 85.3594 52.494C87.1649 52.5169 88.9796 52.5353 90.776 52.3977C93.7396 52.1683 96.3339 50.9527 98.6547 49.1132C98.7778 49.0168 98.9009 48.9297 99.1745 48.7324Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M50.529 66.6733C50.8481 66.8889 51.0351 67.0081 51.2083 67.1412C53.9896 69.3018 57.1037 70.522 60.6509 70.4578C62.7346 70.4211 64.8501 70.5082 66.8973 70.1871C69.3549 69.8018 71.6255 68.7559 73.5541 67.0907C73.6726 66.9898 73.8003 66.9026 73.928 66.8201C73.9645 66.7971 74.0237 66.8155 74.1651 66.8155C74.1651 68.0403 74.1924 69.2743 74.1423 70.5037C74.1332 70.7605 73.855 71.045 73.6407 71.256C71.9127 72.9808 69.7515 73.8799 67.4399 74.412C63.4094 75.3386 59.4062 75.1919 55.4714 73.857C53.789 73.2881 52.2707 72.4303 50.9621 71.2147C50.7934 71.0587 50.5518 70.8615 50.5472 70.678C50.5107 69.3981 50.529 68.1137 50.529 66.6733Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M25.439 66.7926C26.7931 67.5953 27.974 68.3798 29.2324 69.0174C31.2431 70.0358 33.3906 70.5358 35.6566 70.4624C37.6674 70.3982 39.7054 70.5266 41.6751 70.2238C44.2193 69.8339 46.5628 68.7743 48.5553 67.054C48.6693 66.9577 48.8015 66.8797 49.0158 66.7283C49.0614 66.9898 49.1206 67.1733 49.1252 67.3568C49.1389 67.8522 49.0477 68.3614 49.1434 68.8339C49.4854 70.5633 48.5279 71.5266 47.2513 72.3799C45.2953 73.6872 43.1159 74.3753 40.8316 74.7285C37.3345 75.2698 33.8921 75.0175 30.5227 73.8707C28.7628 73.2698 27.1761 72.3799 25.822 71.0908C25.6624 70.9395 25.4572 70.7239 25.4526 70.5312C25.4253 69.3064 25.439 68.0678 25.439 66.7926Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M50.4837 72.522C54.0766 75.5038 58.025 76.5864 62.3838 76.5497C66.6879 76.513 70.6774 75.6506 74.1882 72.5129C74.1882 73.6276 74.1061 74.5221 74.2064 75.3983C74.3341 76.5267 73.8919 77.2194 72.9936 77.8479C70.6729 79.4672 68.1242 80.3801 65.3384 80.77C62.2972 81.192 59.3108 80.9672 56.3836 80.0911C54.4185 79.5039 52.5674 78.6277 51.0537 77.1919C50.7573 76.9121 50.5384 76.4167 50.5111 76.0038C50.4336 74.9212 50.4837 73.834 50.4837 72.522Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M75.5794 66.9027C77.1433 67.7559 78.5977 68.6366 80.1252 69.3614C81.7483 70.1321 83.4991 70.4945 85.3047 70.4578C87.3929 70.4119 89.5039 70.5358 91.5602 70.256C94.2275 69.8936 96.6531 68.7789 98.7276 66.9898C98.8188 66.9118 98.9283 66.8522 99.1471 66.6962C99.1471 68.0953 99.1699 69.3798 99.1243 70.6596C99.1197 70.8661 98.8599 71.0908 98.682 71.2652C96.9631 72.9533 94.843 73.8753 92.5496 74.4074C88.5145 75.3432 84.5113 75.2056 80.572 73.8616C78.8622 73.279 77.3257 72.4028 75.9943 71.1734C75.8165 71.0083 75.6022 70.7651 75.5931 70.5541C75.5612 69.3202 75.5794 68.0816 75.5794 66.9027Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M25.5527 54.65C28.9267 57.7556 32.9527 58.673 37.2704 58.6822C41.5563 58.6914 45.5367 57.7005 49.0976 54.7738C49.0976 56.2739 49.1204 57.5537 49.0748 58.8336C49.0702 59.0308 48.7921 59.2464 48.6052 59.407C46.3118 61.3657 43.5989 62.3749 40.6718 62.8199C36.7142 63.4163 32.8569 63.0217 29.1683 61.3841C28.8173 61.2281 28.4707 61.0538 28.1333 60.8566C25.3749 59.2602 24.8323 57.9895 25.5527 54.65Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M0.380092 72.733C8.28159 77.9534 16.1056 77.9763 23.9888 72.9486C23.9888 74.0817 24.0344 75.3432 23.9569 76.5909C23.9387 76.9075 23.5648 77.2469 23.2776 77.4946C21.5131 79.0222 19.4157 79.8662 17.1816 80.3892C13.8851 81.1599 10.5841 81.1644 7.28763 80.3892C4.91673 79.8295 2.71908 78.8892 0.940902 77.1643C0.644539 76.8799 0.430246 76.3845 0.402889 75.9671C0.329938 74.8982 0.380092 73.811 0.380092 72.733Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M25.443 72.5129C28.972 75.4487 32.9068 76.6093 37.2611 76.5818C41.5561 76.5589 45.5547 75.6735 49.1247 72.5954C49.1247 73.568 49.0563 74.334 49.1384 75.0772C49.298 76.4763 48.6733 77.3708 47.5699 78.1185C45.4681 79.5406 43.1336 80.3021 40.667 80.6966C37.8857 81.1416 35.109 81.0452 32.3643 80.3984C29.9432 79.8296 27.7091 78.8708 25.8899 77.0956C25.712 76.9213 25.4658 76.6919 25.4613 76.4809C25.4248 75.224 25.443 73.9579 25.443 72.5129Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M75.5695 54.595C79.1122 57.5308 83.0333 58.7006 87.3556 58.6639C91.6415 58.6272 95.6401 57.7281 99.1554 54.7188C99.1554 56.2051 99.1737 57.5079 99.1372 58.8153C99.1326 58.9942 98.891 59.1914 98.7223 59.3382C96.6933 61.0906 94.3179 62.0952 91.7053 62.5814C88.4134 63.2007 85.1397 63.2053 81.8889 62.3062C79.7186 61.7098 77.7079 60.8061 76.071 59.2052C75.8112 58.9483 75.6105 58.5171 75.5877 58.1501C75.5285 57.0446 75.5695 55.9299 75.5695 54.595Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M75.5835 72.7881C83.4576 77.9075 91.2497 78.0222 99.1649 72.8707C99.1649 74.0771 99.1877 75.3386 99.1421 76.5955C99.1329 76.8249 98.8639 77.0772 98.6633 77.2607C96.876 78.8892 94.7285 79.8204 92.4215 80.3846C89.1022 81.2012 85.7556 81.114 82.4454 80.38C80.0836 79.8571 77.8997 78.8341 76.0759 77.1781C75.8753 76.9946 75.6108 76.7377 75.6017 76.5084C75.5607 75.256 75.5835 73.9945 75.5835 72.7881Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M75.6519 60.6777C77.6215 62.3842 79.7918 63.3842 82.1035 64.0815C82.6688 64.2512 83.257 64.3934 83.8452 64.4255C88.1356 64.6778 92.4351 64.898 96.3699 62.6503C97.2818 62.1319 98.1435 61.5172 99.1284 60.8842C99.1284 62.2328 99.1466 63.5356 99.1101 64.8338C99.1056 65.0127 98.8502 65.21 98.677 65.3568C96.2696 67.3889 93.4656 68.6045 90.3697 68.7972C87.8894 68.9532 85.368 68.7743 82.8831 68.5312C80.38 68.288 78.2416 67.0357 76.2902 65.4898C76.0075 65.265 75.6975 64.8705 75.6792 64.5402C75.6108 63.3154 75.6519 62.0769 75.6519 60.6777Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
            <path d="M99.1646 43.0534C99.1646 44.2323 99.1828 45.4938 99.1463 46.7507C99.1418 46.9618 98.9138 47.2095 98.7314 47.3654C96.3103 49.4572 93.4926 50.7187 90.3193 50.8931C88.0076 51.0215 85.6595 51.0123 83.3661 50.7325C80.553 50.3885 78.0453 49.1361 75.9023 47.2324C75.7427 47.0948 75.5969 46.8425 75.5923 46.6406C75.5649 45.425 75.5786 44.2048 75.5786 42.9984C83.4528 48.0306 91.2631 48.1545 99.1646 43.0534Z" fill={undefined !== profitIconProps.fill ? profitIconProps.fill: COLOR_WHITE}/>
        </svg>
    );
}