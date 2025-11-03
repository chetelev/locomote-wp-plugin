import { registerComponent } from "./componentRegistry";
import Dashboard from "../pages/Dashboard/Dashboard";
import Step1 from "../components/Steps/Step1";
import Step2 from "../components/Steps/Step2";
import Step3 from "../components/Steps/Step3";
import Step4 from "../components/Steps/Step3";
import StatusConsole from "../components/Dashboard/StatusConsole";
import Settings from "../pages/Settings/Settings";
import Tasks from "../pages/Tasks/Tasks";

// Register components\
registerComponent("Dashboard", Dashboard);
registerComponent("Settings", Settings);
registerComponent("Tasks", Tasks);
registerComponent("Step1", Step1);
registerComponent("Step2", Step2);
registerComponent("Step3", Step3);
registerComponent("Step4", Step4);
registerComponent("StatusConsole", StatusConsole);

// You can extend this file to register more components
