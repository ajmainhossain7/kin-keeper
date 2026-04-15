import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Homepage from "../pages/Homepage";
import Timeline from "../pages/Timeline";
import Stats from "../pages/Stats";
import ErrorPage from "../pages/ErrorPage";
import FriendsDetails from "../components/friends/FriendsDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Homepage></Homepage>,
                loader: () => fetch("/friends.json")   
            },
            {
                path: "/timeline",
                element: <Timeline></Timeline>
            },
            {
                path: "/stats",
                element: <Stats></Stats>
            },
            {
                path: "/friends/:id",
                element: <FriendsDetails></FriendsDetails>,
                loader: () => fetch("/friends.json")
            },
        ],
        errorElement: <ErrorPage></ErrorPage>
    }
])