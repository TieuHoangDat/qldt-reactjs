import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { login } from "../../redux/authSlice/apiCalls";
import TextField from "../../components/Inputs/TextField";
import Button from "../../components/Button";
import { Paper } from "@mui/material";
import styles from "./styles.module.scss";

const Login = () => {
	const [data, setData] = useState({ username: "", password: "" });
	const [errors, setErrors] = useState({});
	const { isFetching } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	};

	const handleInputState = (name, value) => {
		setData({ ...data, [name]: value });
	};

	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors({ ...errors, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			login(data, dispatch);
		} else {
			console.log("please fill out properly");
		}
	};

	return (
		<div className={styles.container}>
			<Paper className={styles.form_container}>
				<form onSubmit={handleSubmit}>
					<div className={styles.heading}>Login</div>
					<div className={styles.input_container}>
						<TextField
							name="username"
							label="Username (Sinh viên: nva, Giảng viên: tad, Admin: admin)"
							value={data.username}
							handleInputState={handleInputState}
							handleErrorState={handleErrorState}
							error={errors.username}
							schema={schema.username}
							required={true}
						/>
					</div>
					<div className={styles.input_container}>
						<TextField
							name="password"
							label="Password (Mật khẩu cả 3 tài khoản là: admin)"
							value={data.password}
							handleInputState={handleInputState}
							handleErrorState={handleErrorState}
							error={errors.password}
							schema={schema.password}
							type="password"
							required={true}
						/>
					</div>
					<div className={styles.btn_wrapper}>
						<Button type="submit" label="submit" isFetching={isFetching} />
					</div>
				</form>
			</Paper>
		</div>
	);
};

export default Login;
