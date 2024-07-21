import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { getAllUsers } from "./redux/usersSlice/apiCalls";
import { getAllCourses } from "./redux/coursesSlice/apiCalls";
import { getAllTerms } from "./redux/termsSlice/apiCalls";
import { getAllNotifications } from "./redux/notificationsSlice/apiCalls";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Users from "./pages/Users";
import UpdateGrade from "./pages/UpdateGrade";
import Courses from "./pages/Courses";
import Notifications from "./pages/Notifications";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import Profile from "./pages/Profile";
import Tuition from "./pages/Tuition";
import GroupRegistration from "./pages/GroupRegistration";
import Grade from "./pages/Grade";
import TimeTable from "./pages/TimeTable";
import ManagerGroup from "./pages/ManagerGroup";
import NotificationDetail from "./pages/NotificationDetail";
import UserForm from "./components/Forms/UserForm";
import CourseForm from "./components/Forms/CourseForm";
import GroupForm from "./components/Forms/GroupForm";
import NotificationForm from "./components/Forms/NotificationForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function App() {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const [isSidebarVisible, setSidebarVisible] = useState(true);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
			if (window.innerWidth > 768) {
				setSidebarVisible(true);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		let token = null;
		const root = JSON.parse(window.localStorage.getItem("persist:root"));

		if (root) {
			const { auth } = root;
			const { user } = JSON.parse(auth);
			if (user) token = user.token;
		}

		if (user && user.role===1 && token) {
			getAllUsers(dispatch);
			getAllCourses(dispatch); // them
			getAllNotifications(dispatch); // them
		}
		if (user && user.role===2 && token) {
			getAllNotifications(dispatch);
		}
		if (user && user.role===3 && token) {
			getAllNotifications(dispatch);
			getAllTerms(user.account_id, dispatch);
		}
	}, [dispatch, user]);

	const toggleSidebar = () => {
		setSidebarVisible(!isSidebarVisible);
	};

	return (
		<Switch>
			<Route path="/login" component={Login} />
			{user && user.role===1 && (			
				<Fragment>
					<Navbar />
					{isMobile && (
						<button onClick={toggleSidebar} className="toggle-sidebar-btn">
							<FontAwesomeIcon icon={isSidebarVisible ? faTimes : faBars} />
						</button>
					)}
					<div className={`sidebar-container ${isSidebarVisible ? 'visible' : 'hidden'}`}>
						<Sidebar  />
					</div>
					{isSidebarVisible && isMobile && <div className="overlay" onClick={toggleSidebar}></div>}
					<main className={`main ${isSidebarVisible ? '' : 'sidebar-hidden'}`}>
						<Route path="/users/:id" component={UserForm} />
						<Route path="/courses/:id" component={CourseForm} />
						<Route path="/notifications/:id" component={NotificationForm} />
						<Route path="/course/:courseId/group/:groupId" component={GroupForm} />
						<Route path="/groupByCourse/:id" component={Groups} /> 
						<Route path="/detail/:id" component={NotificationDetail} />
						<Route path="/updateGrade/:groupId" component={UpdateGrade} />
						<Route exact path="/" component={Home} />
						<Route exact path="/users" component={Users} />
						<Route exact path="/courses" component={Courses} /> 
						<Route exact path="/notifications" component={Notifications} /> 
						<Route exact path="/me" component={Profile} /> 
					</main> 
				</Fragment>
			)}

			{user && user.role===2 && (			
				<Fragment>
					<Navbar />
					{isMobile && (
						<button onClick={toggleSidebar} className="toggle-sidebar-btn">
							<FontAwesomeIcon icon={isSidebarVisible ? faTimes : faBars} />
						</button>
					)}
					<div className={`sidebar-container ${isSidebarVisible ? 'visible' : 'hidden'}`}>
						<Sidebar />
					</div>
					{isSidebarVisible && isMobile && <div className="overlay" onClick={toggleSidebar}></div>}
					<main className={`main ${isSidebarVisible ? '' : 'sidebar-hidden'}`}>
						<Route exact path="/" component={Home} />
						<Route path="/detail/:id" component={NotificationDetail} />
						<Route exact path="/me" component={Profile} /> 
						<Route exact path="/timeTable" component={TimeTable} />
						<Route exact path="/managerGroup" component={ManagerGroup} />
					</main> 
				</Fragment>
			)}

			{user && user.role===3 && (			
				<Fragment>
					<Navbar />
					{isMobile && (
						<button onClick={toggleSidebar} className="toggle-sidebar-btn">
							<FontAwesomeIcon icon={isSidebarVisible ? faTimes : faBars} />
						</button>
					)}
					<div className={`sidebar-container ${isSidebarVisible ? 'visible' : 'hidden'}`}>
						<Sidebar />
					</div>
					{isSidebarVisible && isMobile && <div className="overlay" onClick={toggleSidebar}></div>}
					<main className={`main ${isSidebarVisible ? '' : 'sidebar-hidden'}`}>
						<Route exact path="/" component={Home} />
						<Route path="/detail/:id" component={NotificationDetail} />
						<Route exact path="/me" component={Profile} /> 
						<Route exact path="/grade" component={Grade} /> 
						<Route exact path="/groupRegistration" component={GroupRegistration} /> 
						<Route exact path="/tuition" component={Tuition} />
						<Route exact path="/timeTable" component={TimeTable} />
					</main> 
				</Fragment>
			)}
			
			{!user && <Redirect to="/login" />}
		</Switch>
	);
}

export default App;
