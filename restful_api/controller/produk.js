const data = require("../db/data.json");
const fs = require("fs");

module.exports = {
  index: (req, res, next) => {
    try {
      return res.status(200).json({
        message: "success",
        data: data.produk,
      });
    } catch (error) {
      next(err);
    }
  },

  show: (req, res, next) => {
    try {
      const { produk_id } = req.params;

      let filteredPost = data.produk.filter((produk) => produk.id == produk_id);

      if (filteredPost.length == 0) {
        return res.status(404).json({
          message: `posts with id ${produk_id} is doesn't exist`,
        });
      }

      return res.status(200).json({
        message: "success",
        data: filteredPost[0],
      });
    } catch (error) {
      next(error);
    }
  },

  store: (req, res, next) => {
    try {
      let newproduk = {
        id: data.next_produk_id++,
        title: req.body.title,
        body: req.body.body,
      };

      data.produk.push(newproduk);

      fs.writeFileSync("./db/data.json", JSON.stringify(data, null, "\t"));

      return res.status(201).json({
        message: "produk created!",
        data: newproduk,
      });
    } catch (error) {
      next(error);
    }
  },

  update: (req, res, next) => {
    try {
      const { produk_id } = req.params;
      const { title, body } = req.body;

      const index = data.produk.findIndex((produk) => produk.id == produk_id);
      if (index < 0) {
        return res.status(404).json({
          message: `produk with id ${produk_id} is doesn't exist`,
        });
      }

      if (title) {
        data.posts[index].title = title;
      }
      if (body) {
        data.produk[index].body = body;
      }

      fs.writeFileSync("./db/data.json", JSON.stringify(data, null, "\t"));

      return res.status(201).json({
        message: "success",
        data: data.produk[index],
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: (req, res, next) => {
    try {
      const { produk_id } = req.params;

      const index = data.produk.findIndex((produk) => produk.id == produk_id);
      if (index < 0) {
        return res.status(404).json({
          message: `produk with id ${produk_id} is doesn't exist`,
        });
      }

      data.produk.splice(index, 1);

      return res.status(200).json({
        message: "success",
        data: data.produk,
      });
    } catch (error) {
      next(error);
    }
  },
};
