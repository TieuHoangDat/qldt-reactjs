import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper
} from "@mui/material";

const TimeTable = () => {
  const user = useSelector((state) => state.auth.user);

  const [groups, setgroups] = useState([]);

  const base_url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    loadData();
  }, [base_url, user.account_id]);

  const loadData = () => {
    fetch(`${base_url}/time_table/${user.account_id}`)
      .then((response) => response.json())
      .then((data) => setgroups(data.data))
      .catch((error) => console.error('Error:', error));
  };

  const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];
  const periods = [1, 2, 3, 4, 5];

  const timetable = Array.from({ length: 5 }, () => Array(7).fill(null));

  groups.forEach((g) => {
    const dayIndex = g.dayOfWeek - 2;
    const periodIndex = g.period - 1;
    if (dayIndex >= 0 && dayIndex < 7 && periodIndex >= 0 && periodIndex < 5) {
      timetable[periodIndex][dayIndex] = g;
    }
  });

  return (
    <div className={styles.container}>
      <TableContainer component={Paper} className={styles.table_container}>
        <div className={styles.head}>
          <h1>Thời khóa biểu</h1>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Kíp/Thứ</TableCell>
              {daysOfWeek.map((day) => (
                <TableCell align="center" key={day}>{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {periods.map((period, rowIndex) => (
              <TableRow key={period}>
                <TableCell align="center">{`Kíp ${period}`}</TableCell>
                {timetable[rowIndex].map((group, colIndex) => (
                  <TableCell align="" key={colIndex} className={group ? styles.active : ""}>
                    {group ? (
                      <div>
                        <div className={styles.name}>{group.course.name}</div>
                        <div>{group.groupName}</div>
                        <div>{group.teacher.name}</div>
                        <div>Phòng: {group.room}</div>
                      </div>
                    ) : (
                      ""
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TimeTable;
