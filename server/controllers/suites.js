module.exports = {
    readSuites: async (req, res) => {
        const db = req.app.get("db");


        let suites = await db.suites.select_suites();
        res.status(200).send(suites);
    }
}