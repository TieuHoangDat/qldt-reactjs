import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { createCourse, updateCourse } from "../../../redux/coursesSlice/apiCalls"; // Thay đổi import action từ songs sang courses
import { toast } from "react-toastify";
import Joi from "joi";
import TextField from "../../Inputs/TextField";
import Button from "../../Button";
import { Paper } from "@mui/material";
import styles from "./styles.module.scss";

const CourseForm = () => {
	const [data, setData] = useState({
		id: "",
		name: "",
		num_credit: 0,
		term: 1,
		notcal: 1,
	});
	const [errors, setErrors] = useState({ id: "", name: "" }); // Thay đổi errors tương ứng với các trường của khóa học
	const { courses, createCourseProgress, updateCourseProgress } = useSelector(
		(state) => state.courses // Thay đổi state từ songs sang courses
	);
	const { id } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const course = courses.find((course) => course.id === id); // Thay đổi từ _id sang id vì trong courses thường dùng id
		if (id !== "new" && course) {
			setData({
				id: course.id,
				name: course.name,
				num_credit: course.num_credit,
				term: course.term,
				notcal: course.notcal,
			});
		}
	}, [id, courses]);

	const schema = {
		id: Joi.string().required().label("Id"),
		name: Joi.string().required().label("Name"),
		num_credit: Joi.number().required().label("Number of Credits"),
		term: Joi.number().required().label("Term"),
		notcal: Joi.number().required().label("Notcal"),
	};

	const handleInputState = (name, value) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const handleErrorState = (name, value) => {
		setErrors((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { error } = Joi.object(schema).validate(data);
		if (!error) {
			data.num_credit = Number(data.num_credit);
			data.term = Number(data.term);
			data.notcal = Number(data.notcal);
			if (id === "new") {
				console.log("ok") // debug
				const res = await createCourse(data, dispatch); // Thay đổi hàm gọi action từ createSong sang createCourse
				res && history.push("/courses");
			} else {
				const res = await updateCourse(id, data, dispatch); // Thay đổi hàm gọi action từ updateSong sang updateCourse
				res && history.push("/courses");
			}
		} else {
			toast.error(error.message);
		}
	};

	return (
		<div className={styles.container}>
			<Paper className={styles.form_container}>
				<h1 className={styles.heading}>
					{id === "new" ? "Thêm môn học" : "Sửa môn học"} 
				</h1>
				<form onSubmit={handleSubmit}>
					<div className={styles.input_container}>
						<TextField
							name="id"
							label="Nhập mã môn học"
							handleInputState={handleInputState}
							handleErrorState={handleErrorState}
							schema={schema.id}
							error={errors.id}
							value={data.id}
							required={true}
							disabled={id !== "new"}
						/>
					</div>
					<div className={styles.input_container}>
						<TextField
							name="name"
							label="Nhập tên môn học"
							handleInputState={handleInputState}
							handleErrorState={handleErrorState}
							schema={schema.name}
							error={errors.name}
							value={data.name}
							required={true}
						/>
					</div>
					<div className={styles.input_container}>
						<TextField
							name="num_credit"
							label="Nhập số tín chỉ"
							handleInputState={handleInputState}
							required={true}
							value={data.num_credit}
							handleErrorState={handleErrorState}
							schema={schema.num_credit}
							error={errors.num_credit}
							type="number"
						/>
					</div>
					<div className={styles.input_container}>
						<TextField
							name="term"
							label="Nhập học kì"
							handleInputState={handleInputState}
							required={true}
							value={data.term}
							handleErrorState={handleErrorState}
							schema={schema.term}
							error={errors.term}
						/>
					</div>
					<div className={styles.input_container}>
						<TextField
							name="notcal"
							label="Notcal"
							handleInputState={handleInputState}
							required={true}
							value={data.notcal}
							handleErrorState={handleErrorState}
							schema={schema.notcal}
							error={errors.notcal}
						/>
					</div>
					<Button
						type="submit"
						label={id === "new" ? "Thêm" : "Cập nhật"}
						isFetching={id === "new" ? createCourseProgress : updateCourseProgress}
						style={{ marginLeft: "auto" }}
					/>
				</form>
			</Paper>
		</div>
	);
};

export default CourseForm;
