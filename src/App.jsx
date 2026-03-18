import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Admin from "./pages/Admin/index";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./pages/Admin/Layout/AdminLayout";
import Tenant from "./pages/Admin/tenant";
const App = () => {
	return (
		<>
			<Routes>
				<Route element={<ProtectedRoute />}>
					<Route element={<AdminLayout />}>
						<Route index element={<Admin />} />
						<Route path="/tenant" element={<Tenant />} />
					</Route>
				</Route>
				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	);
};

export default App;
