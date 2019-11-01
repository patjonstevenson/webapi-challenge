const validateId = db => {
    return async function (req, res, next) {
        const { id } = req.params;
        try {
            const actions = await db.get(id);
            if (!actions) res.status(404).json({ message: "Resource with given id is not available", id });
            next();
        } catch (error) {
            res.status(500).json({ message: "Internal server error when validating Id" });
        }
    }
}

module.exports = validateId;