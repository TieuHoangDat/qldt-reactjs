import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import axios from 'axios';
import styles from "./styles.module.scss";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Paper,
	IconButton,
	Select,
	MenuItem,
} from "@mui/material";

const GroupRegistration = () => {
	const user = useSelector((state) => state.auth.user);

	const [courses, setCourses] = useState([]);
	const [groups, setGroups] = useState([]);
	const [groupRegistrations, setGroupRegistrations] = useState([]);
	const [selectedCourseId, setSelectedCourseId] = useState('');

	const base_url = process.env.REACT_APP_API_URL;

	useEffect(() => {
		loadData();
	}, [base_url, user.account_id, selectedCourseId]);

	const loadData = () => {
		let url;
		if (selectedCourseId) {
			url = `${base_url}/groupRegistration/groups/${user.account_id}/${selectedCourseId}`;
		} else {
			url = `${base_url}/groupRegistration/groups/${user.account_id}`;
		}

		fetch(url)
			.then(response => response.json())
			.then(data => setGroups(data.data))
			.catch(error => console.error('Error:', error));

        fetch(`${base_url}/courseRegistration/${user.account_id}`)
            .then(response => response.json())
            .then(data => setCourses(data.data))
            .catch(error => console.error('Error:', error));

		fetch(`${base_url}/groupRegistration/${user.account_id}`)
			.then(response => response.json())
			.then(data => setGroupRegistrations(data.data))
			.catch(error => console.error('Error:', error));
	};

	const handleDelete = (id) => {
		const url = base_url + `/groupRegistration/${id}`;
	
		axios.delete(url)
			.then(response => {
				toast.success(response.data.message);
				loadData(); // Load lại dữ liệu sau khi xóa thành công
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};

	const handleAdd = (id) => {
		const payload = {
			userId: user.account_id,  
			groupId: id  
		};

		const url = base_url + "/groupRegistration/add";
	
		axios.post(url, payload)
			.then(response => {
				toast.success(response.data.message);
				loadData(); // Load lại dữ liệu sau khi thêm thành công
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};

	const handleCourseChange = (event) => {
		const courseId = event.target.value;
		setSelectedCourseId(courseId);
	};

	function getGroupClassName(group) {
		if(group.registed) {
			return styles.active
		}
		if(group.availableSlots === 0) {
			return styles.active2
		}
		return '';
	}

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					Đăng kí tín chỉ học kì 2 năm học 2023-2024 
				</h1>

			</div>
			<div className={styles.head}>
				<h1>Chọn môn học</h1>
				<Select
					value={selectedCourseId}
					onChange={handleCourseChange}
					className={styles.select}
					displayEmpty
					inputProps={{ 'aria-label': 'Without label' }}
				>
					<MenuItem value="">
						<span>Tất cả</span>
					</MenuItem>
					{courses.map(course => (
						<MenuItem key={course.id} value={course.id} className={styles.menuItem}>
							{course.name}
						</MenuItem>
					))}
				</Select>
			</div>
			
			
			<TableContainer component={Paper} className={styles.table_container}>
			<div className={styles.head}>
				<h1>
					Danh sách các nhóm học
				</h1>
				
			</div>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Tên môn học</TableCell>
						<TableCell align="center">Tên nhóm học</TableCell>
						<TableCell align="center">Thứ</TableCell>
						<TableCell align="center">Kíp</TableCell>
						<TableCell align="center">Tên giảng viên</TableCell>
						<TableCell align="center">Phòng</TableCell>
						<TableCell align="center">Còn lại</TableCell>
						<TableCell align="center"></TableCell>
					</TableRow>
				</TableHead>		
					<TableBody>
						{groups.length !== 0 &&
							groups.map((group, index) => (
								<TableRow key={group.id} className={getGroupClassName(group)}>
									<TableCell align="center">{group.course.name}</TableCell>
									<TableCell align="center">{group.groupName}</TableCell>
									<TableCell align="center">{group.dayOfWeek}</TableCell>
									<TableCell align="center">{group.period}</TableCell>
									<TableCell align="center">{group.teacher.name}</TableCell>
									<TableCell align="center">{group.room}</TableCell>
									<TableCell align="center">{group.availableSlots}</TableCell>
									<TableCell align="center">
										<Button  label="Add" 
											className={styles.add_btn}
											onClick={() => handleAdd(group.groupId)}
										/>
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
			<TableContainer component={Paper} className={styles.table_container}>
			<div className={styles.head}>
				<h1>
					Danh sách các nhóm học đã đăng kí 
				</h1>
				
			</div>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">STT</TableCell>
						<TableCell align="center">Mã môn học</TableCell>
						<TableCell align="center">Tên môn học</TableCell>
						<TableCell align="center">Tên nhóm học</TableCell>
						<TableCell align="center">Số tín chỉ</TableCell>
						<TableCell align="center">Ngày đăng ký</TableCell>
						<TableCell align="center">Xóa</TableCell>
					</TableRow>
				</TableHead>
					<TableBody>
						{groupRegistrations.length !== 0 &&
							groupRegistrations.map((gr, index) => (
								<TableRow key={gr.id}>
									<TableCell align="center">{index+1}</TableCell>
									<TableCell align="center">{gr.group.course.id}</TableCell>
									<TableCell align="center">{gr.group.course.name}</TableCell>
									<TableCell align="center">{gr.group.groupName}</TableCell>
									<TableCell align="center">{gr.group.course.num_credit}</TableCell>
									<TableCell align="center">{gr.time}</TableCell>
									<TableCell align="center">
										<IconButton
											className={styles.delete_btn}
											onClick={() => handleDelete(gr.id)}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						{groupRegistrations.length === 0 && (
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
		</div>
	);
};

export default GroupRegistration;
