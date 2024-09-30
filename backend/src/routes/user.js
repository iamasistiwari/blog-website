"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var hono_1 = require("hono");
var edge_1 = require("@prisma/client/edge");
var extension_accelerate_1 = require("@prisma/extension-accelerate");
var jwt_1 = require("hono/jwt");
var medium_common_1 = require("@iamasistiwari/medium-common");
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["Success"] = 200] = "Success";
    ResponseStatus[ResponseStatus["Unauthorized"] = 401] = "Unauthorized";
    ResponseStatus[ResponseStatus["Error"] = 500] = "Error";
})(ResponseStatus || (ResponseStatus = {}));
exports.userRouter = new hono_1.Hono();
exports.userRouter.post('/signup', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var prisma, body, success, res, user, token, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prisma = new edge_1.PrismaClient({
                    datasourceUrl: c.env.DATABASE_URL,
                }).$extends((0, extension_accelerate_1.withAccelerate)());
                return [4 /*yield*/, c.req.json()];
            case 1:
                body = _a.sent();
                success = medium_common_1.signupInput.safeParse(body).success;
                if (!success) {
                    c.status(411);
                    return [2 /*return*/, c.json({ message: "signup inputs are not correct" })];
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 6, , 7]);
                return [4 /*yield*/, prisma.post.count({})];
            case 3:
                res = _a.sent();
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            name: body.name || null,
                            email: body.email,
                            password: body.password
                        }
                    })];
            case 4:
                user = _a.sent();
                return [4 /*yield*/, (0, jwt_1.sign)({ id: user.id }, c.env.JWT_Secret)];
            case 5:
                token = _a.sent();
                return [2 /*return*/, c.json({ token: token, authorName: user.name })];
            case 6:
                e_1 = _a.sent();
                console.log(e_1);
                c.status(ResponseStatus.Unauthorized);
                return [2 /*return*/, c.text("not correct")];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.userRouter.post('/signin', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var prisma, body, success, user, jwt, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prisma = new edge_1.PrismaClient({
                    datasourceUrl: c.env.DATABASE_URL,
                }).$extends((0, extension_accelerate_1.withAccelerate)());
                return [4 /*yield*/, c.req.json()];
            case 1:
                body = _a.sent();
                success = medium_common_1.signinInput.safeParse(body).success;
                if (!success) {
                    c.status(411);
                    return [2 /*return*/, c.json({ message: "signin inputs are not correct" })];
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, prisma.user.findFirst({
                        where: {
                            email: body.email,
                        }
                    })];
            case 3:
                user = _a.sent();
                if (!user || user.password !== body.password) {
                    c.status(ResponseStatus.Unauthorized);
                    return [2 /*return*/, c.json({
                            message: "Incorrect credentials"
                        })];
                }
                return [4 /*yield*/, (0, jwt_1.sign)({ id: user.id }, c.env.JWT_Secret)];
            case 4:
                jwt = _a.sent();
                return [2 /*return*/, c.json({ token: jwt, authorName: user.name })];
            case 5:
                e_2 = _a.sent();
                console.log(e_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
