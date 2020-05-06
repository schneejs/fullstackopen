module.exports = {
    info: (...msgs) => msgs.forEach(msg => console.log(msg)),
    error: (...msgs) => msgs.forEach(msg => console.error(msg))
};