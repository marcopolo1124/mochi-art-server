"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("./admin");
const site_1 = require("./site");
const commissions_1 = require("./commissions");
exports.default = {
    getAdminByUsername: admin_1.getAdminByUsername,
    updateAdminPassword: admin_1.updateAdminPassword,
    deleteAdmin: admin_1.deleteAdmin,
    getState: site_1.getState,
    getGallery: site_1.getGallery,
    toggleArtTradeState: site_1.toggleArtTradeState,
    toggleCommissionState: site_1.toggleCommissionState,
    postImage: site_1.postImage,
    deleteImage: site_1.deleteImage,
    getCommission: commissions_1.getCommission,
    getCommissionsWithStatus: commissions_1.getCommissionsWithStatus,
    postCommission: commissions_1.postCommission,
    getFeatured: site_1.getFeatured,
    getImage: site_1.getImage,
    updateCommissionStatus: commissions_1.updateCommissionStatus
};
