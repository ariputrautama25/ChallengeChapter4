const express = require("express");
const router = express.Router();
const produk = require("../controller/produk");

router.get("/", (req, res) =>
  res.status(200).json({ message: "welcome to blog challenge chapter 4" })
);

router.get("/produks", produk.index);
router.get("/produks/:produk_id", produk.show);
router.post("/produks", produk.store);
router.put("/produks/:produk_id", produk.update);
router.delete("/produks/:produk_id", produk.destroy);

module.exports = router;
