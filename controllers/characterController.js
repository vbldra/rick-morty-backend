const {
    getFiveRandomCharacters,
    getAllCharacters,
} = require("../dataSources/characters");
const User = require("../models/User");

exports.getCharacters = (req, res) => {
    res.json(getFiveRandomCharacters());
};

exports.collectCharacter = async (req, res) => {
    const data = req.body;
    const userId = "60be2a01500541f4e2d91155";

    try {
        const result = await User.findByIdAndUpdate(
            userId,
            { $push: { characters: data.character } },
            { new: true }
        );
        console.log("user", result);
        res.json({ collected: result.characters });
    } catch (error) {
        console.error(error);
    }
};

exports.getCollection = async (req, res) => {
    const userId = "60be2a01500541f4e2d91155";

    try {
        const user = await User.findById(userId);
        const collection = getAllCharacters().filter((item) =>
            user.characters.includes(item.id)
        );
        res.json(collection);
    } catch (error) {
        console.error(error);
    }
};
