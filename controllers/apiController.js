const logger = require("log4js").getLogger("controllers/musicController");
const BaseController = require('./baseController');
const ApiService = require("../services/apiService");

/**
 * 业务逻辑层
 * 主要对业务逻辑进行处理
 */
class ApiController {
  constructor() {
    this.apiService = new ApiService();
  }

  /**
   * 登陆注册
   * @param req
   * @param res
   */
  userLogin(req, res) {
    try {
      const query = req.query
      const number = req.body.number
      const password = req.body.password
      let loginData;

      //判断路由参数，确定是注册还是登陆
      if (query.status === "register") {
        //注册
        if (!number || number == "" || !password || password == "") {
          return res.status(401).json({
            msg: '请检验您的信息是否全部填写！'
          })
        }
        loginData = this.apiService.userRegister(number, password).then(data => {
          res.status(200).json(data);
        }).catch(err => {
          logger.error(err);
          res.status(400).json({
            ms: err
          });
        });
      } else {
        //登陆
        if (!number || number == "" || !password || password == "") {
          return res.status(401).json({
            msg: '请检验您的信息是否全部填写！'
          })
        }
        loginData = this.apiService.userLand(number, password).then(data => {
          res.status(200).json(data);
        }).catch(err => {
          logger.error(err);
          res.status(400).json({
            ms: err
          });
        });
      }
    } catch (e) {
      res.status(400).json({
        msg: e.message
      });
    }
  }
}

module.exports = ApiController;
