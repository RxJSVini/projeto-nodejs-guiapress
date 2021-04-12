const Category = require('./Category');

class CategoriesListController {
  async list(req, res) {
    Category.findAll()
      .then((categories) => {
        return res.render('admin/categories/index', { title: 'GuiaPress', categories: categories })
      })
      .catch((e) => {
        return res.json({ message: e })
      })
  }
};

module.exports = new CategoriesListController();