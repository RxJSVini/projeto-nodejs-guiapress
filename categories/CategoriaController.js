const Category = require('./Category');
class CategoryController {
  
  async index(req, res) {
    return res.render('admin/categories/new', { title: 'Pagina de categorias' })
  }
}

module.exports = new CategoryController();