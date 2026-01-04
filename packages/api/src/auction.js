import { axiosInstance } from "@ice/config";

// Import from the appropriate module based on environment
let auctionModule;
if (process.env.NODE_ENV === "development") {
    auctionModule = await import("@ice/auction/development");
} else {
    auctionModule = await import("@ice/auction");
}

const { Configuration, AnnouncementsApi, BidApi, RulesApi, PremiumAuctionsApi, PremiumBidsApi } = auctionModule;

const configuration = new Configuration();

export const announcementsApi = new AnnouncementsApi(configuration, configuration.basePath, axiosInstance);
export const bidApi = new BidApi(configuration, configuration.basePath, axiosInstance);
export const rulesApi = new RulesApi(configuration, configuration.basePath, axiosInstance);
export const premiumAuctionsApi = new PremiumAuctionsApi(configuration, configuration.basePath, axiosInstance);
export const premiumBidsApi = new PremiumBidsApi(configuration, configuration.basePath, axiosInstance);
