import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import PeopleIcon from "@mui/icons-material/People";
import ExitToApp from "@mui/icons-material/ExitToApp";
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GradeIcon from '@mui/icons-material/Grade';
import EditIcon from '@mui/icons-material/Edit';
import styles from "./styles.module.scss";



const Sidebar = () => {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
		window.location = "/login";
	};

	var options = []
	
	if(user.role===1) {
		options = [
			{ name: "Trang chủ", path: "/", icon: <HomeIcon /> },
			{ name: "Quản lý người dùng", path: "/users", icon: <PeopleIcon /> },
			{ name: "Quản lý môn học", path: "/courses", icon: <MenuBookIcon /> },
			{ name: "Quản lý thông báo", path: "/notifications", icon: <NotificationsIcon /> },
			{ name: "Thông tin tài khoản", path: "/me", icon: <AccountCircleIcon /> },

		];
	}
	if(user.role===2) {
		options = [
			{ name: "Trang chủ", path: "/", icon: <HomeIcon /> },
			{ name: "Quản lý nhóm học", path: "/managerGroup", icon: <MenuBookIcon /> },
			{ name: "Xem thời khóa biểu", path: "/timeTable", icon: <ScheduleIcon /> },
			{ name: "Thông tin tài khoản", path: "/me", icon: <AccountCircleIcon /> },
		];
	}
	if(user.role===3) {
		options = [
			{ name: "Trang chủ", path: "/", icon: <HomeIcon /> },
			{ name: "Đăng kí tín chỉ", path: "/groupRegistration", icon: <EditIcon /> },
			{ name: "Xem thời khóa biểu", path: "/timeTable", icon: <ScheduleIcon /> },
			{ name: "Xem điểm", path: "/grade", icon: <GradeIcon /> },
			{ name: "Xem học phí", path: "/tuition", icon: <AttachMoneyIcon /> },
			{ name: "Thông tin tài khoản", path: "/me", icon: <AccountCircleIcon /> },
		];
	}
	

	return (
		<div className={styles.sidebar}>
			<div className={styles.header}>
				<img className={styles.image} src="/image.png" alt="logo" />
				<h1 className={styles.logo}>QLDT PTIT</h1>
			</div>
			<ul>
				{options.map((option) => (
					<li
						className={option.name === "logout" ? styles.logout_link : ""}
						key={option.name}
					>
						<NavLink
							className={styles.option}
							exact={option.path === "/" ? true : false}
							to={option.path}
							activeClassName={styles.sidebar_active}
						>
							{option.icon}
							<span>{option.name}</span>
						</NavLink>
					</li>
				))}
				<li className={styles.logout_link} onClick={logoutHandler}>
					<div className={styles.option}>
						<ExitToApp />
						<span>Đăng xuất</span>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;