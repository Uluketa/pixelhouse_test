import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Supplier from "./Supplier.js";
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado à base de dados.");
  } catch (error) {
    console.log("Erro ao acessar banco de dados: " + error);
  }
};

connectDB();

// READ
app.get("/supplier", async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.json({ error: error });
  }
});

// CREATE
app.post("/supplier", async (req, res) => {
  try {
    const newSupplier = await Supplier.create(req.body);
    res.json(newSupplier);
  } catch (error) {
    res.json({ error: error });
  }
});

// UPDATE
app.put("/supplier/:id", async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedSupplier);
  } catch (error) {
    res.json({ error: error });
  }
});

// DELETE
app.delete("/supplier/:id", async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    res.json(deletedSupplier);
  } catch (error) {
    res.json({ error: error });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando porta: ${PORT}`));
