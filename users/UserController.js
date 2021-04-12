const User = require('./Users');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');

class UserController {
  async index(req, res) {
    const user = await User.findAll();
    return res.render("admin/users/index", { users: user })
  }
  async create(req, res) {
    const { name, email, password } = req.body;
    const salt = await bcryptjs.genSalt(10);
    const hash_pass = await bcryptjs.hash(password, salt);
    const userExists = await User.findOne({ where: { email: email } })
    if (!userExists) {
      console.log("Nenhum usuário encontrado com esse e-mail, vamos cria-lo.")
      const user = await User.create({ id: uuid.v4(), name: name, email: email, password: hash_pass })
        .then(() => {
          return res.redirect("/admin/users");
        })
        .catch((error) => {
          return res.status(400).json({ error: error })
        })

    } else {
      return res.status(409).json({ message: "Usuário já existe na base de dados" })
    }
  }

  async auth(req, res) {
    const { email, password } = req.body;
    User.findOne({ where: { email: email } }).then((user) => {
      if (user != undefined) {
        const correct = bcryptjs.compareSync(password, user.password)
        if (correct) {
          req.session.user = { id: user.id, email: user.email }
          return res.redirect("/admin/articles")
        } else {
          return res.redirect("/admin/users/login")
        }
      } else {
        return res.redirect("/admin/users/login")
      }
    })

  }

}

module.exports = new UserController();