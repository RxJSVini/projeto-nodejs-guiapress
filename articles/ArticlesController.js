
const Category = require('../categories/Category.js')
const Article = require('./Article');
const slugify = require('slugify');
class ArticlesController {
  async index(req, res) {
    Category.findAll().then((categories => {
      return res.render('admin/articles/new.ejs', { title: 'Cadastro de Artigos', categories: categories });
    }))
      .catch((e) => {
        console.error(e);
      })

  }

  async update(req, res) {
    const id = req.body.id;
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category;

    Article.update({
      title: title,
      body: body,
      slug: slugify(title),
      categoryId: category
    }, {
      where: { id: id }
    })
      .then(() => {
        return res.redirect('/admin/articles')
      })
      .catch((error) => {
        console.log(error)
      })
  }


}

module.exports = new ArticlesController();