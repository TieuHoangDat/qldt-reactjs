import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Paper,
} from "@mui/material";

const UpdateGrade = () => {
	const { groupId } = useParams(); 
	const [groupRegistrations, setgroupRegistrations] = useState([]);
	const [group, setGroup] = useState(null);
	const [fileData, setFileData] = useState([]);
	const [loading, setLoading] = useState(true); // Thêm trạng thái loading
	const base_url = process.env.REACT_APP_API_URL;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response1 = await fetch(`${base_url}/groupRegistrationByGroupId/${groupId}`);
				const data1 = await response1.json();
				setgroupRegistrations(data1.data);

				const response2 = await fetch(`${base_url}/groups/getGroup/${groupId}`);
				const data2 = await response2.json();
				console.log(data2)
				setGroup(data2.data);
			} catch (error) {
				console.error('Error:', error);
			} finally {
				setLoading(false); // Dữ liệu đã được tải xong
			}
		};

		fetchData();
	}, [base_url, groupId]);

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = (event) => {
			const binaryStr = event.target.result;
			const workbook = XLSX.read(binaryStr, { type: 'binary' });
			const sheetName = workbook.SheetNames[0];
			const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
			setFileData(worksheet);
		};
		reader.readAsBinaryString(file);
	};

	const history = useHistory();

	const handleUpdate = () => {
		var grs = groupRegistrations;
		grs.forEach((gr) => {
			fileData.slice(6).forEach((row) => {
				if (gr.account.account_id === row['__EMPTY']) {
					gr.grade = row['__EMPTY_8'];
				}
			});
		});
		const data = {
			"groupRegistrations": grs
		}
		console.log(grs);
		const url = `${base_url}/addGrade`;
		axios.post(url, data)
			.then(response => {
				toast.success(response.data.message);
				history.goBack();
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};

	if (loading) {
		return <div>Loading...</div>; // Hiển thị thông báo chờ khi dữ liệu đang được tải
	}

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					Xem danh sách điểm của {group && group.groupName} môn {group && group.course && group.course.name}.
				</h1>
			</div>
			<TableContainer component={Paper} className={styles.table_container}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="center">STT</TableCell>
							<TableCell align="center">Mã sinh viên</TableCell>
							<TableCell align="center">Họ và tên</TableCell>
							<TableCell align="center">Ngày sinh</TableCell>
							<TableCell align="center">Giới tính</TableCell>
							<TableCell align="center">Điểm TK</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{groupRegistrations.length !== 0 &&
							groupRegistrations.map((gr, index) => (
								<TableRow key={index}>
									<TableCell align="center">{index + 1}</TableCell>
									<TableCell align="center">{gr.account.account_id}</TableCell>
									<TableCell align="center">{gr.account.name}</TableCell>
									<TableCell align="center">{gr.account.date}-{gr.account.month}-{gr.account.year}</TableCell>
									<TableCell align="center">{gr.account.gender === 'male' ? 'Nam' : 'Nữ'}</TableCell>
									<TableCell align="center">{gr.grade}</TableCell>
								</TableRow>
							))}
						{groupRegistrations.length === 0 && (
							<TableRow>
								<TableCell align="center" colSpan={6}>
									<img
										className={styles.no_data_img}
										src="./noData.svg"
										alt="No Data"
									/>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			<div className={styles.head}>
				<h1>
					Chọn file Excel để thêm điểm
				</h1>
				<h1>
					<input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
				</h1>
			</div>

			{fileData.length > 0 && (
				<TableContainer component={Paper} className={styles.table_container}>
					<div className={styles.head}>
						<h1>
							Xem danh sách điểm từ file Excel đã chọn
						</h1>
						<h1>
							<Button
								label="Cập nhật điểm"
								className={styles.update_btn}
								onClick={handleUpdate}
							/>
						</h1>
					</div>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="center">STT</TableCell>
								<TableCell align="center">Mã sinh viên</TableCell>
								<TableCell align="center">Họ và tên</TableCell>
								<TableCell align="center">Ngày sinh</TableCell>
								<TableCell align="center">Giới tính</TableCell>
								<TableCell align="center">Điểm TK</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{fileData.slice(6).map((row, index) => (
								<TableRow key={index}>
									<TableCell align="center">{index + 1}</TableCell>
									<TableCell align="center">{row['__EMPTY']}</TableCell>
									<TableCell align="center">{row['__EMPTY_1']}</TableCell>
									<TableCell align="center">{row['__EMPTY_2']}</TableCell>
									<TableCell align="center">{row['__EMPTY_3']}</TableCell>
									<TableCell align="center">{row['__EMPTY_8']}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</div>
	);
};

export default UpdateGrade;
