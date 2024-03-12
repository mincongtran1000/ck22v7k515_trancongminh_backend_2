/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const app = express();
const contactsRouter = require("./app/routes/contact.route");
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
res.json({ message: "Welcome to contact book application." });
});

 module.exports = app;
 const ApiError = require("./app/api-error");
  app.use("/api/contacts", contactsRouter);
  // handle 404 response
  app.use((_req, _res, next) => {
 // Code ở đây sẽ chạy khi không có route được định nghĩa nào
 // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
 return next(new ApiError(404, "Resource not found"));
 });
  // define error-handling middleware last, after other app.use() and routes calls
 app.use((error, _req, res) => {
 // Middleware xử lý lỗi tập trung.
 // Trong các đoạn code xử lý ở các route, gọi next(error) sẽ chuyển về middleware xử lý lỗi này
return res.status(error.statusCode || 500).json({
     message: error.message || "Internal Server Error",});
// eslint-disable-next-line no-undef
 })

