import React from "react";
import { Container, Grid, Col } from "@mantine/core";

import AdminContent from "./AdminContent"; 
import AdminLayout from "./AdminLayout"
export function AdminDashboard() {
  return (
    <AdminLayout>
      <h1> Welcome to Admin Dashboard</h1>
      {/* 放你自己想渲染的內容 */}
    </AdminLayout>
  );
}
export default AdminDashboard
