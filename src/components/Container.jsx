import React from "react";
import DynamicLoader from "../registry/DynamicLoader";

const Container = () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");

  // Map WP admin menu slugs to registered component names
  const routeMap = {
    "diffusal-locomote-dashboard": "Dashboard",
    "diffusal-locomote-settings": "Settings",
    "diffusal-locomote-tasks": "Tasks",
  };

  // Fallback to dashboard component if page is unknown
  const componentToLoad = routeMap[page] || "Dashboard";

  return <DynamicLoader componentName={componentToLoad} />;
};

export default Container;
