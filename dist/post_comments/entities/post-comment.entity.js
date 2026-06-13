"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostComment = void 0;
const typeorm_1 = require("typeorm");
const community_post_entity_1 = require("../../community_posts/entities/community-post.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let PostComment = class PostComment {
    id;
    post_id;
    user_id;
    content;
    created_at;
    post;
    user;
};
exports.PostComment = PostComment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PostComment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'post_id', type: 'uuid' }),
    __metadata("design:type", String)
], PostComment.prototype, "post_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], PostComment.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PostComment.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], PostComment.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => community_post_entity_1.CommunityPost, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'post_id' }),
    __metadata("design:type", community_post_entity_1.CommunityPost)
], PostComment.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], PostComment.prototype, "user", void 0);
exports.PostComment = PostComment = __decorate([
    (0, typeorm_1.Entity)({ name: 'post_comments' })
], PostComment);
//# sourceMappingURL=post-comment.entity.js.map