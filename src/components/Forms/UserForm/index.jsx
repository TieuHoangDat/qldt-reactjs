import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createUser, updateUser } from "../../../redux/usersSlice/apiCalls";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import { Paper } from "@mui/material";
import Button from "../../Button";
import TextField from "../../Inputs/TextField";
import Select from "../../Inputs/Select";
import Radio from "../../Inputs/Radio";
import PersonIcon from "@mui/icons-material/Person";
import styles from "./styles.module.scss";

const months = [
  { name: "January", value: 1 },
  { name: "February", value: 2 },
  { name: "March", value: 3 },
  { name: "April", value: 4 },
  { name: "May", value: 5 },
  { name: "June", value: 6 },
  { name: "July", value: 7 },
  { name: "August", value: 8 },
  { name: "September", value: 9 },
  { name: "October", value: 10 },
  { name: "November", value: 11 },
  { name: "December", value: 12 },
];

const genders = ["male", "female", "non-binary"];
const roles = [
  { name: "Admin", value: 1 },
  { name: "Giảng viên", value: 2 },
  { name: "Sinh viên", value: 3 },
];

const UserForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
    month: "",
    year: "",
    date: "",
    gender: "",
    role: "",
  });
  const { users, createUserProgress, updateUserProgress } = useSelector(
    (state) => state.users
  );
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleErrorState = (name, value) => {
    value === ""
      ? delete errors[name]
      : setErrors((errors) => ({ ...errors, [name]: value }));
  };

  const schema = {
    email: Joi.string().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    name: Joi.string().min(3).max(30).required().label("Name"),
    username: Joi.string().min(3).max(30).required().label("Username"),
    role: Joi.number().valid(1, 2, 3).required().label("Role"),
  };

  useEffect(() => {
    if (id !== "new" && users) {
      const user = users.find((user) => user.account_id === Number(id));
      if (user) {
        setData({
          email: user.email,
          name: user.name,
          username: user.username,
          month: user.month,
          year: user.year,
          date: user.date,
          gender: user.gender,
          role: user.role,
        });
      }
    }
  }, [id, users]);

  const handleSubmit = async (e) => {
    data.date = Number(data.date)
    data.month = Number(data.month)
    data.year = Number(data.year)
    data.role = Number(data.role)
    e.preventDefault();
    if (id !== "new") {
      const res = await updateUser(id, data, dispatch);
      res && history.push("/users");
    } else {
      const res = await createUser(data, dispatch);
      res && history.push("/users");
    }
  };

  return (
    <div className={styles.container}>
      <Paper className={styles.form_container}>
        <h1 className={styles.heading}>
          {id === "new" ? "Thêm người dùng" : "Sửa thông tin người dùng"} <PersonIcon />
        </h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <TextField
              label="Nhập email"
              placeholder="Enter your email"
              name="email"
              handleInputState={handleInputState}
              schema={schema.email}
              handleErrorState={handleErrorState}
              value={data.email}
              error={errors.email}
              required={true}
            />
          </div>
          {id === "new" && (
            <div className={styles.input_container}>
              <TextField
                label="Nhập mật khẩu"
                placeholder="Create a password"
                name="password"
                handleInputState={handleInputState}
                schema={schema.password}
                handleErrorState={handleErrorState}
                value={data.password}
                error={errors.password}
                type="password"
                required={true}
              />
            </div>
          )}
          <div className={styles.input_container}>
            <TextField
              label="Họ và tên"
              placeholder="Enter a profile name"
              name="name"
              handleInputState={handleInputState}
              schema={schema.name}
              handleErrorState={handleErrorState}
              value={data.name}
              error={errors.name}
              required={true}
            />
          </div>
          <div className={styles.input_container}>
            <TextField
              label="Tên tài khoản"
              placeholder="Enter your username"
              name="username"
              handleInputState={handleInputState}
              schema={schema.username}
              handleErrorState={handleErrorState}
              value={data.username}
              error={errors.username}
              required={true}
            />
          </div>
          <div className={styles.input_container}>
            <Select
              label="Vai trò"
              handleInputState={handleInputState}
              name="role"
              placeholder="Select a role"
              options={roles}
              value={data.role}
              required={true}
            />
          </div>
          <div className={styles.date_of_birth_container}>
            <p>Nhập ngày sinh</p>
            <div className={styles.date_of_birth}>
              <div className={styles.month}>
                <Select
                  label="Tháng"
                  handleInputState={handleInputState}
                  name="month"
                  placeholder="Months"
                  options={months}
                  value={data.month}
                  required={true}
                />
              </div>
              <div className={styles.date}>
                <TextField
                  label="Ngày"
                  placeholder="DD"
                  name="date"
                  value={data.date}
                  handleInputState={handleInputState}
                  required={true}
                />
              </div>
              <div className={styles.year}>
                <TextField
                  label="Năm"
                  placeholder="YYYY"
                  name="year"
                  value={data.year}
                  handleInputState={handleInputState}
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className={styles.input_container}>
            <Radio
              label="Giới tính"
              name="gender"
              handleInputState={handleInputState}
              options={genders}
              value={data.gender}
              required={true}
            />
          </div>
          <Button
            type="submit"
            label={id === "new" ? "Submit" : "Update"}
            isFetching={id === "new" ? createUserProgress : updateUserProgress}
            style={{ marginLeft: "auto" }}
          />
        </form>
      </Paper>
    </div>
  );
};

export default UserForm;
