import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { createNotification, updateNotification } from "../../../redux/notificationsSlice/apiCalls"; // Thay đổi import action từ courses sang notifications
import { toast } from "react-toastify";
import Joi from "joi";
import TextField from "../../Inputs/TextField";
import Button from "../../Button";
import { Paper } from "@mui/material";
import styles from "./styles.module.scss";

const NotificationForm = () => {
	const [data, setData] = useState({
		title: "",
		message: "",
	});
	const [errors, setErrors] = useState({ title: "", message: "" });
	const { notifications, createNotificationProgress, updateNotificationProgress } = useSelector(
		(state) => state.notifications // Thay đổi state từ courses sang notifications
	);
	const { id } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const notification = notifications.find((notification) => notification.id === Number(id));
		if (id !== "new" && notification) {
			setData({
				title: notification.title,
				message: notification.message,
			});
		}
	}, [id, notifications]);

	const schema = {
		title: Joi.string().required().label("Title"),
		message: Joi.string().required().label("Message"),
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
			if (id === "new") {
				const res = await createNotification(data, dispatch); // Thay đổi hàm gọi action từ createCourse sang createNotification
				res && history.push("/notifications");
			} else {
				const res = await updateNotification(id, data, dispatch); // Thay đổi hàm gọi action từ updateCourse sang updateNotification
				res && history.push("/notifications");
			}
		} else {
			toast.error(error.message);
		}
	};

	return (
		<div className={styles.container}>
			<Paper className={styles.form_container}>
				<h1 className={styles.heading}>
					{id === "new" ? "Thêm thông báo" : "Sửa thông báo"} 
				</h1>
				<form onSubmit={handleSubmit}>
					<div className={styles.input_container}>
						<TextField
							name="title"
							label="Nhập tiêu đề"
							handleInputState={handleInputState}
							handleErrorState={handleErrorState}
							schema={schema.title}
							error={errors.title}
							value={data.title}
							required={true}
						/>
					</div>
					<div className={styles.input_container}>
						<TextField
							name="message"
							label="Nhập nội dung thông báo"
							handleInputState={handleInputState}
							required={true}
							value={data.message}
							handleErrorState={handleErrorState}
							schema={schema.message}
							error={errors.message}
						/>
					</div>
					<Button
						type="submit"
						label={id === "new" ? "Thêm" : "Cập nhật"}
						isFetching={id === "new" ? createNotificationProgress : updateNotificationProgress}
						style={{ marginLeft: "auto" }}
					/>
				</form>
			</Paper>
		</div>
	);
};

export default NotificationForm;
