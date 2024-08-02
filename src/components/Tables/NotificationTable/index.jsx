import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { deleteNotification } from "../../../redux/notificationsSlice/apiCalls"; // Thay đổi 
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Paper,
	IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles.module.scss";

const NotificationTable = ({ notifications }) => {
	const user = useSelector((state) => state.auth.user);

	const dispatch = useDispatch();
	const history = useHistory();

	const handleDelete = (id) => {
		deleteNotification(id, dispatch); // Thay đổi 
		// setGroupRegistrations(prevRegistrations => prevRegistrations.filter(gr => gr.id !== id));
	};

	return (
		<TableContainer component={Paper} className={styles.table_container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Tiêu đề</TableCell>
						<TableCell align="center">Ngày tạo</TableCell>
						{user.role === 1 && (
							<TableCell align="center">Sửa-Xóa</TableCell>
                    	)}
					</TableRow>
				</TableHead>
					<TableBody>
						{notifications.length !== 0 &&
							notifications.map((notification) => (
								<TableRow key={notification.id}>
									<TableCell style={{ padding: "0 2rem" }}>
										<Link to={`/detail/${notification.id}`}  className={styles.link}>
											{notification.title}
										</Link>
									</TableCell>
									<TableCell align="center">{new Date(notification.createdAt).toLocaleDateString()}</TableCell>
									{user.role === 1 && (
										<TableCell align="center">
											<Link to={`/notifications/${notification.id}`}>
												<IconButton className={styles.edit_btn}>
													<EditIcon />
												</IconButton>
											</Link>
											<IconButton
												className={styles.delete_btn}
												onClick={() => handleDelete(notification.id)}
											>
												<DeleteIcon />
											</IconButton>
										</TableCell>
                    				)}
								</TableRow>
							))}
						{notifications.length === 0 && (
							<TableRow>
								<TableCell align="center" colSpan={3}>
									<img
										className={styles.no_data_img}
										src="./noData.svg"
										alt="No data"
									/>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
			</Table>
		</TableContainer>
	);
};

export default NotificationTable;
