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
exports.blogRouter = void 0;
var hono_1 = require("hono");
var edge_1 = require("@prisma/client/edge");
var extension_accelerate_1 = require("@prisma/extension-accelerate");
var jwt_1 = require("hono/jwt");
var medium_common_1 = require("@iamasistiwari/medium-common");
exports.blogRouter = new hono_1.Hono();
exports.blogRouter.use('/*', function (c, next) { return __awaiter(void 0, void 0, void 0, function () {
    var auth, token, user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                auth = c.req.header("Authorization") || "";
                token = auth.split(" ")[1];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, (0, jwt_1.verify)(token, c.env.JWT_Secret)];
            case 2:
                user = _a.sent();
                if (!user) return [3 /*break*/, 4];
                c.set('userId', user.id);
                return [4 /*yield*/, next()];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                c.status(403);
                return [2 /*return*/, c.json({ message: "you are not logged in" })];
            case 5: return [3 /*break*/, 7];
            case 6:
                e_1 = _a.sent();
                c.status(403);
                return [2 /*return*/, c.json({
                        message: "You are not logged in"
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.blogRouter.post('/', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var body, success, authorId, prisma, blog, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, c.req.json()];
            case 1:
                body = _a.sent();
                success = medium_common_1.createBlogInput.safeParse(body).success;
                if (!success) {
                    c.status(411);
                    return [2 /*return*/, c.json({ message: "create blog inputs are not correct" })];
                }
                authorId = c.get("userId");
                prisma = new edge_1.PrismaClient({
                    datasourceUrl: c.env.DATABASE_URL,
                }).$extends((0, extension_accelerate_1.withAccelerate)());
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, prisma.post.create({
                        data: {
                            title: body.title,
                            content: body.content,
                            authorId: authorId
                        }
                    })];
            case 3:
                blog = _a.sent();
                console.log(blog);
                return [2 /*return*/, c.json({ id: blog.id })];
            case 4:
                e_2 = _a.sent();
                c.status(411);
                c.json({ message: "content can't able to put" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.blogRouter.put('/', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var body, success, prisma, blog, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, c.req.json()];
            case 1:
                body = _a.sent();
                success = medium_common_1.updateBlogInput.safeParse(body).success;
                if (!success) {
                    c.status(411);
                    return [2 /*return*/, c.json({ message: "update blog inputs are not correct" })];
                }
                prisma = new edge_1.PrismaClient({
                    datasourceUrl: c.env.DATABASE_URL
                }).$extends((0, extension_accelerate_1.withAccelerate)());
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, prisma.post.update({
                        where: {
                            id: Number(body.id)
                        },
                        data: {
                            author: body.title,
                            title: body.title,
                            content: body.content,
                            published: body.published
                        }
                    })];
            case 3:
                blog = _a.sent();
                return [2 /*return*/, c.json({ message: "successfully updated your blog" })];
            case 4:
                e_3 = _a.sent();
                console.log(e_3);
                return [2 /*return*/, c.json({ message: "post not get updated" })];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.blogRouter.get('/bulk', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var prisma, blogs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prisma = new edge_1.PrismaClient({
                    datasourceUrl: c.env.DATABASE_URL,
                }).$extends((0, extension_accelerate_1.withAccelerate)());
                return [4 /*yield*/, prisma.post.findMany({
                        select: {
                            content: true,
                            title: true,
                            id: true,
                            author: {
                                select: {
                                    name: true
                                }
                            },
                            published: true
                        }
                    })];
            case 1:
                blogs = _a.sent();
                return [2 /*return*/, c.json({
                        blogs: blogs
                    })];
        }
    });
}); });
exports.blogRouter.get('/:id', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var id, prisma, blog, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = c.req.param("id");
                prisma = new edge_1.PrismaClient({
                    datasourceUrl: c.env.DATABASE_URL
                }).$extends((0, extension_accelerate_1.withAccelerate)());
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.post.findFirst({
                        where: {
                            id: Number(id)
                        },
                        select: {
                            id: true,
                            title: true,
                            content: true,
                            published: true,
                            author: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    })];
            case 2:
                blog = _a.sent();
                return [2 /*return*/, c.json(blog)];
            case 3:
                e_4 = _a.sent();
                console.log(e_4);
                return [2 /*return*/, c.json({ message: "can't able to get blog" })];
            case 4: return [2 /*return*/];
        }
    });
}); });
