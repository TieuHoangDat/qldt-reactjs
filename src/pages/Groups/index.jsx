import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllGroupsByCourseId } from "../../redux/groupsSlice/apiCalls";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import GroupTable from "../../components/Tables/GroupTable"; // Thay đổi import từ CourseTable sang GroupTable
import Button from "../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.scss";

const Groups = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { groups } = useSelector((state) => state.groups); // Thay đổi từ courses sang groups

	useEffect(() => {
		getAllGroupsByCourseId(id, dispatch);
	}, [id, dispatch]);

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					Quản lý các nhóm của môn {id}
				</h1>
				<Link to={`/course/${id}/group/new`}> {/* Thay đổi link đến "/courses/new" thành "/groups/new" */}
					<Button startIcon={<AddIcon />} label="Thêm nhóm" /> {/* Thay đổi label từ "Thêm môn học" thành "Thêm nhóm" */}
				</Link>
			</div>
			<GroupTable groups={groups} courseId={id} /> {/* Thay đổi từ CourseTable sang GroupTable và truyền groups thay vì courses */}
		</div>
	);
};

export default Groups;
