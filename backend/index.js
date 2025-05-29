import cookieParser from 'cookie-parser';
import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './utils/db.js';
import userRoute from "./routes/userRoute.js"
import companyRoute from "./routes/companyRoute.js"
import jobRoute from "./routes/jobRoute.js"
import applicationRoute from "./routes/applicationRoute.js"
import path from "path";


dotenv.config();
const app=express();

 const _dirname=path.resolve();
// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use(cors({
    origin: '*',
    credentials: true
  }));
  
const PORT=process.env.PORT || 3000;
  


//api 
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*',(req,res)=>{
     res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running at PORT ${PORT}`);   
})