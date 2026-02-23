require("dotenv").config();
const express = require("express");
const app = express();

const accommodationRoutes = require("./routes/accommodationRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const commentRoutes = require("./routes/commentRoutes");
const contentRoutes = require("./routes/contentRoutes");
const customerRoutes = require("./routes/customerRoutes");
const roleRoutes = require("./routes/roleRoutes");
const userRoleRoutes = require("./routes/userRoleRoutes");
const cityRoutes = require("./routes/cityRoutes");
const townRoutes = require("./routes/townRoutes");
const villageRoutes = require("./routes/villageRoutes");
const unitRoutes = require("./routes/unitRoutes");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const cors = require("cors");
const corsOptions = require("./middlewares/corsOptions");
const {generalLimiter} = require('./middlewares/rateLimiter');


const PORT = process.env.PORT || 4000;

app.use(cors(corsOptions));
app.use(express.json());

app.use(generalLimiter);    
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use("/accommodations", accommodationRoutes);
app.use("/users", userRoutes);
app.use("/bookings", bookingRoutes);
app.use("/comments", commentRoutes);
app.use("/contents", contentRoutes);
app.use("/customers", customerRoutes);
app.use("/roles", roleRoutes);
app.use("/user-roles", userRoleRoutes);
app.use("/cities", cityRoutes);
app.use("/towns", townRoutes);
app.use("/villages", villageRoutes);
app.use("/units", unitRoutes);
app.use("/auth", authRoutes);

const startServer = async () => {
  await connectDB(); // önce veritabanına bağlan ve tabloları senkronize et
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();
