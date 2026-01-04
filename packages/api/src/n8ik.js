import { axiosInstance } from "@ice/config";

// Import from the appropriate module based on environment
let n8ikModule;
if (process.env.NODE_ENV === "development") {
    n8ikModule = await import("@ice/n8ik/development");
} else {
    n8ikModule = await import("@ice/n8ik");
}

const { Configuration, DeploymentsApi } = n8ikModule;

const configuration = new Configuration();

export const deploymentsApi = new DeploymentsApi(configuration, configuration.basePath, axiosInstance);
