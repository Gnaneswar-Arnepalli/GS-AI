import app from "./app.js";
import { connectToDatabase } from "./db/connections.js";
//connections and listeneres
const PORT = process.env.PORT || 500;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log("Server Open & Connected To Database 🤟"));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map