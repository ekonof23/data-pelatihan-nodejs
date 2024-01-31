const express = require("express");
const myController = require("./myController.js");
const router = express.Router();

router.get("/", myController.getPelatihans);

// router untuk view
router.get("/pelatihan/:id/json", myController.getPelatihanById);

// router untuk tambah data
router.post("/add", myController.insertPelatihan);
router.post("/add2", myController.insertPerusahaan);
router.post("/add3", myController.insertPeserta);

// router untuk hapus data
router.get("/delete/:id", myController.deletePelatihan);
router.get("/delete2/:id", myController.deletePelatihan2);
router.get("/delete3/:id", myController.deletePelatihan3);

// router untuk update data
router.get("/edit/:id", myController.editPelatihan);

router.put("/update", myController.updatePelatihan);
router.put("/update2", myController.updatePelatihan2);
router.put("/update3", myController.updatePelatihan3);

// router untuk search
router.get("/search", myController.searchPelatihanID);

module.exports = router;
