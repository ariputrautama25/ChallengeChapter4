const { produk } = require("../models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const produks = await Produk.findAll();

      return res.status(200).json({
        status: true,
        message: "success",
        data: produks,
      });
    } catch (error) {
      next(err);
    }
  },

  show: async (req, res, next) => {
    try {
      const { produk_id } = req.params;

      const produk = await Produk.findOne({ where: { id: produk_id } });

      if (!produk) {
        return res.status(404).json({
          status: false,
          message: `can't find produk with id ${produk_id}!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: produk,
      });
    } catch (error) {
      next(error);
    }
  },

  store: async (req, res, next) => {
    try {
      const { name, description } = req.body;

      const produk = await Produk.create({
        name: name,
        description: description,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: produk,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { produk_id } = req.params;

      const updated = await Produk.update(req.body, {
        where: { id: produk_id },
      });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `can't find produk with id ${produk_id}!`,
          data: null,
        });
      }

      return res.status(201).json({
        status: true,
        message: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { produk_id } = req.params;

      const deleted = await Produk.destroy({ where: { id: produk_id } });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `can't find produk with id ${produk_id}!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
