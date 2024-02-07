import { createBrowserRouter, Navigate } from "react-router-dom";
import { QuestionsLayout } from "../pages/layout/QuestionsLayout";
import {RolePage} from "../pages/RolePage";
import {ClientInfoPage} from "../pages/ClientInfoPage";
import {EmploymentStatusPage} from "../pages/EmploymentStatusPage";
import {TargetCreditPage} from "../pages/TargetCreditPage";
import {RegionPage} from "../pages/RegionPage";
import {SalerPage} from "../pages/SalerPage";
import {CreditSumPage} from "../pages/CreditSumPage";
import {ProofIncomePage} from "../pages/ProofIncomePage";
import {SourceInitialPaymentPage} from "../pages/SourceInitialPaymentPage";
import {AdditionalConditionsPage} from "../pages/AdditionalConditionsPage";
import {ActualAddressPage} from "../pages/ActualAddressPage";
import React from "react";
import {CheckIdProvider} from "../helpers/CheckIdProvider";
import {SocialStatusPage} from "../pages/SocialStatusPage";
import {ContactsPage} from "../pages/ContactsPage";
import {EmploymentPage} from "../pages/EmploymentPage";
import {OrganizationPage} from "../pages/OrganizationPage";
import {StartPage} from "../pages/StartPage";
import {OrganizationInfoPage} from "../pages/OrganizationInfoPage";
import {WorkExperiencePage} from "../pages/WorkExperiencePage";
import {FinancePage} from "../pages/FinancePage";
import {PartTimeWorkExperiencePage} from "../pages/PartTimeWorkExperiencePage";
import {VehicleFirstPage} from "../pages/VehicleFirstPage";
import {VehicleSecondPage} from "../pages/VehicleSecondPage";
import {VehicleThirdPage} from "../pages/VehicleThirdPage";
import {ImmovablesFirstPage} from "../pages/ImmovablesFirstPage";
import {ImmovablesSecondPage} from "../pages/ImmovablesSecondPage";
import {ImmovablesThirdPage} from "../pages/ImmovablesThirdPage";
import {LPHPage} from "../pages/LPHPage";
import {PassportDetailsPage} from "../pages/PassportDetailsPage";
import {SuccessPage} from "../pages/SuccessPage";
import {UploadFilesPage} from "../pages/UploadFilesPage";
import {PartOrganizationPage} from "../pages/PartOrganizationPage";
import {UploadPage} from "../pages/UploadPage";
import {OtherPage} from "../pages/OtherPage";
import {AdditionalInformationPage} from "../pages/AdditionalInformationPage";
import {AppLayout} from "../pages/layout/AppLayout";
import {PartTimeEmploymentPage} from "../pages/PartTimeEmploymentPage";
import {AllInPage} from "../pages/AllInPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout><QuestionsLayout/></AppLayout>,
        children: [
            {
                path: "/",
                element: <CheckIdProvider><StartPage/></CheckIdProvider>
            },
            {
                path: '/role',
                element: <CheckIdProvider><RolePage/></CheckIdProvider>
            },
            {
                path: '/client-info',
                element: <CheckIdProvider><ClientInfoPage/></CheckIdProvider>
            },
            {
                path: '/employment-status',
                element: <CheckIdProvider><EmploymentStatusPage/></CheckIdProvider>
            },
            {
                path: '/credit-target',
                element: <CheckIdProvider><TargetCreditPage/></CheckIdProvider>
            },
            {
                path: '/region',
                element: <CheckIdProvider><RegionPage/></CheckIdProvider>
            },
            /*{
                path: '/seller',
                element: <CheckIdProvider><SalerPage/></CheckIdProvider>
            },*/
            {
                path: '/credit-info',
                element: <CheckIdProvider><CreditSumPage/></CheckIdProvider>
            },
            {
                path: '/income-proof',
                element: <CheckIdProvider><ProofIncomePage/></CheckIdProvider>
            },
            {
                path: '/source-initial-payment',
                element: <CheckIdProvider><SourceInitialPaymentPage/></CheckIdProvider>
            },
            {
                path: '/additional-conditions',
                element: <CheckIdProvider><AdditionalConditionsPage/></CheckIdProvider>
            },
            {
                path: '/actual-address',
                element: <CheckIdProvider><ActualAddressPage/></CheckIdProvider>
            },
            {
                path: '/social-status',
                element: <CheckIdProvider><SocialStatusPage/></CheckIdProvider>
            },
            /*{
                path: '/contacts-and-documents',
                element: <CheckIdProvider><ContactsPage/></CheckIdProvider>
            },*/
            {
                path: '/employment-info',
                element: <CheckIdProvider><EmploymentPage/></CheckIdProvider>
            },
            {
                path: '/organization',
                element: <CheckIdProvider><OrganizationPage/></CheckIdProvider>
            },

            {
                path: '/part-time-jop-employment-info',
                element: <CheckIdProvider><PartTimeEmploymentPage/></CheckIdProvider>
            },

            {
                path: '/part-time-jop-organization',
                element: <CheckIdProvider><PartOrganizationPage/></CheckIdProvider>
            },
            /*{
                path: '/organization-info',
                element: <CheckIdProvider><OrganizationInfoPage/></CheckIdProvider>
            },*/
            {
                path: '/work-experience',
                element: <CheckIdProvider><WorkExperiencePage/></CheckIdProvider>
            },
            {
                path: '/part-time-work-experience',
                element: <CheckIdProvider><PartTimeWorkExperiencePage/></CheckIdProvider>
            },
            /*{
                path: '/part-time-work-experience',
                element: <CheckIdProvider><PartTimeWorkExperiencePage/></CheckIdProvider>
            },*/
            {
                path: '/client-finance',
                element: <CheckIdProvider><FinancePage/></CheckIdProvider>
            },
            {
                path: '/assets-Vehicle-1',
                element: <CheckIdProvider><VehicleFirstPage/></CheckIdProvider>
            },

            /*{
                path: '/assets-Vehicle-2',
                element: <CheckIdProvider><VehicleSecondPage/></CheckIdProvider>
            },
            {
                path: '/assets-Vehicle-3',
                element: <CheckIdProvider><VehicleThirdPage/></CheckIdProvider>
            },*/

            {
                path: '/assets-immovables-1',
                element: <CheckIdProvider><ImmovablesFirstPage/></CheckIdProvider>
            },

            {
                path: '/assets-immovables-2',
                element: <CheckIdProvider><ImmovablesSecondPage/></CheckIdProvider>
            },
            {
                path: '/assets-immovables-3',
                element: <CheckIdProvider><ImmovablesThirdPage/></CheckIdProvider>
            },


            {
                path: '/lph-data',
                element: <CheckIdProvider><LPHPage/></CheckIdProvider>
            },
            /*{
                path: '/passport-detail',
                element: <CheckIdProvider><PassportDetailsPage/></CheckIdProvider>
            },*/
            {
                path: '/other',
                element: <CheckIdProvider><OtherPage/></CheckIdProvider>
            },
            {
                path: '/additional-information',
                element: <CheckIdProvider><AdditionalInformationPage/></CheckIdProvider>
            },
            {
                path: '/upload-files',
                element: <CheckIdProvider><UploadPage/></CheckIdProvider>
            },
            {
                path: '/success',
                element: <CheckIdProvider><SuccessPage/></CheckIdProvider>
            }
        ]
    },
    {
        path: '/:deal_id',
        element: <AppLayout><QuestionsLayout/></AppLayout>,
        children: [
            {
                path: "/:deal_id",
                element: <CheckIdProvider><StartPage/></CheckIdProvider>
            },
        ]
    },
    {
        path: '/success',
        element: <QuestionsLayout/>,
        children: [
            {
                path: "",
                element: <SuccessPage/>
            },
        ]
    },
    {
        path: '/all-in-form',
        element: <QuestionsLayout/>,
        children: [
            {
                path: "",
                element: <AllInPage />
            },
        ]
    }
])
