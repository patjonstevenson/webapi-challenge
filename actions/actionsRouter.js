const router = require("express").Router();

const actionsDb = require("../data/helpers/actionModel");

router.get("/", async (req, res) => {
    try {
        const actions = await actionsDb.get();
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/:id", validateId, async (req, res) => {
    const { id } = req.params;
    try {
        const actions = await actionsDb.get(id);
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/", async (req, res) => {
    const action = req.body;
    try {
        const newAction = await actionsDb.insert(action);
        res.status(201).json(newAction);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/:id", async (req, res) => {

});

router.delete("/:id", async (req, res) => {

});

// custom middleware
async function validateId(req, res, next) {
    try {
        const actions = await actionsDb.get(id);
        next();
    } catch (error) {
        res.status(404).json({ message: "Resource with given id is not available" });
    }
}


module.exports = router;