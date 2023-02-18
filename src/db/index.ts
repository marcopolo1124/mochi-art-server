import { getAdminByUsername, updateAdminPassword, deleteAdmin} from "./admin";
import {getState, getGallery, toggleArtTradeState, toggleCommissionState, postImage, deleteImage, getFeatured, getImage} from './site'
import { getCommission, getCommissionsWithStatus, postCommission, updateCommissionStatus } from "./commissions";

export default {
    getAdminByUsername,
    updateAdminPassword,
    deleteAdmin,
    getState,
    getGallery,
    toggleArtTradeState,
    toggleCommissionState,
    postImage,
    deleteImage,
    getCommission,
    getCommissionsWithStatus,
    postCommission,
    getFeatured,
    getImage,
    updateCommissionStatus
}