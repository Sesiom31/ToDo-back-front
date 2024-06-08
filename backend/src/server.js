import { connectDb } from "./config/db.js";
import { app } from "./app.js";
import { PORT } from "./config/config.js";

const startApp = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(
        `El servidor está escuchando en el puerto ${PORT}`
      );
    });
  } catch (err) {
    console.log("Fallo en la conexión", err);
    process.exit(1);
  }
};

startApp();
