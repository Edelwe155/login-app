import { persistor } from "../store";

export const clearPersistor = () => {
  persistor.purge();
};
