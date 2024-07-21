import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CourseTable from "../../components/Tables/CourseTable"; // Thay đổi import từ SongTable sang CourseTable
import Button from "../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.scss";

const Courses = () => {
	const { courses } = useSelector((state) => state.courses); // Thay đổi từ songs sang courses

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					Quản lý môn học 
				</h1>
				<Link to="/courses/new"> {/* Thay đổi link đến "/songs/new" thành "/courses/new" */}
					<Button startIcon={<AddIcon />} label="Thêm môn học" /> {/* Thay đổi label từ "Add New Song" thành "Add New Course" */}
				</Link>
			</div>
			<CourseTable courses={courses} /> {/* Thay đổi từ SongTable sang CourseTable và truyền courses thay vì songs */}
		</div>
	);
};

export default Courses;
