import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import {
  Login,
  Signup,
  EmailVerification,
  ForgetPassword,
  NewPasword,
} from "./components/authComponents";
import CareerDashboard from "./components/Careerdashboard";
import PublicRoute from "./routes/PublicRouting";
import PrivateRoute from "./routes/PrivateRouting";
import "./App.css";
import Sidebar from "./components/commonComponents/Layoutcomponents/Sidebar/Sidebar";
import Selfassesment from "./components/Selfassesment";
import MyGoal from "./components/MyGoal";
import CaoCalculator from "./components/CaoCalculator";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute restricted>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute restricted>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/forget-password"
          element={
            <PublicRoute restricted>
              <ForgetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/email-verification"
          element={
            <PublicRoute restricted>
              <EmailVerification />
            </PublicRoute>
          }
        />
        <Route
          path="/new-password"
          element={
            <PublicRoute restricted>
              <NewPasword />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Sidebar>
                <CareerDashboard />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/self-assesment"
          element={
            <PrivateRoute >
              <Sidebar>
                <Selfassesment />
              </Sidebar>
            </PrivateRoute>
          }
        />

        <Route
          path="/my-goals"
          element={
            <PrivateRoute >
              <Sidebar>
                <MyGoal/>
              </Sidebar>
            </PrivateRoute>
          }
        />

        <Route
          path="/cao-calculator"
          element={
            <PrivateRoute >
              <Sidebar>
                <CaoCalculator/>
              </Sidebar>
            </PrivateRoute>
          }
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
