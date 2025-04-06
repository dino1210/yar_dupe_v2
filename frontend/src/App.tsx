import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Login from "./pages/AuthPages/Login";
import Check from "./pages/Check";
import Categories from "./pages/Categories";
import Reports from "./pages/Reports" ;
import Projects from "./pages/Projects" ;
import UserManagement from "./pages/UserManagement" ;
import Settings from "./pages/Settings" ;
import ToolsAndEquipments from "./pages/ToolsAndEquipments"
import Consumables from "./pages/Consumables"
import Vehicles from "./pages/Vehicles"
import ResourcesLogs from "./pages/ResourcesLogs";


export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route path="/" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route index path="/home" element={<Home />} />

            {/* Others Page */}
            <Route path="/check" element={<Check />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/usermanagement" element={<UserManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/tools" element={<ToolsAndEquipments />} />
            <Route path="/consumables" element={<Consumables />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/inventory-logs" element={<ResourcesLogs/>} />



            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
