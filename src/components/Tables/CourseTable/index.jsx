import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../../Button";
import { deleteCourse } from "../../../redux/coursesSlice/apiCalls"; // Thay đổi 
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

const CourseTable = ({ courses }) => {
	const dispatch = useDispatch();
	const history = useHistory();


	const handleDelete = (id) => {
		deleteCourse(id, dispatch); // Thay đổi 
		history.go(0);
	};

	return (
		<TableContainer component={Paper} className={styles.table_container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Mã môn học</TableCell>
						<TableCell align="center">Tên môn học</TableCell>
						<TableCell align="center">Số tín chỉ</TableCell>
						<TableCell align="center">Học kì</TableCell>
						<TableCell align="center">Sửa-Xóa</TableCell>
						<TableCell align="center"></TableCell>
					</TableRow>
				</TableHead>
					<TableBody>
						{courses.length !== 0 &&
							courses.map((course, index) => (
								<TableRow key={course.id}>
									<TableCell align="center">{course.id}</TableCell>
									<TableCell align="center">{course.name}</TableCell>
									<TableCell align="center">{course.num_credit}</TableCell>
									<TableCell align="center">{course.term}</TableCell>
									<TableCell align="center">
										<Link to={`/courses/${course.id}`}>
											<IconButton className={styles.edit_btn}>
												<EditIcon />
											</IconButton>
										</Link>
										<IconButton
											className={styles.delete_btn}
											onClick={() => handleDelete(course.id)}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
									<TableCell align="center">
										<Link to={`/groupByCourse/${course.id}`}> 
											<Button label="Xem nhóm" /> 
										</Link>
									</TableCell>
								</TableRow>
							))}
						{courses.length === 0 && (
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

export default CourseTable;
