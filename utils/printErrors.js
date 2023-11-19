const printDataError = (res, data) => {
    return res
        .status(400)
        .json({ message: data + " incorrect" });
};

const printServerError = (res, error) => {
    console.log("Error", error);
    return res
        .status(500)
        .json({ message: "Internal server error", error: error });
};

module.exports = {
    printDataError,
    printServerError
};