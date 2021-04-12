const Sequelize = require('sequelize');
const connection = require('../database/db');
const Category = require('../categories/Category');


const Article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});


/*
  Relacionando  1 para 1 models usando o método belogsTo()
  Um Artigo pertence a uma categoria (1:1)
*/
Category.hasMany(Article);

/*
  Relacionando 1 para muitos models usando o método hasMany()
  Uma Categoria tem muitos artigos (1:N)
*/
Article.belongsTo(Category);

//Article.sync({ force: true }); Executamos apenas 1 vez para que a criação das tabelas não se repita ou seja tentado diversas vezes

module.exports = Article;

