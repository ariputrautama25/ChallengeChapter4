const express = require("express");
const router = express.Router();
const post = require("../controller/produk");
const produk = require("../controller/produk");

router.get("/", (req, res) =>
  res.status(200).json({ message: "welcome to challenge 4" })
);

router.get("/produk", produk.index);
router.get("/produk/:produk_id", produk.show);
router.post("/produk", produk.store);
router.put("/produk/:produk_id", produk.update);
router.delete("/produk/:produk_id", produk.destroy);

module.exports = router;
