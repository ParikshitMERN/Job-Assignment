const { Favourite } = require("../config/database");

exports.addFavourite = async (req, res) => {
  try {
    const { propertyName, address, price, bedrooms, bathrooms, description } =
      req.body;

    const favourite = await Favourite.create({
      userId: req.user.id,
      propertyName,
      address,
      price,
      bedrooms,
      bathrooms,
      description,
    });

    res
      .status(201)
      .json({ message: "Favourite added successfully", favourite });
  } catch (error) {
    console.log("FAVOURITE ERROR:", error);
    res
      .status(500)
      .json({ message: "Failed to add favourite", error: error.message });
  }
};

exports.getFavourites = async (req, res) => {
  try {
    const favourites = await Favourite.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json({
      favourites,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch favourites",
    });
  }
};

exports.removeFavourite = async (req, res) => {
  try {
    const favourite = await Favourite.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!favourite) {
      return res.status(404).json({ message: "Favourite not found" });
    }

    await favourite.destroy();
    res.status(200).json({ message: "Favourite removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove favourite" });
  }
};
