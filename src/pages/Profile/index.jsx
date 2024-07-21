import { useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import styles from "./styles.module.scss";

const Profile = () => {
	const user = useSelector((state) => state.auth.user);

	const getRoleText = (role) => {
		if (role === 1) return "Admin";
		if (role === 2) return "Giảng viên";
		if (role === 3) return "Sinh viên";
		return "Unknown"; // Nếu role không khớp với bất kỳ giá trị nào
	  };

	return (
		<div className={styles.container}>
			<Paper className={styles.paper_container}>
				<h1 className={styles.heading}>
					Thông tin tài khoản 
				</h1>
				<TableContainer component={Paper} className={styles.table_container}>
					<Table>
						<TableBody>
						<TableRow>
							<TableCell>Họ và Tên</TableCell>
							<TableCell>{user.name}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Giới Tính</TableCell>
							<TableCell>{user.gender === "male" ? "Nam" : "Nữ"}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Ngày sinh</TableCell>
							<TableCell>{user.date}-{user.month}-{user.year}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Email</TableCell>
							<TableCell>{user.email}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Nơi sinh</TableCell>
							<TableCell>Hải Dương</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Dân tộc</TableCell>
							<TableCell>Kinh</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Tôn giáo</TableCell>
							<TableCell>Không</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Vai trò</TableCell>
							<TableCell>{getRoleText(user.role)}</TableCell>
						</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				
			</Paper>
			
		</div>
	);
};

export default Profile;
