import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";
import styles from "./styles.module.scss";

const NotificationDetail = () => {

	const { notifications } = useSelector(
		(state) => state.notifications 
	);
	const { id } = useParams();


	const notification = notifications.find((notification) => notification.id === Number(id));


	

	return (
		<div className={styles.container}>
			<Paper className={styles.form_container}>
				<h1 className={styles.heading}>
					{notification.title} 
				</h1>
				<p className={styles.mes}>
					{notification.message}
				</p>
				
			</Paper>
		</div>
	);
};

export default NotificationDetail;
