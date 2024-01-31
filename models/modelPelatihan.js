const db = require("../middlewares/database");
const conn = require("../middlewares/db");

module.exports = {
  getSelects: function (callback) {
    var sql = "SELECT * FROM pelatihan";
    db.query(sql, function (err, data) {
      if (err) throw err;
      return callback(data);
    });
  },
  getSelect: function (myID, callback) {
    const sql = "SELECT * FROM pelatihan WHERE id= ?";
    db.query(sql, myID, function (err, data) {
      if (err) throw err;
      return callback(data[0]);
    });
  },

  // kode untuk tambah data
  addPelatihan: function (pelatihanDetail, callback) {
    const sql = "INSERT INTO pelatihan SET ?";
    db.query(sql, pelatihanDetail, function (err, data) {
      if (err) throw err;
      return callback(data);
    });
  },

  addPerusahaan: function (pelatihanDetail, callback) {
    const sql = "INSERT INTO perusahaan SET ?";
    db.query(sql, pelatihanDetail, function (err, data) {
      if (err) throw err;
      return callback(data);
    });
  },

  addPeserta: function (pelatihanDetail, callback) {
    const sql = "INSERT INTO peserta SET ?";
    db.query(sql, pelatihanDetail, function (err, data) {
      if (err) throw err;
      return callback(data);
    });
  },

  // kode untuk delete
  delPelatihan: function (pelatihanID, callback) {
    const sql = "DELETE FROM pelatihan WHERE id = ?";
    db.query(sql, pelatihanID, function (err, data) {
      if (err) throw err;
      return callback(data);
    });
  },

  delPelatihan2: function (pelatihanID, callback) {
    const sql = "DELETE FROM perusahaan WHERE id = ?";
    db.query(sql, pelatihanID, function (err, data) {
      if (err) throw err;
      return callback(data);
    });
  },

  delPelatihan3: function (pelatihanID, callback) {
    const sql = "DELETE FROM peserta WHERE id = ?";
    db.query(sql, pelatihanID, function (err, data) {
      if (err) throw err;
      return callback(data);
    });
  },
  // kode untuk view
  getPelatihan: async (pelatihanId, callback) => {
    const sqlPelatihan = "SELECT * FROM pelatihan WHERE id= ?";
    const sqlPeserta = "SELECT * FROM peserta WHERE id_pelatihan= ?";
    const sqlPerusahaan = "SELECT * FROM perusahaan WHERE id IN (?)";

    const [[pelatihan]] = await conn.promise().query(sqlPelatihan, pelatihanId);
    const [peserta] = await conn.promise().query(sqlPeserta, pelatihanId);

    let allPesertaID = [],
      allPeserta = {};

    for (x of peserta) {
      let id_per = x.id_perusahaan;
      if (allPesertaID.indexOf(id_per) == -1) {
        allPesertaID.push(id_per);
        allPeserta[id_per] = [];
      }
      allPeserta[id_per].push(x);
    }
    if (allPesertaID.length > 0) {
      const [perusahaan] = await conn
        .promise()
        .query(sqlPerusahaan, [allPesertaID]);

      pelatihan.list_peserta = [];
      for (x of perusahaan) {
        x.peserta = allPeserta[x.id];
        pelatihan.list_peserta.push(x);
      }
    }
    callback(pelatihan);
  },

  // kode untuk update
  editPelatihanByID: function (myID, callback) {
    const sqlPelatihan = "SELECT * FROM pelatihan WHERE id= ?";
    const sqlPeserta = "SELECT * FROM peserta WHERE id_pelatihan= ?";
    const sqlPerusahaan = "SELECT * FROM perusahaan WHERE id IN (?)";

    db.query(sqlPelatihan, myID, async function (err, pelatihanData) {
      if (err) throw err;

      const pelatihan = pelatihanData[0];
      const pesertaData = await getPesertaData(myID);

      pelatihan.list_peserta = pesertaData;

      return callback(pelatihan);
    });

    async function getPesertaData(pelatihanId) {
      return new Promise((resolve, reject) => {
        db.query(sqlPeserta, pelatihanId, function (err, peserta) {
          if (err) reject(err);

          let allPesertaID = [];
          let allPeserta = {};

          for (const x of peserta) {
            const id_per = x.id_perusahaan;
            if (allPesertaID.indexOf(id_per) === -1) {
              allPesertaID.push(id_per);
              allPeserta[id_per] = [];
            }
            allPeserta[id_per].push(x);
          }

          db.query(sqlPerusahaan, [pelatihanId], function (err, perusahaan) {
            if (err) reject(err);

            const listPeserta = perusahaan.map((perusahaan) => {
              return {
                id: perusahaan.id,
                nama: perusahaan.nama,
                alamat: perusahaan.alamat,
                no_telpon: perusahaan.no_telpon,
                peserta: allPeserta[perusahaan.id] || [],
              };
            });

            resolve(listPeserta);
          });
        });
      });
    }
  },

  updateByID: function (updatePelatihan, myID, callback) {
    const sql = `UPDATE pelatihan SET ? WHERE id= ?`;
    db.query(sql, [updatePelatihan, myID], function (err, pelatihan) {
      if (err) throw err;
      return callback(pelatihan);
    });
  },

  updateByID2: function (data, callback) {
    const sql = `UPDATE perusahaan SET ${data.col} = ? WHERE id = ${data.id}`;
    db.query(sql, [data.val], (err) => callback(err));
  },

  updateByID3: function (peserta, callback) {
    const sql = `UPDATE peserta SET ${peserta.col} = ? WHERE id = ${peserta.id}`;
    db.query(sql, [peserta.val], (err) => callback(err));
  },

  // kode untuk search
  searchPelatihan: function (query = "", res) {
    var sql = "";
    console.log(query);
    if (query != "") {
      sql = `SELECT * FROM pelatihan WHERE judul_pelatihan LIKE '%${query}%' OR tempat_pelatihan LIKE '%${query}%' limit 10`;
    } else {
      sql = `SELECT * FROM pelatihan ORDER BY id LIMIT 10`;
    }
    db.query(sql, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
      }
      res.send(results);
    });
  },
};
