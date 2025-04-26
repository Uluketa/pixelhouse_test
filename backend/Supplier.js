import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cnpj: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default mongoose.model("Supplier", SupplierSchema);
