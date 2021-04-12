module.exports = (req, res, next) => {
  if (req.session.user != undefined) {
    next();
  } else {
    console.log("Usuário não autenticado, redirecionando para a página de login")
    res.redirect('/admin/users/login');
  }

}