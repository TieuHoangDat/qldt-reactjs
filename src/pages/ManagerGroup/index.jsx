import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Button from '../../components/Button';
import styles from './styles.module.scss';
import MyBarChart from './MyBarChart';
import MyPieChart from './MyPieChart';

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from '@mui/material';

const ManagerGroup = () => {
  const user = useSelector((state) => state.auth.user);
  const [groups, setGroups] = useState([]);
  const [listStudent, setlistStudents] = useState([]);

  const base_url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const url = `${base_url}/time_table/${user.account_id}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setGroups(data.data))
      .catch((error) => console.error('Error:', error));

  }, [base_url, user.account_id]);

  const fetchData = async (groupId) => {
    try {
      await fetch(`${base_url}/getListStudent/${groupId}`)
        .then(response => response.json())
        .then(data => setlistStudents(data.data))
        .catch(error => console.error('Error:', error));
      
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  function exportToExcel(groupId) {
    console.log(listStudent)

    const group = groups.find((g) => g.groupId === Number(groupId));
    
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([]);

    // Thiết lập các dòng đầu tiên
    XLSX.utils.sheet_add_aoa(worksheet, [
      ['Học viện Công nghệ Bưu chính viễn thông'],
      [],
      ['KHOA:', 'Công nghệ thông tin'],
      ['BỘ MÔN:', 'Công nghệ phần mềm'],
      ['Học phần:', group.course.name],
      ['Số tín chỉ:', group.course.num_credit],
      [],
      [],
      [],
    ]);

    // Thiết lập giá trị cho một ô cụ thể
    XLSX.utils.sheet_add_aoa(worksheet, [
      ['BẢNG ĐIỂM THÀNH PHẦN'],
    ], { origin: 'G1' });

    XLSX.utils.sheet_add_aoa(worksheet, [
      ['Thi lần 1 học kỳ 2 năm học 2023 - 2024'],
    ], { origin: 'G4' });

    XLSX.utils.sheet_add_aoa(worksheet, [
      ['Nhóm:', group.groupName],
    ], { origin: 'G5' });

    // Thiết lập tiêu đề các cột
    XLSX.utils.sheet_add_aoa(worksheet, [
      ['STT', 'Mã SV', 'Họ và tên', 'Ngày sinh', 'Giới tính', 'Điểm CC', 'Điểm TBKT', 'Điểm TH-TN', 'Điểm BTTL', 'Điểm thi', 'Điểm TK'],
      ['', '', '', '', 'Trọng số', 10, 10, 10, 0, 70],
    ], { origin: 'A9' });

    // Thiết lập kiểu cho tiêu đề các cột
    worksheet['!cols'] = [
      { wpx: 60 },  // STT
      { wpx: 50 }, // Mã SV
      { wpx: 100 }, // Họ và tên
      { wpx: 60 },  // Ngày sinh
      { wpx: 60 },  // Giới tính
      { wpx: 60 },  // Điểm CC
      { wpx: 60 },  // Điểm TBKT
      { wpx: 70 },  // Điểm TH-TN
      { wpx: 60 },  // Điểm BTTL
      { wpx: 60 },  // Điểm thi
      { wpx: 60 },  // Điểm TK
    ];


    // Thêm dữ liệu sinh viên vào bảng
    const studentData = listStudent.map((student, index) => [
      index + 1,
      student.account_id,
      student.name,
      `${student.date}-${student.month}-${student.year}`,
      student.gender === 'male' ? 'Nam' : 'Nữ',
	  ]);
	   

    XLSX.utils.sheet_add_aoa(worksheet, studentData, { origin: 'A11' });

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'BangDiemThanhPhan.xlsx');
  }

  const handleExport = async (groupId) => {
    try {
        // Chờ fetchData hoàn tất
        await fetchData(groupId);
        
        // Đảm bảo dữ liệu đã được tải trước khi xuất ra file Excel
        await exportToExcel(groupId);
    } catch (error) {
        console.error('Error in handleExport:', error);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h1>Quản lý nhóm học</h1>
      </div>
      <div className={styles.chart}>
        <div>
          <h1>Thống kê tiến trình giảng dạy</h1>
          <p>Học kì 2 năm học 2023-2024</p>
          <p>Tổng số tiết của học kì: 120</p>
          <p>Số tiết đã dạy: 80</p>
          <p>Số tiết trong tuần: 8</p>
          <p>Số tiết chưa dạy: 32</p>
        </div>
        <div>
          <MyBarChart />
        </div>
        <div>
          <MyPieChart />
        </div>
      </div>
      <TableContainer component={Paper} className={styles.table_container}>
        <div className={styles.head}>
          <h1>Danh sách các nhóm học giảng viên đang giảng dạy</h1>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Tên môn học</TableCell>
              <TableCell align="center">Tên nhóm học</TableCell>
              <TableCell align="center">Thứ</TableCell>
              <TableCell align="center">Kíp</TableCell>
              <TableCell align="center">Phòng</TableCell>
              <TableCell align="center">Số sinh viên</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.length !== 0 &&
              groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell align="center">{group.course.name}</TableCell>
                  <TableCell align="center">{group.groupName}</TableCell>
                  <TableCell align="center">{group.dayOfWeek}</TableCell>
                  <TableCell align="center">{group.period}</TableCell>
                  <TableCell align="center">{group.room}</TableCell>
                  <TableCell align="center">{group.maxStudents - group.availableSlots}</TableCell>
                  <TableCell align="center">
                    <Button
                      label="Xuất excel"
                      className={styles.add_btn}
                      onClick={() => handleExport(group.groupId)}
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
    </div>
  );
};

export default ManagerGroup;
