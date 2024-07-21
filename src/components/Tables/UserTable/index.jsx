import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteUser } from "../../../redux/usersSlice/apiCalls";
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

const UserTable = ({ users }) => {
	const dispatch = useDispatch();


	const history = useHistory();

	const handleUserDelete = (id) => {
		deleteUser(id, dispatch);
		history.go(0);
	};

	return (
		<TableContainer component={Paper} className={styles.table_container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Họ và tên</TableCell>
						<TableCell align="center">Tài khoản</TableCell>
						<TableCell align="center">Email</TableCell>
						<TableCell align="center">Giới tính</TableCell>
						<TableCell align="center">Ngày sinh</TableCell>
						<TableCell align="center">Sửa-Xóa</TableCell>
					</TableRow>
				</TableHead>
					<TableBody>
						{users &&
							users.length !== 0 &&
							users.map((user) => (
								<TableRow key={user.account_id}>
									<TableCell align="center">{user.name}</TableCell>
									<TableCell align="center">{user.username}</TableCell>
									<TableCell align="center">{user.email}</TableCell>
									<TableCell align="center">{user.gender}</TableCell>
									<TableCell align="center">
										{user.date}-{user.month}-{user.year}
									</TableCell>
									<TableCell align="center">
										<Link to={`/users/${user.account_id}`}>
											<IconButton className={styles.edit_btn}>
												<EditIcon />
											</IconButton>
										</Link>
										<IconButton
											className={styles.delete_btn}
											onClick={() => handleUserDelete(user.account_id)}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						{users && users.length === 0 && (
							<TableRow>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center">
									<img
										className={styles.no_data_img}
										src="./noData.svg"
										alt=""
									/>
								</TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						)}
					</TableBody>
			</Table>
		</TableContainer>
	);
};

export default UserTable;
