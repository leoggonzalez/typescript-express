"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
router.get("/", function (req, res) {
    res.send("\n    <div>\n      <h1>Hi there \uD83D\uDE42</h1>\n    </div>\n  ");
});
