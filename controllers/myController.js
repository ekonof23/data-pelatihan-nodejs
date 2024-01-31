const modelPelatihan = require("../models/modelPelatihan");

const myController = {
  getPelatihans: function (req, res) {
    modelPelatihan.getSelects(function (data) {
      res.render("index", { title: "Data Pelatihan", dataPelatihan: data });
    });
  },
  getPelatihan: function (req, res) {
    const id = req.params.id;
    modelPelatihan.getSelect(id, function (data) {
      res.json(data);
    });
  },

  // kode untuk tambah data
  insertPelatihan: function (req, res) {
    const pelatihanDetail = req.body;
    modelPelatihan.addPelatihan(pelatihanDetail, function (data) {
      res.redirect("/");
    });
  },

  insertPerusahaan: function (req, res) {
    const pelatihanDetail = req.body;
    modelPelatihan.addPerusahaan(pelatihanDetail, function (data) {
      res.redirect("/");
    });
  },

  insertPeserta: function (req, res) {
    const pelatihanDetail = req.body;
    modelPelatihan.addPeserta(pelatihanDetail, function (data) {
      res.redirect("/");
    });
  },

  // kode untuk delete
  deletePelatihan: function (req, res) {
    const pelatihanID = req.params.id;
    modelPelatihan.delPelatihan(pelatihanID, function (data) {
      res.redirect("/");
    });
  },
  deletePelatihan2: function (req, res) {
    const pelatihanID = req.params.id;
    modelPelatihan.delPelatihan2(pelatihanID, function (data) {
      res.redirect("/");
    });
  },
  deletePelatihan3: function (req, res) {
    const pelatihanID = req.params.id;
    modelPelatihan.delPelatihan3(pelatihanID, function (data) {
      res.redirect("/");
    });
  },

  // deletePelatihan2: function (req, res) {
  //   const pelatihanID = req.params.id;
  //   modelPelatihan.delPelatihan2(pelatihanID, function (data) {
  //     res.redirect("/");
  //   });
  // },

  // kode untuk view
  getAllPelatihan: (req, res) => {
    modelPelatihan.getPelatihan((results) => {
      res.json(results);
    });
  },
  getPelatihanById: (req, res) => {
    const pelatihanId = req.params.id;
    modelPelatihan.getPelatihan(pelatihanId, (results) => {
      res.json(results);
    });
  },

  // kode untuk update
  editPelatihan: function (req, res) {
    const id = req.params.id;
    modelPelatihan.editPelatihanByID(id, function (data) {
      res.json(data);
    });
  },
  updatePelatihan: function (req, res) {
    const pelatihan = req.body;
    const id = pelatihan.id;
    modelPelatihan.updateByID(pelatihan, function (error, result) {
      if (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
      }
      res.redirect("/");
    });
  },

  updatePelatihan2: function (req, res) {
    modelPelatihan.updateByID2(req.body, function (error) {
      res.json({ status: !error });
    });
  },

  updatePelatihan3: function (req, res) {
    modelPelatihan.updateByID3(req.body, function (error) {
      res.json({ status: !error });
    });
  },

  // kode untuk search
  searchPelatihanID: function (req, res) {
    const query = req.params.q;
    modelPelatihan.searchPelatihan(req.query.q, res);
  },
};

module.exports = myController;
