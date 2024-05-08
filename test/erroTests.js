// import request from 'supertest';

// // test error for some randol url, should return 404
// const getNotFound = (url) => {
//   return new Promise((resolve, reject) => {
//     request(url)
//       .get('/what-is-this')
//       .expect(404, (err, response) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(response.body);
//         }
//       });
//   });
// };

// // should generate error for cake not found, should return 404
// const getSingleStudentError = (url, id) => {
//   return new Promise((resolve, reject) => {
//     request(url)
//       .get('/api/v1/kakut/' + 1)
//       .expect(404, (err, response) => {
//         if (err) {
//           reject(err);
//         } else {
//           const result = response.body;
//           expect(result.message).toBe('No cake found');
//           resolve(response.body);
//         }
//       });
//   });
// };

// // should generate 400 error for cake not added because of missing file
// // message should be 'file not valid'
// const postStudentFileError = (url, tuote) => {
//   return new Promise((resolve, reject) => {
//     request(url)
//       .post('/api/v1/tuote/')
//       .set('Content-type', 'form-data')
//       .field('tuote_name', tuote.tuote_nimi)
//       .field('tuote_kuvaus', tuote.tuote_kuvaus)
//       .field('tyyppi:id', tuote.tyyppi_id)
//       .expect(400, (err, response) => {
//         if (err) {
//           reject(err);
//         } else {
//           const result = response.body;
//           expect(result.message).toBe('file not valid');
//           resolve(result);
//         }
//       });
//   });
// };

// // should generate 400 error for student not added because of missing student_name
// // message should be 'student_name is required'
// const postStudentNameError = (url, student) => {
//   return new Promise((resolve, reject) => {
//     request(url)
//       .post('/api/v1/students/')
//       .set('Content-type', 'form-data')
//       .attach('image', 'test/' + student.filename)
//       .field('birthdate', student.birthdate)
//       .expect(400, (err, response) => {
//         if (err) {
//           reject(err);
//         } else {
//           const result = response.body;
//           expect(result.message).toBe('Invalid value: student_name');
//           resolve(result);
//         }
//       });
//   });
// };

// export {
//   getNotFound,
//   getSingleStudentError,
//   postStudentFileError,
//   postStudentNameError,
// };
