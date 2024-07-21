import { useDispatch } from "react-redux";
import Button from "../../Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { deleteGroup } from "../../../redux/groupsSlice/apiCalls"; // Thay đổi import action từ songs sang courses
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

const GroupTable = ({ groups, courseId }) => {
	const dispatch = useDispatch();

	const history = useHistory();

	const handleDelete = (id) => {
		deleteGroup(id, dispatch); // Thay đổi
		history.go(0);
	};

	return (
		<TableContainer component={Paper} className={styles.table_container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Tên nhóm học</TableCell>
						<TableCell align="center">Thứ trong tuần</TableCell>
						<TableCell align="center">Kíp</TableCell>
						<TableCell align="center">Tên giảng viên</TableCell>
						<TableCell align="center">Phòng</TableCell>
						<TableCell align="center">Học kì</TableCell>
						<TableCell align="center">Sửa-Xóa</TableCell>
						<TableCell align="center"></TableCell>
					</TableRow>
				</TableHead>		
					<TableBody>
						{groups.length !== 0 &&
							groups.map((group, index) => (
								<TableRow key={group.groupId}>
									<TableCell align="center">{group.groupName}</TableCell>
									<TableCell align="center">{group.dayOfWeek}</TableCell>
									<TableCell align="center">{group.period}</TableCell>
									<TableCell align="center">{group.teacher.name}</TableCell>
									<TableCell align="center">{group.room}</TableCell>
									<TableCell align="center">{group.term.name}</TableCell>
									<TableCell align="center">
										<Link to={`/course/${courseId}/group/${group.groupId}`}>
											<IconButton className={styles.edit_btn}>
												<EditIcon />
											</IconButton>
										</Link>
										<IconButton
											className={styles.delete_btn}
											onClick={() => handleDelete(group.groupId)}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
									<TableCell align="center">
										<Link to={`/updateGrade/${group.groupId}`}> 
											<Button label="Xem điểm" /> 
										</Link>
									</TableCell>
								</TableRow>
							))}
						{groups.length === 0 && (
							<TableRow>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center">
									<img
										className={styles.no_data_img}
										src="./noData.svg"
										alt=""
									/>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
			</Table>
		</TableContainer>
	);
};

export default GroupTable;
