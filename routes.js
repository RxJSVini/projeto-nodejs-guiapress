const express = require('express');
const slugify = require('slugify');
const Article = require('./articles/Article');
const router = express.Router();

const ArticlesController = require('./articles/ArticlesController');
const CategoriesController = require('./categories/categoriaController');
const CategoriesListController = require('./categories/CategoriesListController')
const Category = require('./categories/Category');
const UserController = require('./users/UserController');
const Auth = require('./middlewares/Auth');
const Users = require('./users/Users');


router.get('/admin/categories/new', Auth, CategoriesController.index);

router.get('/admin/categories', Auth, CategoriesListController.list);

router.post('/categories/save', (req, res) => {
  const title = req.body.title;
  if (title != undefined) {
    Category.create({ // Salvando no BD
      title: title,
      slug: slugify(title)
    }).then(() => {
      return res.redirect('/admin/categories');
    });
  } else {
    return res.redirect('/admin/categories/new');
  }
});

//Deletando categorias
router.post('/categories/delete', Auth, (req, res) => {
  const id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Category.destroy({
        where: { id: id }
      }).then(() => {
        return res.redirect("/admin/categories/");
      })
    } else {
      return res.redirect("/admin/categories/");
    }
  } else {
    return res.redirect("/admin/categories/");
  }
})

//Atualização de categorias 
router.get('/admin/categories/edit/:id', Auth, (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.redirect('/admin/categories')
  }
  Category.findByPk(id).then(category => {
    if (category != undefined) {
      return res.render('admin/categories/edit', { title: 'Edição de Categorias', category: category })
    } else {
      return res.redirect("admin/categories")
    }
  })
    .catch((error) => {
      return res.redirect('/admin/categories')
    });
});


router.post('/categories/update', Auth, (req, res) => {
  const id = req.body.id;
  const title = req.body.title;

  Category.update({ title: title, slug: slugify(title) }, {
    where: {
      id: id
    }
  })
    .then(() => {
      return res.redirect("/admin/categories");
    })
    .catch((error) => {
      console.error(error)
    })
});


//Criando artigos
router.get('/admin/articles/new', Auth, ArticlesController.index);

router.post('/admin/articles/save', (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const category = req.body.category;

  Article.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: category
  })
    .then(() => {
      return res.redirect('/admin/articles')
    })
})

router.get('/admin/articles', Auth, (req, res) => {
  Article.findAll({
    include: [{ model: Category }]
  })
    .then((articles) => {
      return res.render('admin/articles/index.ejs', { title: 'Cadastro de Artigos', articles: articles });
    })
    .catch((e) => {
      return res.json({ message: e })
    })
})

router.post('/articles/delete', Auth, (req, res) => {
  const id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Article.destroy({
        where: { id: id }
      }).then(() => {
        return res.redirect("admin/articles");
      })
    } else {
      return res.redirect("admin/users/login");
    }
  } else {
    return res.redirect("admin/users/login");
  }
})


router.get('/', (req, res) => {
  Article.findAll({
    order: [
      ["id", "DESC"]
    ]
  })
    .then((articles) => {
      Category.findAll().then(categories => {
        return res.render('index', { categories: categories, articles: articles, title: 'GuiaPress' })
      })
    })
    .catch((e) => {
      return res.error(e)
    })
});


router.get('/:slug', Auth, (req, res) => {
  const slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug
    }
  })
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then(categories => {
          return res.render('article.ejs', { categories: categories, article: article, title: 'GuiaPress' })
        })

      }
    })
    .catch((err) => {
      return res.redirect('/')
    })
});

router.get('/category/:slug', Auth, (req, res) => {
  let slug = req.params.slug;
  Category.findOne({
    where: {
      slug: slug
    },
    include: [{ model: Article }]
  })
    .then(category => {
      if (category != undefined) {
        Category.findAll().then(categories => {
          return res.render("index", { articles: category.articles, categories: categories })
        })
      } else {
        return res.redirect("/");
      }
    })
    .catch(err => {
      return res.redirect("/")
    })
})


router.get('/admin/articles/edit/:id', Auth, (req, res) => {
  const id = req.params.id;
  Article.findByPk(id).then(article => {
    if (article != undefined) {
      Category.findAll().then(categories => {
        return res.render("admin/articles/edit.ejs", { categories: categories, article: article });
      })
    } else {
      return res.redirect("/")
    }
  })

})

router.post('/articles/update', Auth, ArticlesController.update)

/*
  Regra de configuração do Offset

  1 = 0 - 3
  2 = 4 - 7
  3 = 8 - 11
  4 = 12 - 15
  5 = 16 - 19
*/
router.get("/articles/page/:num", (req, res) => {
  var page = req.params.num;
  var offset = 0;
  if (isNaN(page) || page == 1) {
    offset = 0;
  } else {
    offset = parseInt(page - 1) * 4;
  }

  Article.findAndCountAll(
    {
      limit: 4,
      offset: offset,
      order: [['id', 'DESC']]
    }
  ).then(articles => {
    var next;
    if (offset + 5 > articles.count) {
      next = false;
    } else {
      next = true;
    }
    var result = {
      page: parseInt(page),
      articles: articles,
      next: next
    }
    Category.findAll().then(categories => {
      res.render("admin/articles/page", {
        result: result, categories: categories
      })
    })
  });
})


router.get("/admin/users", UserController.index)
router.post("/users/create", UserController.create)

router.get("/admin/users/new", (req, res) => {
  return res.render("admin/users/new")
})

router.get("/admin/users/login", (req, res) => {
  return res.render("admin/users/login")
})
router.post("/admin/users/auth", UserController.auth)
router.get("/admin/users/logout", (req, res) => {
  req.session.user = undefined;
  return res.redirect("/admin/users/login")
})
module.exports = router;