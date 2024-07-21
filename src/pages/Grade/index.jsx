import React from 'react';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import styles from './styles.module.scss';
import Button from '../../components/Button';
import { Bar } from 'react-chartjs-2';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from '@mui/material';

const Grade = () => {
  const { terms } = useSelector((state) => state.terms);

  const chartData = {
		labels: terms.map((term) => term.term),
		datasets: [
			{
				label: 'Điểm trung bình học kì hệ 4',
				data: terms.map((term) => term.avg_4),
				backgroundColor: 'rgba(0, 255, 0, 0.2)',
				borderColor: 'rgba(0, 255, 0, 1)',
				borderWidth: 1,
			},
		],
	};

	const chartData2 = {
		labels: terms.map((term) => term.term),
		datasets: [
			{
			label: 'Điểm trung bình tích lũy hệ 4',
			data: terms.map((term) => term.tl_4),
			backgroundColor: 'rgba(255, 0, 0, 0.2)',
			borderColor: 'rgba(255, 0, 0, 1)',
			borderWidth: 1,
			},
		],
	};

  const user = useSelector((state) => state.auth.user);

  const handleExport = () => {
    const exportData = [];

	exportData.push([`Bảng điểm của sinh viên: ${user.name}`]);
	exportData.push([]);

    terms.forEach((term) => {
      // Add term header
      exportData.push([{ v: term.term, s: { font: { bold: true } } }]);
      exportData.push([
        { v: 'STT', s: { font: { bold: true } } },
        { v: 'Mã môn học', s: { font: { bold: true } } },
        { v: 'Tên môn học', s: { font: { bold: true } } },
        { v: 'Số tín chỉ', s: { font: { bold: true } } },
        { v: 'Điểm (10)', s: { font: { bold: true } } },
        { v: 'Điểm (4)', s: { font: { bold: true } } },
        { v: 'Điểm (C)', s: { font: { bold: true } } },
      ]);

      // Add term data
      term.li.forEach((gr, index) => {
        exportData.push([
          { v: index + 1 },
          { v: gr.group.course.id },
          { v: gr.group.course.name },
          { v: gr.group.course.num_credit },
          { v: gr.grade_10 },
          { v: gr.grade_4 },
          { v: gr.grade_a },
        ]);
      });

      // Add term summary
      exportData.push([]);
      exportData.push([
        { v: `- Điểm trung bình học kỳ hệ 4: ${term.avg_4}`, s: { font: { bold: true } } },
		{},
		{},
		{ v: `- Điểm trung bình tích lũy hệ 4: ${term.tl_4}`, s: { font: { bold: true } } },
	]);
	exportData.push([
		{ v: `- Điểm trung bình học kỳ hệ 10: ${term.avg_10}`, s: { font: { bold: true } } },
		{},
		{},
        { v: `- Điểm trung bình tích lũy hệ 10: ${term.tl_10}`, s: { font: { bold: true } } },
	]);
	exportData.push([
		{ v: `- Số tín chỉ đạt học kỳ: ${term.total_credit}`, s: { font: { bold: true } } },
		{},
		{},
		{ v: `- Số tín chỉ tích lũy: ${term.tl_credit}`, s: { font: { bold: true } } },
      ]);
      exportData.push([]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(exportData);

    // Set column widths
    const colWidths = [
      { wpx: 40 }, // STT
      { wpx: 80 }, // Mã môn học
      { wpx: 150 }, // Tên môn học
      { wpx: 60 }, // Số tín chỉ
      { wpx: 60 }, // Điểm (10)
      { wpx: 60 }, // Điểm (4)
      { wpx: 60 }, // Điểm (C)
    ];

    worksheet['!cols'] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Grade');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Grades.xlsx');
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h1>Xem điểm</h1>
        <Button
          label="Xuất excel"
          className={styles.add_btn}
          onClick={handleExport}
        />
      </div>
      <div className={styles.chart}>
				<div style={{ width: '400px' }}>
					<Bar data={chartData} />
				</div>
				<div style={{ width: '400px' }}>
					<Bar data={chartData2} />
				</div>
			</div>
      {terms.length !== 0 &&
        terms.map((term, index) => (
          <TableContainer
            component={Paper}
            className={styles.table_container}
            key={index}
          >
            <div className={styles.head}>
              <h1>{term.term}</h1>
            </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="center">Mã môn học</TableCell>
                  <TableCell align="center">Tên môn học</TableCell>
                  <TableCell align="center">Số tín chỉ</TableCell>
                  <TableCell align="center">Điểm (10)</TableCell>
                  <TableCell align="center">Điểm (4)</TableCell>
                  <TableCell align="center">Điểm (C)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {term.li.map((gr, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{gr.group.course.id}</TableCell>
                    <TableCell align="center">{gr.group.course.name}</TableCell>
                    <TableCell align="center">{gr.group.course.num_credit}</TableCell>
                    <TableCell align="center">{gr.grade_10}</TableCell>
                    <TableCell align="center">{gr.grade_4}</TableCell>
                    <TableCell align="center">{gr.grade_a}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div style={{ marginLeft: '20px' }}>
                      <p>- Điểm trung bình học kỳ hệ 4: {term.avg_4}</p>
                      <p>- Điểm trung bình học kỳ hệ 10: {term.avg_10}</p>
                      <p>- Số tín chỉ đạt học kỳ: {term.total_credit}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p>- Điểm trung bình tích lũy hệ 4: {term.tl_4}</p>
                    <p>- Điểm trung bình tích lũy hệ 10: {term.tl_10}</p>
                    <p>- Số tín chỉ tích lũy: {term.tl_credit}</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ))}
    </div>
  );
};

export default Grade;
