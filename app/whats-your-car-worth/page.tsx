'use client';

import { WhatsYourCarWorthPage } from "@/components/car_worth/CarWorthLandingPage";


export default function WhatsYourCarWorth() {
    console.log(process.env.KINDE_POST_LOGIN_REDIRECT_URL)
    return (
        <>
            <WhatsYourCarWorthPage />
        </>
    );
}