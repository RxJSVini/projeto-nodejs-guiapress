const Article = require('./Article');
const slugify = require('slugify');

// Article.findAll()
//   .then(article => {
//     console.log(article)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

Article.findByPk(16)
  .then((article) => {
    console.log(article.title)
  })
  .catch((error) => {
    console.log(error)
  })


// Article.update({
//   title: `O Movimento dos pantera negraa`,
//   slug: `O-movimento-dos-panteras-negras`,
//   body: `Os Panteras Negras foram um partido político norte-americano surgido em defesa da comunidade afro-americana. Esse partido originou-se, a princípio, como um grupo voltado ao combate contra a violência policial contra os negros durante a década de 1960, no contexto do movimento dos direitos civis nos Estados Unidos.`,
//   categoryId: 15
// })
//   .then(() => {
//     return res.redirect('/admin/articles')
//   })
// })


// Article.update({ title: `O Movimento dos pantera negraa`, body: `Os Panteras Negras foram um partido político norte-americano surgido em defesa da comunidade afro-americana. Esse partido originou-se, a princípio, como um grupo voltado ao combate contra a violência policial contra os negros durante a década de 1960, no contexto do movimento dos direitos civis nos Estados Unidos.`, slug: `O-movimento-dos-panteras-negras` }, {
//   where: {
//     id: 15
//   }
// })
//   .then(() => {
//     console.log('Deu certo');
//     return res.redirect("/admin/articles");
//   })
//   .catch((error) => {
//     console.log('Deu erro')
//     return res.redirect("/")
//   })

// console.log(slugify('Minha velha traga logo meu jantar'))