import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NotificationTable from "../../components/Tables/NotificationTable"; // Thay đổi
import Button from "../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.scss";

const Notifications = () => {
	const { notifications } = useSelector((state) => state.notifications); // Thay đổi 

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					Quản lý thông báo 
				</h1>
				<Link to="/notifications/new"> {/* Thay đổi */}
					<Button startIcon={<AddIcon />} label="Thêm thông báo" /> {/* Thay đổi */}
				</Link>
			</div>
			<NotificationTable notifications={notifications} /> {/* Thay đổi */}
		</div>
	);
};

export default Notifications;