import { useLocation, useRoutes } from "react-router-dom"

import Navigation from "./components/Navigation/Nav"
import Home from "./pages/Home"
import Footer from "./components/Footer/Footer"
import ActivitiesPage from "./pages/ActivitiesPage"
import StayPage from "./pages/Stay/StayPage"
import AStay from "./pages/Stay/AStay"
import ContactPage from "./pages/ContactPage"
import MyListPage from "./pages/MyListPage"
import Backoffice from "./pages/Backoffice/Backoffice"
import ProtectedRoute from "./components/ProtectedRoute"
import useAuth from "./hooks/useAuth"
import Login from "./components/Login/Login"
import SuccesMsg from "./components/SuccesMsg/SuccesMsg"
import { BackofficeActivities, BackofficeReviews, BackofficeStays } from "./pages/Backoffice/BackofficeItems"
import ActivityForm from "./pages/Backoffice/Forms/ActivityForm"
import ReviewForm from "./pages/Backoffice/Forms/ReviewForm"
import StayForm from "./pages/Backoffice/Forms/StayForm"

function App() {
  // Henter authentication state via custom hook useAuth
  const { signedIn } = useAuth()

  const location = useLocation() // Bruges til at hente den nuværende URL (path)
  
  // Bestemmer om navigationen og footer skal vises baseret på URL'en
  const isNav = ["/", "/activitiespage", "/stay", "/stay/:id", "/contact", "/mylist", "/login", "/backoffice"].includes(location.pathname)
  const isFooter = ["/", "/activitiespage", "/stay", "/stay/:id", "/contact", "/mylist"].includes(location.pathname)

  // Definerer ruterne i appen
  const routes = useRoutes([
    { 
      path: "/", 
      element: <Home />
    },
    { 
      path: "/activitiespage", 
      element: <ActivitiesPage />
    },
    { 
      path: "/stay", 
      element: <StayPage />,
      children: [
        {
          path: "/stay/:id", // Rute til at vise detaljer for et specifikt sted
          element: <AStay /> // Sted detaljevisning
        }
      ]
    },
    { 
      path: "/contact", 
      element: <ContactPage />
    },
    { 
      path: "/mylist", 
      element: <MyListPage />
    },
    { 
      path: "/login", 
      element: <Login />
    },
    { 
      path: "/backoffice", 
      element: (
        <ProtectedRoute isAllowed={signedIn}>
            <Backoffice /> {/* Backoffice komponent, beskyttet af login */}
        </ProtectedRoute>
      ),
      children: [
        {
          path: "activities", 
          element: <BackofficeActivities />, // Aktivitet oversigt i backoffice
          children: [
            {
              path: "add", // Rute til at tilføje ny aktivitet
              element: <ActivityForm />,
            },
            {
              path: "edit/:id", // Rute til at redigere en aktivitet baseret på ID
              element: <ActivityForm isEditMode={true} />,
            },
          ],
        },
        {
          path: "stays", 
          element: <BackofficeStays />, // Ophold oversigt i backoffice
          children: [
            {
              path: "add", // Rute til at tilføje et nyt ophold
              element: <StayForm />,
            },
            {
              path: "edit/:id", // Rute til at redigere et ophold baseret på ID
              element: <StayForm isEditMode={true} />,
            },
          ],
        },
        {
          path: "reviews", 
          element: <BackofficeReviews />, // Udtalelse oversigt i backoffice
          children: [
            {
              path: "add", // Rute til at tilføje en ny udtalelse
              element: <ReviewForm />,
            },
            {
              path: "edit/:id", // Rute til at redigere en udtalelse baseret på ID
              element: <ReviewForm isEditMode={true} />,
            },
          ],
        },
      ],
    },
    { 
      path: "/succes", 
      element: <SuccesMsg /> // Success besked side
    },
    {
      path: "*", // Fallback rute, hvis ingen af de øvrige ruter matches
      element : <div>NOT FOUND</div> // Vis en fejlmeddelelse, hvis ingen rute findes
    },
  ])

  return (
    <>
      {/* Viser navigation kun på bestemte sider */}
      {isNav && <Navigation />}
      <div>{routes}</div>
      {/* Viser footer kun på bestemte sider */}
      {isFooter && <Footer />}
    </>
  )
}

export default App