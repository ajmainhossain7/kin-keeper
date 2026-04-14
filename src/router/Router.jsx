import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Homepage from "../pages/Homepage";
import Timeline from "../pages/Timeline";
import Stats from "../pages/Stats";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Homepage></Homepage>

            },
            {
                path: "/timeline",
                element: <Timeline></Timeline>
            },
            {
                path: "/stats",
                element: <Stats></Stats>
            }
        ],
        errorElement: <ErrorPage></ErrorPage>
    }
])