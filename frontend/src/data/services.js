import { SAP_SERVICES } from "./services-sap";
import { GENERAL_SERVICES } from "./services-general";

export const SERVICES = [...SAP_SERVICES, ...GENERAL_SERVICES];

export const getService = (path) => SERVICES.find((s) => s.path === path);
