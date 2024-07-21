import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserTable from "../../components/Tables/UserTable";
import Button from "../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import styles from "./styles.module.scss";

const Users = () => {
	const { users } = useSelector((state) => state.users);

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					Người dùng <PeopleAltIcon />
				</h1>
				<Link to="/users/new">
					<Button startIcon={<AddIcon />} label="Thêm người dùng" />
				</Link>
			</div>
			<UserTable users={users} />
		</div>
	);
};

export default Users;
