import NameList from "./components/NameList";

import UserProfile from "./components/UserProfile";

import Welcome from "./components/Welcome";

import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

// Dùng Container, Row, Col để bố trí các Card

import StudentCard from "./components/StudentCard"; // Import StudentCard component


function App() {

  const userData = { name: "dat", age: 21 };

  const namesList = ["dattqde180461@fpt.edu.vn", "quanggdat201@gmail.com"];

  //Danh sach students

  const students = [

    { name: "phu", age: 21, avatar: "/images/student1.png" },

    { name: "thanh", age: 22, avatar: "/images/student2.png" },

    { name: "quang", age: 23, avatar: "/images/student3.png" },

  ];

  return (

    <>

      <Welcome name="dattqde180461@fpt.edu.vn" />

      <UserProfile user={userData} />

      <NameList names={namesList} />

      <Container>

        <h1 className="my-4 text-center">Student information</h1>

        <Row>

          {/*Duyệt qua mảng students và truyền từng đối tượng student vào Student Card*/}

          {students.map((student, index) => (

            <Col key={index} sm={12} md={4}>

              <StudentCard student={student} />

            </Col>

          ))}

        </Row>

      </Container>

    </>

  );

}


export default App;